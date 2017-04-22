import React from 'react'
import { LayoutContainer, LayoutBox } from './LayoutBox'

const App = () => (
  <LayoutContainer width={window.innerWidth} height={window.innerHeight}>
    <LayoutBox height={70} style={{ background: 'RosyBrown' }}>Top Bar</LayoutBox>
    <LayoutBox top={70}>
      <LayoutBox width={250} style={{ background: 'BurlyWood' }}>Left Menu</LayoutBox>
      <LayoutBox left={250} style={{ background: 'MistyRose' }}>Content</LayoutBox>
    </LayoutBox>
  </LayoutContainer>
)

export default App
