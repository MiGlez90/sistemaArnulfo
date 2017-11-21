import React from 'react';
import {TextField} from 'material-ui';

const FormularioEditar = (props) => {
    console.log(props.ingreso);
    return (
        <div>
            <form>
                {props.data.map((ingreso) => {
                    if(ingreso.label === 'key'){
                        return null;
                    }
                    return <TextField
                        style={textFieldStyle}
                        key={ingreso.label}
                        floatingLabelText={ingreso.label}
                        name={ingreso.label}
                        value={props.ingreso[ingreso.label]}
                        onChange={props.onChange}
                    />
                })}
            </form>
        </div>
    );
};

const textFieldStyle = {
    margin:'10px 20px'
};

export default FormularioEditar;
