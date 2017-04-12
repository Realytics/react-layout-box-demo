import React, { Component } from 'react'
import LayoutContainer from './LayoutContainer'
import LayoutBox from './LayoutBox'
import throttle from 'lodash/throttle'

class App extends Component {

  constructor() {
    super()
    this.state = {
      width: window.innerWidth,
      height: window.innerHeight
    }
    this.onResize = throttle(this.onResize.bind(this), 50)
  }

  componentDidMount() {
    window.addEventListener('resize', this.onResize)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize)
  }

  render() {
    return (
      <LayoutContainer width={this.state.width} height={this.state.height}>
        <LayoutBox
          bottom={(layout) => (layout.height.valid ? layout.height.value * 0.5 : 200)}
          style={{ background: '#EF5350', color: 'white', textAlign: 'left' }}
        >
          {(layout) => (layout.width.value + ' x ' + layout.height.value)}  
          <LayoutBox left={200} style={{ background: '#5C6BC0', opacity: 0.5 }}>
            {(layout) => (layout.width.value + ' x ' + layout.height.value)}
          </LayoutBox>
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
