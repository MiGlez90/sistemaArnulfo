import React from 'react';
import {TextField, DatePicker} from "material-ui";

const commonFieldsForm = (props) => {
    const {ingreso, onChange, onChangeTipo, onChangeDate, controlledDate} = props;
    return (
        <form>
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
                floatingLabelText="Fecha"
                value={controlledDate}
                onChange={onChangeDate}
            />
        </form>
    );
};

export default commonFieldsForm;