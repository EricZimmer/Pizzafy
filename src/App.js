import React, { Component } from 'react';

import './App.css';
import Pizza from './components/Pizza/Pizza';
import BuildControls from './components/BuildControls/BuildControls';

class App extends Component {
  render() {
    return (
      <div>
        <Pizza />
        <BuildControls />
      </div>
    );
  }
}

export default App;
