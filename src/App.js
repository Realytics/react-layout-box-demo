import React from 'react'
import { LayoutContainer, LayoutBox, InjectLayout } from './LayoutBox'

const boxStyle = (lighness) => ({ background: `hsl(300, 41%, ${lighness}%)`, padding: 10, fontSize: '2em' })

const StupidComponent = ({ layout }) => (
  <span>Size : {`${layout.width.value} x ${layout.height.value}`}</span>
)
const StupidComponentWithLayout = InjectLayout(StupidComponent)

const App = () => (
  <LayoutContainer width={window.innerWidth} height={window.innerHeight}>
    <LayoutBox height={70} style={boxStyle(70)}>TopBar</LayoutBox>
    <LayoutBox top={70}>
      <LayoutBox width={200} style={boxStyle(60)}>Left Menu</LayoutBox>
      <LayoutBox left={200} style={boxStyle(50)}>
        <StupidComponentWithLayout />
      </LayoutBox>
    </LayoutBox>
  </LayoutContainer>
)

export default App