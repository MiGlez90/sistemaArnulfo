import React from 'react';
import {TextField} from 'material-ui';

const FormularioEditar = (props) => {
    return(
        <div>
            <form>
                {propss.data.map((gasto) => {
                    if(gasto.label === 'key'){
                        return null;
                    }

                    return <TextField
                        style={textFieldStyle}
                        key={gasto.label}
                        floatingLabelText={gasto.label}
                        name={gasto.label}
                        value={props.gasto[gasto.label]}
                        onChange={props.onChange}
                    />
                })}
            </form>
        </div>
    );
};

const textFieldStyle =  {
    margin:'10 px 20px'
};

export default FormularioEditar;