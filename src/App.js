import React from 'react'
import { LayoutContainer, LayoutBox, InjectLayout } from './LayoutBox'

const StupidComponent = (props) => (
  <p>{`${props.layout.width.value} x ${props.layout.height.value}`}</p>
)
const StupidComponentWithLayout = InjectLayout(StupidComponent)

const App = () => (
  <LayoutContainer width={window.innerWidth} height={window.innerHeight}>
    <LayoutBox height={70} style={{ background: 'RosyBrown' }}>TopBar</LayoutBox>
    <LayoutBox top={70}>
      <LayoutBox width={200} style={{ background: 'BurlyWood' }}>Left Menu</LayoutBox>
      <LayoutBox left={200} style={{ background: 'MistyRose' }}>
        <StupidComponentWithLayout />
      </LayoutBox>
    </LayoutBox>
  </LayoutContainer>
)

export default App