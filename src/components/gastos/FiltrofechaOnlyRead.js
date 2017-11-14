import React from 'react';
import {RaisedButton} from 'material-ui';
import './GastoContainer.css';

const FiltroFechaOnlyRead = (props) => {
    const {fechaInicio, fechaFinal, onClick, ...rest} = props;
    return (
        <div {...rest}>
            <div className="container-responsive-fifty">
                <p style={{fontSize: '1.8 em', fontWeight: 'bold'}}>Lista de compras de {fechaInicio} a {fechaFinal}</p>
            </div>
            <div className="container-responsive">
                <RaisedButton
                    label="editar"
                    primary={true}
                    onClick={onClick}
                />
            </div>
        </div>
    );
};

export default FiltroFechaOnlyRead;