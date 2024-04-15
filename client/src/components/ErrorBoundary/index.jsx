import React, { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error:", error);
    console.error("Info:", errorInfo);

    this.setState({ hasError: true, error: error, errorInfo: errorInfo });
  }

  render() {
    const { hasError, error, errorInfo } = this.state;
    const { FallbackComponent, children } = this.props;

    if (hasError) {
      return <FallbackComponent error={error} errorInfo={errorInfo} />;
    }

    return children;
  }
}

export default ErrorBoundary;
