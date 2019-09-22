import React, { Component } from 'react';

// import ErrorIndicator from '../error-indicator/error-indicator';

export default class ErrorBoundry extends Component {

  state = {
    hasError: false,
    info: null
  };

  componentDidCatch(error, {componentStack}) {
    console.log('componentStack')
    console.log(componentStack)

    this.setState({
      hasError: true,
      info: componentStack
    });
  }

  render() {
    if (this.state.hasError) {
      return <div>{this.state.info}</div>
      // return <ErrorIndicator />
    }

    return this.props.children;
  }
}
