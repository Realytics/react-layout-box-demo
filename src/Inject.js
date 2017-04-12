import React from 'react'
import { LayoutContainer, LayoutBox, InjectLayout } from './LayoutBox'

const StupidComponent = (props) => (
  <p>{`${props.layout.width.value} x ${props.layout.height.value}`}</p>
)
const StupidComponentWithLayout = InjectLayout(StupidComponent)

const Inject = () => (
  <LayoutContainer width={window.innerWidth} height={window.innerHeight}>
    <LayoutBox height={70} style={{ background: 'DodgerBlue' }}>TopBar</LayoutBox>
    <LayoutBox top={70}>
      <LayoutBox width={200} style={{ background: 'OrangeRed' }}>Left Menu</LayoutBox>
      <LayoutBox left={200} style={{ background: 'BlueViolet' }}>
        <StupidComponentWithLayout />
      </LayoutBox>
    </LayoutBox>
  </LayoutContainer>
)

export default Inject
