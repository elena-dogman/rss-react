import React, { Component, ErrorInfo, ReactNode } from 'react';
import styles from './ErrorBoundaty.module.scss';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('Test error:', error, errorInfo);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div className={styles['error-container']}>
          <img
            src="src/assets/C-3PO.png"
            className={styles['error-image']}
          ></img>
          <div className={styles['error-content']}>
            <h1 className={styles['error-title']}>
              Oops... Something went wrong
            </h1>
            <p className={styles['error-text']}>Refresh the page</p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
