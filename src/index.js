import React from 'react'
import ReactDOM from 'react-dom'
import { injectGlobal } from 'styled-components'

/* eslint-disable no-unused-vars */
import Basic from './01_Basic'
import OneRender from './02_OneRender'
import DisplaySize from './03_DisplaySize'
import Percent from './04_Percent'
import Inject from './05_Inject'
import Advanced from './06_Advanced'
/* eslint-enable */

ReactDOM.render(
  <Basic />,
  document.getElementById('root')
)

// eslint-disable-next-line no-unused-expressions
injectGlobal`
  body {
    margin: 0;
    padding: 0;
    font-family: sans-serif;
    color: white;
  
    #root > h1 {
      color: hsl(335, 46%, 34%);
    }
  }
`
