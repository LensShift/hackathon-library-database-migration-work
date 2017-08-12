import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import CartContainer from './containers/CartContainer';

import './App.css';

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <div className="App">

          <div className="App-header">
            <h2>Kreatize Cart</h2>
          </div>
          
          <CartContainer />

        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
