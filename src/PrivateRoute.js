import React from 'react';
import {connect} from 'react-redux';
import {Redirect, Route} from "react-router-dom";
import toastr from 'toastr';

const PrivateRoute = ({component: Component, ...rest}) => {
    debugger;
    const usuario = rest.usuario;
    if (typeof usuario === 'undefined' || usuario === null ){
        toastr.error('Debe iniciar sesión');
    }
    return (
        <Route {...rest} render={ props => (
            typeof usuario !== 'undefined' && usuario !== null ?
                (
                    <Component {...props} />
                ) : (
                    <Redirect to={{
                        pathname: '/login',
                        state: {from: props.location}
                    }}/>
                )

            )} />
    );
};

function mapStateToProps(state) {
    return {
        usuario: state.usuario
    }
}

export default connect(mapStateToProps) (PrivateRoute);