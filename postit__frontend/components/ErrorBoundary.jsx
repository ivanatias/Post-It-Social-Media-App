import React from "react";
import ErrorFallback from "./ErrorFallback";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
    this.resetErrorState = this.resetErrorState.bind(this);
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      hasError: true,
    });
  }

  resetErrorState() {
    this.setState({
      hasError: false,
    });
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback resetErrorState={this.resetErrorState} />;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
