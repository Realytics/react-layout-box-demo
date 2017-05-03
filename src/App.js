import React from 'react'

/**
 * The color props is passed down :
 * MessageList => Message => Button
 */

const Button = ({ color, children }) => (
  <button style={{background: color}}>
    {children}
  </button>
)

const Message = ({ text, color }) => (
  <div>
    {text} <Button color={color}>Amazing !</Button>
  </div>
)

class MessageList extends React.Component {
  render() {
    const color = "red"
    return (
      <div>
        {React.Children.toArray(
          this.props.messages.map((message) =>
            <Message text={message.text} color={color} />
          )
        )}
      </div>
    )
  }
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
