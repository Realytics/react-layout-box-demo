import React from 'react'
import { LayoutContainer, LayoutBox } from './LayoutBox'

const boxStyle = (lighness) => ({ background: `hsl(0, 41%, ${lighness}%)`, padding: 10, fontSize: '2rem', color: 'white' })

const functionAsChildren = (layout) => (
  <div>
    Content
    <pre>
      {JSON.stringify(layout, null, 2)}
    </pre>
  </div>
)

const App = () => (
  <LayoutContainer width={window.innerWidth} height={window.innerHeight}>
    <LayoutBox height={70} style={boxStyle(50)}>Top Bar</LayoutBox>
    <LayoutBox top={70}>
      <LayoutBox width={250} style={boxStyle(60)}>Left Menu</LayoutBox>
      <LayoutBox left={250} style={boxStyle(70)} verticalScroll>
        {functionAsChildren}
      </LayoutBox>
    </LayoutBox>
  </LayoutContainer>
)

export default App
