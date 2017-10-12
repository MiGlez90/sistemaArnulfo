import React, {Component} from 'react';
import {Drawer, MenuItem} from 'material-ui';
import HomeIcon from 'material-ui/svg-icons/action/home';
import NoteAdd from 'material-ui/svg-icons/action/note-add';
import Resumen from 'material-ui/svg-icons/editor/insert-chart';
import System from 'material-ui/svg-icons/action/system-update-alt';
import Cart from 'material-ui/svg-icons/action/add-shopping-cart';
import Invent from 'material-ui/svg-icons/editor/format-list-numbered';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as navBarNameActions from '../../actions/navBarNameActions'

class Nav extends Component {

    state = {
        active:0
    };

    oddEvent = (num) => {
        //this.setState({active:num});
    };

    changeName = (name) => {
        this.props.navBarNameActions.changeName(name);
    };

    render(){
        //const {oddEvent} = this;
        const {active} = this.state;
        return(
            <Drawer
                containerStyle={styles.draw}
                open={this.props.open}
                docked={true}
                width='20%'>
                <NavLink
                    onClick={this.props.toogleDrawer}
                    activeClassName="selected"
                    activeStyle={{
                        fontWeight: 'bold',
                    }}
                    //isActive={()=>this.oddEvent(1)}
                    exact
                    to="/">
                    <MenuItem
                        style={active?styles.active:null}
                        primaryText="Inicio"
                        leftIcon={<HomeIcon/>}
                        //onClick={()=>this.changeName('Ingresos')}
                    />
                </NavLink>
                <NavLink
                    onClick={this.props.toogleDrawer}
                    activeClassName="selected"
                    activeStyle={{
                        fontWeight: 'bold',
                    }}
                    //isActive={()=>this.oddEvent(1)}
                    to="/ingresos">
                    <MenuItem
                        style={active?styles.active:null}
                        primaryText="Ingresos"
                        leftIcon={<NoteAdd />}
                        //onClick={()=>this.changeName('Ingresos')}
                    />
                </NavLink>
                <NavLink
                    onClick={this.props.toogleDrawer}
                    activeClassName="selected"
                    activeStyle={{
                        fontWeight: 'bold',
                    }}
                    //isActive={()=>this.oddEvent(1)}
                    exact
                    to="/gastos">
                    <MenuItem
                        style={active?styles.active:null}
                        primaryText="Gastos"
                        leftIcon={<Cart />} />
                </NavLink>

                <NavLink
                    onClick={this.props.toogleDrawer}
                    activeClassName="selected"
                    activeStyle={{
                        fontWeight: 'bold',
                    }}
                    //isActive={()=>this.oddEvent(1)}
                    exact
                    to="/caja">
                    <MenuItem
                        style={active?styles.active:null}
                        primaryText="Caja y Bancos"
                        leftIcon={<System />} />
                </NavLink>

                <NavLink
                    onClick={this.props.toogleDrawer}
                    activeClassName="selected"
                    activeStyle={{
                        fontWeight: 'bold',
                    }}
                    //isActive={()=>this.oddEvent(1)}
                    exact
                    to="/resumen">
                    <MenuItem
                        style={active?styles.active:null}
                        primaryText="Resumen"
                        leftIcon={<Resumen />} />
                </NavLink>

                <NavLink
                    onClick={this.props.toogleDrawer}
                    activeClassName="selected"
                    activeStyle={{
                        fontWeight: 'bold',
                    }}
                    //isActive={()=>this.oddEvent(1)}
                    exact
                    to="/inventario">
                    <MenuItem
                        style={active?styles.active:null}
                        primaryText="Inventario"
                        leftIcon={<Invent />} />
                </NavLink>
            </Drawer>
        );
    }
}

const styles = {
    draw:{
        top:'64px'
    },
    active:{
        backgroundColor:'red'
    }
};

function mapStateToProps(state, ownProps) {
    return {
        navBarName: state.navBarName
    }
}

function mapDispatchToProps(dispatch) {
    return {
        navBarNameActions: bindActionCreators(navBarNameActions,dispatch)
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Nav);