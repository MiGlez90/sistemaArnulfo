import React from 'react';


const SignUpComponent = (props) => {

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
}

export default SignUpComponent;