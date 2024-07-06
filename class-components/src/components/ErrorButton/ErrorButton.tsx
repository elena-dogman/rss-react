import React from 'react';
import styles from './ErrorButton.module.scss';

interface ErrorButtonState {
  throwError: boolean;
}

class ErrorButton extends React.Component<{}, ErrorButtonState> {
  constructor(props: {}) {
    super(props);
    this.state = { throwError: false };
  }

  handleClick = () => {
    this.setState({ throwError: true });
  };

  render() {
    if (this.state.throwError) {
      throw new Error('Test error');
    }

    return (
      <button className={styles['error-button']} onClick={this.handleClick}>
        Error
      </button>
    );
  }
}

export default ErrorButton;
