import React from 'react'
import { layoutContextValidationMap } from './LayoutStore'
import hoistNonReactStatic from 'hoist-non-react-statics'

export default function InjectLayout(Target) {
  class LayoutProvider extends React.Component {

    componentDidMount() {
      if (!this.context.layoutStore) {
        throw new Error('LayoutProvider need a LayoutContainer as ancestor !')
      }
      this.unsubscribe = this.context.layoutStore.subscribe(() => {
        this.forceUpdate()
      })
    }

    render() {
      const layout = this.context.layoutStore.getState()
      return (
        <Target {...this.props} layout={layout} />
      )
    }

    componentWillUnmount() {
      this.unsubscribe()
    }
  }

  LayoutProvider.contextTypes = layoutContextValidationMap

  return hoistNonReactStatic(LayoutProvider, Target)
}