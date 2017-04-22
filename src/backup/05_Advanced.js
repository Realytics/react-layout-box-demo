import React, { Component } from 'react'
import { LayoutContainer, LayoutBox } from './LayoutBox'
import throttle from 'lodash/throttle'

/**
 * RenderCounter
 */
class RenderCounter extends Component {
  constructor() {
    super()
    this.renderCount = 0
  }
  render() {
    this.renderCount++
    return (
      <span>{this.renderCount}</span>
    )
  }
}

/**
 * Content
 */
class Content extends Component {
  constructor() {
    super()
    this.renderCount = 0
    this.state = {
      clickCount: 0
    }
  }
  shouldComponentUpdate(nextProps, nextState) {
    return this.state.clickCount !== nextState.clickCount
  }
  render() {
    this.renderCount++
    return (
      <LayoutBox height={200} style={{ background: 'MediumOrchid' }} onClick={() => this.setState((state) => ({ clickCount: state.clickCount + 1 }))}>
        Content Click count : {this.state.clickCount} <br />
        Content Render count : {this.renderCount} <br />
        Locale Render count : <RenderCounter />
      </LayoutBox>
    )
  }
}

/**
 * Advanced
 */
class App extends Component {

  constructor() {
    super()
    this.state = {
      width: window.innerWidth,
      height: window.innerHeight
    }
    this.renderCount = 0
    this.onResize = throttle(this.onResize.bind(this), 20)
  }

  componentDidMount() {
    window.addEventListener('resize', this.onResize)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize)
  }

  render() {
    this.renderCount++
    return (
      <LayoutContainer width={this.state.width} height={this.state.height} style={{ background: 'DeepPink' }}>
        <LayoutBox height={50}>
          App Render count : {this.renderCount} <br />
        </LayoutBox>
        <LayoutBox top={50}>
          <Content />
        </LayoutBox>
      </LayoutContainer>
    )
  }

  onResize() {
    this.setState({
      width: window.innerWidth,
      height: window.innerHeight    
    })
  }
}

export default App
