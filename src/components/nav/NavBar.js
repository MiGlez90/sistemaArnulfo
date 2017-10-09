import React, {Component} from 'react';
import {AppBar,FlatButton} from 'material-ui';
import {connect} from 'react-redux';
import {NavLink, Redirect} from "react-router-dom";
import * as usuarioActions from '../../actions/usuarioActions';
import {bindActionCreators} from "redux";
import toastr from 'toastr';
import MenuIcon from 'material-ui/svg-icons/navigation/menu';
import IconButton from 'material-ui/IconButton';


const buttonStyle = {
    color: 'white'
};


class NavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    closeSession = () => {
        this.props.forceClosingDrawer();
        this.props.usuarioActions.cerrarSesion()
            .then( r => {
                toastr.success('Hasta pronto');
            })
            .catch( e => {
                toastr.error(e.message);
            })
        ;
    };

    render() {
        const {usuario} = this.props;
        let iconRight = (
            <NavLink to='/login'>
                <FlatButton style={buttonStyle} label="Iniciar sesion" />
            </NavLink>
        );
        let iconLeft = (
            <div></div>
        );

        if( typeof usuario !== 'undefined' && usuario !== null ){
            iconRight = (
                <NavLink to="/">
                    <FlatButton style={buttonStyle} label="Cerrar sesion" onClick={this.closeSession} />
                </NavLink>
            );
            iconLeft = (
                <IconButton><MenuIcon /></IconButton>
            );
        }
        return (
            <div>
                <AppBar
                    title="Flujo de Efectivo"
                    onLeftIconButtonTouchTap={usuario ? this.props.openDrawer : null}
                    style={{top:0,position:'fixed'}}
                    iconElementRight={iconRight}
                    iconElementLeft={iconLeft}
                />
            </div>
        );
    }

}

function mapStateToProps(state, ownProps) {
    return {
        usuario: state.usuario
    }
}

function mapDispatchToProps(dispatch) {
    return {
        usuarioActions: bindActionCreators(usuarioActions, dispatch)
    }
}
export default connect(mapStateToProps, mapDispatchToProps) (NavBar);