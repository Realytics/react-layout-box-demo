import React from 'react'
import PropTypes from 'prop-types'

const Button = (props, context) => (
  <button style={{background: context.color}}>
    {props.children}
  </button>
)

Button.contextTypes = {
  color: PropTypes.string
}

class Message extends React.Component {

  render() {
    return (
      <div>
        {this.props.text} <Button>Amazing !</Button>
      </div>
    )
  }

}

class MessageList extends React.Component {

  constructor() {
    super()
    this.state = { color: "red" }
  }

  getChildContext() {
    return { color: this.state.color }
  }

  render() {
    return (
      <div
        onClick={() => this.setState(state => (
          { color: (state.color === "red" ? "blue" : "red") }
        ))}
      >
        {React.Children.toArray(
          this.props.messages.map((message) =>
            <Message text={message.text} />
          )
        )}
      </div>
    )
  }
}

MessageList.childContextTypes = {
  color: PropTypes.string
}

const messages = [
  { text: 'React is ' },
  { text: 'Typescript is ' },
  { text: 'VS Code is ' }
]

const App = () => (
  <MessageList messages={messages} />
)

export default App
