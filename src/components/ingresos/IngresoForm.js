/**
 * Created by BlisS on 22/03/17.
 */
import React from 'react';
//import TextInput from '../common/TextInput';
import {MenuItem, SelectField, TextField, FlatButton} from "material-ui";



const IngresoForm = ({ingreso, ingresoClon, onChange, onChangeTipo, allTipos, textSubscribe}) => {
    console.log(ingresoClon);
    let menuItems = [];
    if( ingreso !== undefined){
        console.log(ingreso.key);
    }else{
        ingreso = {};
    }
    if ( typeof allTipos !== 'undefined') {
        menuItems = allTipos.map((tipo) => {
            const valor = tipo.value.toLowerCase();
            console.info(valor);
            return <MenuItem key={valor} primaryText={tipo.text} value={valor}/>
        })
    }

    return (
        <form >
            <TextField
                name="cantidad"
                floatingLabelText="Cantidad"
                value={ingreso.cantidad}
                onChange={onChange}
            />
            <TextField
                name="description"
                floatingLabelText="Descripcion"
                value={ingreso.description}
                onChange={onChange}
            />
            <SelectField
                name="tipo"
                floatingLabelText="Tipo"
                value={ingreso.tipo}
                onChange={onChangeTipo}>
                {menuItems}
            </SelectField>

            <FlatButton>
                {textSubscribe}
            </FlatButton>
        </form>
    );
};

//IngresoForm.propTypes = {};
IngresoForm.defaultProps = {
    textSubscribe: 'Actualizar'
};

const styles = {
    form:{
        display:'block'
    }
};

export default IngresoForm;