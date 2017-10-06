import React, { Component } from 'react';
import './App.css';
import Routes from './Routes';
import {AppBar} from 'material-ui';
import Nav from './components/nav/Nav';






class App extends Component {
    state = {
        showDrawer : false
    };

    openDrawer = () => {
        let {showDrawer} = this.state;
        showDrawer = !showDrawer;
        this.setState({showDrawer});
    };

    render() {
    return (
      <div>
        <AppBar
            title="Flujo de Efectivo"
            iconClassNameRight="muidocs-icon-navigation-expand-more"
            onLeftIconButtonTouchTap={this.openDrawer}
            style={{top:0,position:'fixed'}}
        />
        <Nav open={this.state.showDrawer} toogleDrawer={this.openDrawer}/>

          <div className="routes-container App">
              <Routes />
          </div>

      </div>
    );
  }
}

const styles = {
    container:{
        marginLeft:'22%'
    }
};


export default App;
