import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      hasError: true,
    });
    console.log({ error, errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return this.props.FallbackComponent;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
