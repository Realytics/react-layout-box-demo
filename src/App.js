import React, { Component } from 'react'
import { LayoutContainer, LayoutBox, InjectLayout, LayoutUtils } from './LayoutBox'
import throttle from 'lodash/throttle'

const StupidComponent = (props) => (
  <p>{(props.layout.width.value + ' x ' + props.layout.height.value)}</p>
)

const StupidComponentWithLayout = InjectLayout(StupidComponent)

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
          bottom={LayoutUtils.percent(50)}
          style={{ background: '#EF5350', color: 'white', textAlign: 'left' }}
        >
          {LayoutUtils.display}  
          <LayoutBox left={200} style={{ background: '#5C6BC0', opacity: 0.5 }}>
            {LayoutUtils.display}
          </LayoutBox>
        </LayoutBox>
        <LayoutBox top={LayoutUtils.percent(60)}>
          <StupidComponentWithLayout />
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
