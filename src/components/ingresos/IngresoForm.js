/**
 * Created by BlisS on 22/03/17.
 */
import React from 'react';
import TextInput from '../common/TextInput';
import SelectInput from '../common/SelectInput';


const IngresoForm = ({ingreso, onChange, errors, allTipos}) => {
    if(ingreso !== undefined){
        console.log(ingreso.key);
    }else{
        ingreso = {};
    }
    return (
        <form>
            <TextInput
                name="cantidad"
                label="Cantidad"
                value={ingreso.cantidad}
                onChange={onChange}
                error={errors.cantidad}
            />
            <TextInput
                name="description"
                label="Descripcion"
                value={ingreso.description}
                onChange={onChange}
                error={errors.description}
            />
            <SelectInput
                name="tipo"
                label="Tipo"
                value={ingreso.tipo}
                defaultOption="Selecciona un tipo"
                options={allTipos}
                onChange={onChange}
                error={errors.tipo}
            />


        </form>
    );
};

//IngresoForm.propTypes = {};

export default IngresoForm;