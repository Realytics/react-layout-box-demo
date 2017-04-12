import React from 'react'
import forEach from 'lodash/forEach'
import isNumber from 'lodash/isNumber'
import isArray from 'lodash/isArray'
import mapValues from 'lodash/mapValues'
import isFunction from 'lodash/isFunction'
import filter from 'lodash/filter'
import reduce from 'lodash/reduce'
import { layoutContextValidationMap, LayoutStore, LayoutInvalidReason } from './LayoutStore'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const BoxWrapper = styled.div`
  position: absolute;
  margin: 0;
  padding: 0;
  overflow: hidden;
  box-sizing: border-box;
`

const ArtificialScrollWrapper = styled.div`
  position: relative;
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
  overflow: hidden;
`

export default class LayoutBox extends React.Component {

  constructor(props, context) {
    super(props, context)
    if (!context.layoutStore) {
      throw new Error(`LayoutBox need a layoutStore in context, make sure LayoutBox has a LayoutContainer as ancestor !`)
    }
    // Create the store
    this.layoutStore = new LayoutStore(
      this.getLayout(context.layoutStore.getState(), props)
    )
    // Subscribe to parentStore
    this.unsubscribe = this.context.layoutStore.subscribe((parentLayout) => {
      // When parentStore change, update layout and forceUpdate (true)
      this.updateLayout(parentLayout, this.props, /* forceUpdate : */ true)
    })
  }

  componentWillReceiveProps(nextProps, nextContext) {
    // When new props, update layout but don't force the update because it's normal react lifecicle
    this.updateLayout(nextContext.layoutStore.getState(), nextProps, /* forceUpdate : */ false)
  }

  // Provide store to children  
  getChildContext() {
    return {
      layoutStore: this.layoutStore
    }
  }

  render() {
    const layout = this.layoutStore.getState()
    const layoutStyle = {
      transition: (this.props.transitionDuration && this.props.transitionDuration > 0) ? `all ${this.props.transitionDuration}ms` : '',
      overflowY: (this.props.verticalScroll) ? 'auto' : 'hidden',
      overflowX: (this.props.horizontalScroll) ? 'auto' : 'hidden'
    }
    forEach(layout, (val, key) => {
      if (val.valid) {
        layoutStyle[key] = val.value + 'px'
      }
    })
    const style = Object.assign({}, this.props.style, layoutStyle)

    let artificialScrollBoxStyle = {}    
    if (this.props.artificialScroll) {
      let artificialScrollHeight = isNumber(this.props.verticalScroll) ? this.props.verticalScroll : layout.height.value 
      let artificialScrollWidth = isNumber(this.props.horizontalScroll) ? this.props.horizontalScroll : layout.width.value
      artificialScrollBoxStyle = {
        width: artificialScrollWidth,
        height: artificialScrollHeight
      }
    }

    const children = isArray(this.props.children) ? this.props.children : [this.props.children]

    const childrenMapped = children.map(child => {
      const childMapped = isFunction(child) ?
        child(this.layoutStore.getState()) :
        child
      return childMapped
    })

    return (
      <BoxWrapper style={style}>
        {this.props.artificialScroll ?
          (
            <ArtificialScrollWrapper style={artificialScrollBoxStyle}>
              {React.Children.toArray(childrenMapped)}
            </ArtificialScrollWrapper>
          ) :
          (
            React.Children.toArray(childrenMapped)
          )
        }
      </BoxWrapper>
    )
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  updateLayout(parentLayout, props, forceUpdate = false) {
    const newLayout = this.getLayout(parentLayout, props)
    const layout = this.layoutStore.getState()
    if (
      newLayout.width !== layout.width ||
      newLayout.height !== layout.height ||
      newLayout.left !== layout.left ||
      newLayout.top !== layout.top ||
      newLayout.right !== layout.right ||
      newLayout.bottom !== layout.bottom ||
      newLayout.scrollHeight !== layout.scrollHeight ||
      newLayout.scrollWidth !== layout.scrollWidth
    ) {
      this.layoutStore.setState(newLayout)
      if (!props.ignoreResize && forceUpdate) {
        this.forceUpdate()
      }
    }
  }

  getLayout(parentLayout, props) {
    const parentLayoutHeight = parentLayout.scrollHeight.valid ? parentLayout.scrollHeight : parentLayout.height
    const vertical = this.computeDirection(parentLayout, parentLayoutHeight, props.top, props.height, props.bottom, 'vertical')
    const parentLayoutWidth = parentLayout.scrollWidth.valid ? parentLayout.scrollWidth : parentLayout.width
    const horizontal = this.computeDirection(parentLayout, parentLayoutWidth, props.left, props.width, props.right, 'horizontal')
    return {
      top: vertical.before,
      height: vertical.size,
      bottom: vertical.after,
      left: horizontal.before,
      width: horizontal.size,
      right: horizontal.after,
      scrollHeight: { valid: false, reasons: [LayoutInvalidReason.NOT_SCROLLABLE], value: null },
      scrollWidth: { valid: false, reasons: [LayoutInvalidReason.NOT_SCROLLABLE], value: null }
    }
  }

  computeDirection(
    parentLayout,
    parentSize,
    before,
    size,
    after,
    direction
  ) {
    const inputs = { before, size, after }
    // If props is a function, call it with parentLayout
    let props = mapValues(inputs, (val) => {
      let value
      if (isFunction(val)) {
        value = val(parentLayout, direction)
      } else {
        value = val
      }
      const valid = isNumber(value)
      return {
        valid: valid,
        value: value,
        reasons: valid ? [] : [LayoutInvalidReason.NOT_A_NUMBER]
      }
    })
    // Fill if needed
    if (!props.before.valid && !props.size.valid && !props.after.valid) {
      props.before.value = 0
      props.after.value = 0
    }
    // If only after, set before
    if (!props.before.valid && !props.size.valid && props.after.valid) {
      props.before.value = 0
    }
    // If only before, set after
    if (props.before.valid && !props.size.valid && !props.after.valid) {
      props.after.value = 0
    }
    // If only size, set before 
    if (!props.before.valid && props.size.valid && !props.after.valid) {
      props.before.value = 0
    }
    // If all valid, ignore after
    if (props.before.valid && props.size.valid && props.after.valid) {
      props.after.value = null
    }
    // Update valids
    props = mapValues(props, (val) => {
      let valid = isNumber(val.value)
      return {
        value: val.value,
        valid: valid,
        reasons: valid ? [] : [LayoutInvalidReason.NOT_A_NUMBER]
      }
    })
    // At this point, only one value should be invalid
    if (filter(props, val => (!val.valid)).length !== 1) {
      console.warn(`Layout algo bug, there should be only on invalid value at this point !`)
    }
    return mapValues(props, (val, key) => {
      if (val.valid) {
        return val
      }
      if (!parentSize.valid) {
        return {
          value: null,
          valid: false,
          reasons: [LayoutInvalidReason.INVALID_PARENT]
        }
      }
      // Compute total of other
      const othersTotal = reduce(props, (acc, rVal, rKey) => (acc + (rKey === key ? 0 : rVal.value)), 0)
      return {
        valid: true,
        value: parentSize.value - othersTotal,
        reasons: []
      }
    })
  }

}

const LayoutProp = PropTypes.oneOfType([PropTypes.number, PropTypes.func])

LayoutBox.propTypes = {
  width: LayoutProp,
  height: LayoutProp,
  left: LayoutProp,
  top: LayoutProp,
  right: LayoutProp,
  bottom: LayoutProp,
  transitionDuration: PropTypes.number,
  artificialScroll: PropTypes.bool,
  verticalScroll: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
  horizontalScroll: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
  className: PropTypes.string,
  style: PropTypes.object,
  ignoreResize: PropTypes.bool,
  children: PropTypes.any,
}

// Get parent layout and subscribe
LayoutBox.contextTypes = layoutContextValidationMap

// Provide layout and subscribe to children
LayoutBox.childContextTypes = layoutContextValidationMap
