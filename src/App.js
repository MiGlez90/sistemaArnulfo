import React, { Component } from 'react';
import './App.css';
import Routes from './Routes';
import {AppBar} from 'material-ui';
import Nav from './components/nav/Nav';






class App extends Component {
  render() {
    return (
      <div>
        <AppBar
            title="Flujo de Efectivo"
            iconClassNameRight="muidocs-icon-navigation-expand-more"
        />
        <Nav/>

          <div style={styles.container}>
              <Routes />
          </div>

      </div>
    );
  }
}

const styles = {
    container:{
        marginLeft:'300px',
        marginRight:'100px',
        marginTop:'70px'
    }
};


export default App;
