import React from 'react'
import { LayoutContainer, LayoutBox} from './LayoutBox'

const App = () => (
  <LayoutContainer width={window.innerWidth} height={window.innerHeight}>
    <LayoutBox height={70} style={{ background: 'RosyBrown' }}>TopBar</LayoutBox>
    <LayoutBox top={70}>
      <LayoutBox width={200} style={{ background: 'BurlyWood' }}>Left Menu</LayoutBox>
      <LayoutBox left={200} style={{ background: 'MistyRose' }}>
        {(layout) => (
          <pre>
            {JSON.stringify(layout, null, 2)}
          </pre>
        )}
      </LayoutBox>
    </LayoutBox>
  </LayoutContainer>
)

export default App
