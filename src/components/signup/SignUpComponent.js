import React from 'react';
import {TextField, RaisedButton, Checkbox} from 'material-ui';
import {NavLink} from "react-router-dom";

const formStyle = {
    width: '30vw',
    textAlign: 'center'
};

const styleButton = {
    margin: '30px 0px 10px 0px ',
    display: 'block'
};

const textFieldStyle = {
    display: 'block',
    margin: '5px 0px'
};

const pStyle = {
    fontSize: '14px',
    display: 'inline'
};

const navStyle = {
    fontSize: '14px',
    display: 'inline'
};

const styles = {
    block: {
        maxWidth: 250,
    },
    checkbox: {
        margin: '15px 0px'
    },
};


const SignUpComponent = (props) => {
    console.log(props.newUser);
    return (
        <form
            onSubmit={props.onSubmit}
            style={formStyle}>
            <TextField
                name="fullName"
                required
                floatingLabelText="Nombre Completo"
                value={props.newUser.fullName}
                onChange={props.onChange}
                style={textFieldStyle}
                fullWidth={true}
            />
            <TextField
                name="email"
                required
                floatingLabelText="Email"
                value={props.newUser.email}
                onChange={props.onChange}
                style={textFieldStyle}
                fullWidth={true}
                type="email"
            />
            <TextField
                style={textFieldStyle}
                name="password"
                required
                floatingLabelText="Contraseña"
                value={props.newUser.password}
                onChange={props.onChange}
                type={props.checked ? "text" : "password"}
                fullWidth={true}
            />
            <TextField
                style={textFieldStyle}
                name="confirmPassword"
                required
                floatingLabelText="Confirmar contraseña"
                value={props.newUser.confirmPassword}
                onChange={props.onChange}
                type={props.checked ? "text" : "password"}
                fullWidth={true}
                errorText={props.matching ? null : "La contraseña no coincide" }
            />
            <div style={{textAlign:'left'}}>
                <Checkbox
                    label="Mostrar contraseñas"
                    checked={props.checked}
                    onCheck={props.updateCheck}
                    style={styles.checkbox}
                />
            </div>
            <RaisedButton
                label="Registrarse"
                primary={true}
                style={styleButton}
                type="submit"
                fullWidth={true}
            />
            <p style={pStyle}>¿Ya tienes cuenta? </p>
            {' '}
            <NavLink style={navStyle} to='/login'>Ingresa</NavLink>
        </form>
    );
}

export default SignUpComponent;