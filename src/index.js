import React from 'react'
import ReactDOM from 'react-dom'
import { injectGlobal } from 'styled-components'

import App from './App'

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
    overflow: hidden;
  }
`
