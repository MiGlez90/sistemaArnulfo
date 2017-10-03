import React, {Component} from 'react';
import {Drawer, MenuItem} from 'material-ui';
import NoteAdd from 'material-ui/svg-icons/action/note-add';
import Resumen from 'material-ui/svg-icons/editor/insert-chart';
import System from 'material-ui/svg-icons/action/system-update-alt';
import Cart from 'material-ui/svg-icons/action/add-shopping-cart';
import Invent from 'material-ui/svg-icons/editor/format-list-numbered';
import {NavLink} from 'react-router-dom';



class Nav extends Component {

    state = {
        active:0
    };

    oddEvent = (num) => {
        //this.setState({active:num});
    };

    render(){
        //const {oddEvent} = this;
        const {active} = this.state;
        return(
            <Drawer containerStyle={styles.draw}>
                <NavLink
                    activeClassName="selected"
                    activeStyle={{
                        fontWeight: 'bold',
                    }}
                    //isActive={()=>this.oddEvent(1)}
                    to="/ingresos">
                    <MenuItem
                        style={active?styles.active:null}
                        primaryText="Ingresos"
                        leftIcon={<NoteAdd />} />
                </NavLink>
                <NavLink
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

//


const styles = {
    draw:{
        top:'64px'
    },
    active:{
        backgroundColor:'red'
    }
};

export default Nav;