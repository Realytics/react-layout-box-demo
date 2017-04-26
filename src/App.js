import React, { Component, PureComponent } from 'react'
import { LayoutContainer, LayoutBox, LayoutUtils } from './LayoutBox'
import throttle from 'lodash/throttle'

const boxStyle = (lighness) => ({ background: `hsl(0, 41%, ${lighness}%)`, padding: 10, fontSize: '2rem' })

/**
 * Content
 */
class ContentPure extends PureComponent {

  constructor() {
    super()
    this.renderCount = 0
  }

  render() {
    this.renderCount++
    return (
      <LayoutBox style={boxStyle(60)} top={20} left={20} right={20} bottom={20}>
        {() => {
          // eslint-disable-next-line no-console
          console.log('Render Pure Component Content')
          return (
            <div>
              <b>Pure Component </b> <br />
              Render count : {this.renderCount} <br />
            </div>
          )
        }}
      </LayoutBox>
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
  }

  render() {
    this.renderCount++
    return (
      <LayoutBox style={boxStyle(60)} top={20} left={20} right={20} bottom={20}>
        {() => {
          // eslint-disable-next-line no-console
          console.log('Render Normal Component Content')
          return (
            <div>
              <b>Normal Component</b> <br />
              Render count : {this.renderCount} <br />
            </div>
          )
        }}
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
      <LayoutContainer width={this.state.width} height={this.state.height} style={boxStyle(70)}>
        <LayoutBox bottom={LayoutUtils.percent(50)}>
          <Content />
        </LayoutBox>
        <LayoutBox top={LayoutUtils.percent(50)}>
          <ContentPure />
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
