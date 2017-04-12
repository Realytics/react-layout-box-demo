import PropTypes from 'prop-types'

export const LayoutInvalidReason = {
  INVALID_PARENT: 0,
  NOT_SET_LAYOUT_ALGO_BUG: 1,
  NOT_SCROLLABLE: 2,
  NOT_A_NUMBER: 3
}

export const layoutContextValidationMap = {
  layoutStore: PropTypes.any.isRequired
}

export class LayoutStore {

  constructor(initialState) {
    this.state = initialState
    this.listeners = []
    this.subscribe = this.subscribe.bind(this)
  }

  setState(newState) {
    this.state = newState
    this.broadcast(this.state)
  }

  broadcast(state) {
    this.listeners.forEach(listener => listener(state))
  }

  getState() {
    return this.state
  }

  subscribe(listener) {
    this.listeners.push(listener)
    // Retun unsubscribe
    return () => {
      const index = this.listeners.indexOf(listener)
      if (index > -1) {
        this.listeners.splice(index, 1)
      }
    }
  }

}
