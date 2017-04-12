import React from 'react'
import { LayoutContainer, LayoutBox, LayoutUtils } from './LayoutBox'

const Percent = () => (
  <LayoutContainer width={window.innerWidth} height={window.innerHeight}>
    <LayoutBox height={70} style={{ background: 'DodgerBlue' }}>TopBar</LayoutBox>
    <LayoutBox top={70}>
      <LayoutBox width={LayoutUtils.percent(50)} style={{ background: 'OrangeRed' }}>Left Menu</LayoutBox>
    </LayoutBox>
  </LayoutContainer>
)

export default Percent
