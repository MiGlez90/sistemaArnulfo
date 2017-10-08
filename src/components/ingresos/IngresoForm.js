/**
 * Created by BlisS on 22/03/17.
 */
import React from 'react';
//import TextInput from '../common/TextInput';
import {MenuItem, SelectField, TextField, DatePicker} from "material-ui";



const IngresoForm = (props) => {
    console.log(props.ingreso);
    let menuItems = [];
    if( props.ingreso !== undefined){
        console.log(props.ingreso.key);
    }else{
        props.ingreso = {};
    }
    if ( typeof props.allTipos !== 'undefined') {
        menuItems = props.allTipos.map((tipo) => {
            const valor = tipo.value.toLowerCase();
            console.info(valor);
            return <MenuItem key={valor} primaryText={tipo.text} value={valor}/>
        })
    }
    const {ingreso, onChange, onChangeTipo, onChangeDate, controlledDate} = props;
    console.log(ingreso);

    return (
        <form >
            <TextField
                name="cantidad"
                floatingLabelText="Cantidad"
                value={ingreso.cantidad}
                onChange={onChange}
                type="number"
            />
            <TextField
                name="description"
                floatingLabelText="Descripcion"
                value={ingreso.description}
                onChange={onChange}
            />
            <TextField
                name="referencia"
                floatingLabelText="Referencia"
                value={ingreso.referencia}
                onChange={onChange}
            />

            <TextField
                name="subtipo"
                floatingLabelText="Subtipo"
                value={ingreso.subtipo}
                onChange={onChange}
            />

            <DatePicker
                hintText="Fecha de captura"
                value={controlledDate}
                onChange={onChangeDate}
            />
            <SelectField
                name="tipo"
                floatingLabelText="Tipo"
                value={ingreso.tipo}
                onChange={onChangeTipo}>
                {menuItems}
            </SelectField>
        </form>
    );
};

//IngresoForm.propTypes = {};
IngresoForm.defaultProps = {
    textSubscribe: 'Actualizar'
};

export default IngresoForm;