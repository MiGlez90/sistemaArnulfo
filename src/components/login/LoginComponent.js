import React from 'react';
import {TextField,RaisedButton} from 'material-ui';

const styleButton = {
    margin: '30px 0px 10px 0px ',
    display: 'block'
};

const textFieldStyle = {
    display: 'block',
    margin: '5px 0px'
};

const formStyle = {
    width: '30vw'
};
const LoginComponent = (props) => {
    console.log(props.usuario);
    return (
        <form
            onSubmit={props.onSubmit}
        style={formStyle}>
            <TextField
                name="email"
                required
                floatingLabelText="Email"
                value={props.usuario.email}
                onChange={props.onChange}
                type="email"
                style={textFieldStyle}
                fullWidth={true}
            />
            <TextField
                style={textFieldStyle}
                name="password"
                required
                floatingLabelText="Contraseña"
                value={props.usuario.password}
                onChange={props.onChange}
                type="password"
                fullWidth={true}
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