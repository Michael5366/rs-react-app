import { Component, type ErrorInfo } from 'react';
import type { ErrorBoundaryProps, ErrorBoundaryState } from './interface';
import ErrorMsg from '../Templates/ErrorMsg/ErrorMsg';
import ButtonTemplate from '../Templates/ButtonTemplate/ButtonTemplate';

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);

    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.log('Caught by ErrorBoundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="app">
          {this.props.fallback ?? <ErrorMsg errorMsg="Something went wrong" />}

          <ButtonTemplate
            className="app__btn-back"
            onClick={(): void => this.setState({ hasError: false })}
          >
            Go back
          </ButtonTemplate>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
