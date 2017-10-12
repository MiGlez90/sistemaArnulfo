import React, { Component } from 'react';
import './App.css';
import Routes from './Routes';
import Nav from './components/nav/Nav';
import NavBar from "./components/nav/NavBar";

class App extends Component {
    state = {
        showDrawer : false
    };

    openDrawer = () => {
        let {showDrawer} = this.state;
        showDrawer = !showDrawer;
        this.setState({showDrawer});
    };

    forceClosingDrawer = () => {
        this.setState({showDrawer:false})
    };

    render() {
        return (
            <div>
                <NavBar forceClosingDrawer={this.forceClosingDrawer} openDrawer={this.openDrawer}/>
                <Nav open={this.state.showDrawer} toogleDrawer={this.openDrawer}/>
                <div className="routes-container App" style={this.state.showDrawer ? styles.drawer: styles.noDrawer}>
                    <Routes />
                </div>
          </div>
        );
  }
}

const styles = {
    noDrawer:{
        paddingLeft:'3vw',
        paddingRight:'3vw'
    },
    drawer:{
        paddingLeft:'23vw',
        paddingRight:'3vw'
    }
};


export default (App);
