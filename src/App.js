import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

// import MainContainer from './containers/MainContainer';
import ResourceList from './containers/ResourceList';

import './App.css';

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <div className="App">


          <div className="App-header">
            <h2>LensShift Library</h2>
          </div>

          <ResourceList />
          
          {/* <MainContainer /> */}

        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
