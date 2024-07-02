import React from 'react';
import './App.module.scss';
import StarsBackground from '../StarsBackground/StarsBackground';

class App extends React.Component {
  render() {
    return (
      <div className="app">
        <StarsBackground />
        <h1>It's a wrapper</h1>
      </div>
    );
  }
}
export default App;
