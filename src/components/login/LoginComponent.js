import React from 'react';
import {TextField,RaisedButton} from 'material-ui';

const styleButton = {
    margin: '20px 0px',
    display: 'block'
};

const formStyle = {
    display: 'block'
};

const LoginComponent = (props) => {
    console.log(props.usuario);
    return (
        <form
            onSubmit={props.onSubmit}>
            <TextField
                name="email"
                required
                floatingLabelText="Email"
                value={props.usuario.email}
                onChange={props.onChange}
                type="email"
                style={formStyle}
            />
            <TextField
                style={formStyle}
                name="password"
                required
                floatingLabelText="Contraseña"
                value={props.usuario.password}
                onChange={props.onChange}
                type="password"
            />
            <RaisedButton
                label="Entrar"
                primary={true}
                style={styleButton}
                type="submit"
                fullWidth={true}
            />

        </form>
    );
};

export default LoginComponent;