import React from 'react'
import PropTypes from 'prop-types'

class ColorStore {

  constructor(initialColor) {
    this.color = initialColor
    this.listeners = []
  }

  addListener(callback) {
    this.listeners.push(callback)
  }

  setValue(newColor) {
    this.color = newColor
    this.listeners.forEach(listener => listener(this.color))
  }

  getValue() {
    return this.color
  }

}

class Button extends React.Component {

  constructor(props, context) {
    super(props, context)
    context.colorStore.addListener(() => {
      this.forceUpdate()
    })
  }

  render() {
    return (
      <button style={{background: this.context.colorStore.getValue()}}>
        {this.props.children}
      </button>
    )
  }

}

Button.contextTypes = {
  colorStore: PropTypes.instanceOf(ColorStore)
}

class Message extends React.Component {

  shouldComponentUpdate() {
    return false
  }

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
    this.colorStore = new ColorStore('PapayaWhip')
  }

  getChildContext() {
    return { colorStore: this.colorStore }
  }

  render() {
    return (
      <div
        onClick={() => { this.colorStore.setValue(this.colorStore.getValue() === "PapayaWhip" ? "Navy" : "PapayaWhip") }}
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
  colorStore: PropTypes.instanceOf(ColorStore)
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
