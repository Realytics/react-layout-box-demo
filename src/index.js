import React from 'react'
import ReactDOM from 'react-dom'
import { injectGlobal } from 'styled-components'

/* eslint-disable no-unused-vars */
import App from './App'
/* eslint-enable */

ReactDOM.render(
  <App />,
  document.getElementById('root')
)

// eslint-disable-next-line no-unused-expressions
injectGlobal`
  body {
    margin: 0;
    padding: 0;
    font-family: sans-serif;
    color: white;
  
  }

  h1 {
    color: hsl(335, 46%, 34%);
  }
`
