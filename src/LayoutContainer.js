import React from 'react'
import isFunction from 'lodash/isFunction'
import { layoutContextValidationMap, LayoutStore, LayoutInvalidReason } from './LayoutStore'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const ContainerWrapper = styled.div`
  position: relative;
  top: 0;
  left: 0;
  margin: 0;
  padding: 0;
  height: ${(props) => (props.size.height)}px;
  width: ${(props) => (props.size.width)}px;

  &:after {
    content: "";
    display: table;
    clear: both;
  }
`

export default class LayoutContainer extends React.Component {

  constructor(props, context) {
    super(props, context)
    this.layoutStore = new LayoutStore(this.getLayout(props))
  }

  getChildContext() {
    return {
      layoutStore: this.layoutStore
    }
  }

  componentWillReceiveProps(nextProps) {
    this.layoutStore.setState(this.getLayout(nextProps))
  }

  render() {
    const size = {
      width: this.props.width,
      height: this.props.height
    }
  
    return (
      <ContainerWrapper size={size}>
        { isFunction(this.props.children) ? this.props.children(this.layoutStore.getState()) : this.props.children }
      </ContainerWrapper>
    )
  }

  getLayout(props) {
    return {
      width: { valid: true, value: props.width, reasons: [] },
      height: { valid: true, value: props.height, reasons: [] },
      left: { valid: true, value: 0, reasons: [] },
      top: { valid: true, value: 0, reasons: [] },
      right: { valid: true, value: 0, reasons: [] },
      bottom: { valid: true, value: 0, reasons: [] },
      scrollHeight: { valid: false, value: null, reasons: [LayoutInvalidReason.NOT_SCROLLABLE] },
      scrollWidth: { valid: false, value: null, reasons: [LayoutInvalidReason.NOT_SCROLLABLE] }
    }
  }

}

LayoutContainer.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  children: PropTypes.element.isRequired
}

LayoutContainer.childContextTypes = layoutContextValidationMap
