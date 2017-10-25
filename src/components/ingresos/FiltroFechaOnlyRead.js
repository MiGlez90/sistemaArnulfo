import React from 'react';
import {RaisedButton} from 'material-ui';
import './IngresoContainer.css';

const FiltroFechaOnlyRead = (props) => {
    const {fechaInicio, fechaFinal,onClick, ...rest} = props;
    return (
        <div {...rest}>
            <div className="container-responsive-fifty">
                <p style={{fontSize:'1.8em', fontWeight: 'bold'}}>Lista de ventas del {fechaInicio} al {fechaFinal}</p>
            </div>
            <div className="container-responsive">
                <RaisedButton
                    label="Editar"
                    primary={true}
                    onClick={onClick}
                />
            </div>
        </div>
    );
};

export default FiltroFechaOnlyRead;