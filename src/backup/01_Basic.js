import React from 'react'
import { LayoutContainer, LayoutBox } from './LayoutBox'

const Basic = () => (
  <LayoutContainer width={window.innerWidth} height={window.innerHeight}>
    <LayoutBox height={70} style={{ background: 'DodgerBlue' }}>TopBar</LayoutBox>
    <LayoutBox top={70}>
      <LayoutBox width={200} style={{ background: 'OrangeRed' }}>Left Menu</LayoutBox>
      <LayoutBox left={200} style={{ background: 'BlueViolet' }}>Content</LayoutBox>
    </LayoutBox>
  </LayoutContainer>
)

export default Basic
