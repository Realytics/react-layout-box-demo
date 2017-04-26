import React from 'react'
import { LayoutContainer, LayoutBox, LayoutUtils } from './LayoutBox'

const boxStyle = (lighness) => ({ background: `hsl(200, 41%, ${lighness}%)`, padding: 10, fontSize: '2em' })

const App = () => (
  <LayoutContainer width={window.innerWidth} height={window.innerHeight}>
    <LayoutBox height={70} style={boxStyle(60)}>Top Bar</LayoutBox>
    <LayoutBox top={70}>
      <LayoutBox width={(layout) => (layout.width.value * 0.3)} style={boxStyle(70)}>Left Menu</LayoutBox>
      <LayoutBox left={LayoutUtils.percent(30)} style={boxStyle(50)}>Content</LayoutBox>
    </LayoutBox>
  </LayoutContainer>
)

export default App
