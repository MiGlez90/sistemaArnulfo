import React from 'react';
import {MenuItem, SelectField} from "material-ui";
import CommonFieldForm from './CommonFieldsForm';


const InventarioForm = (props) => {
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
        <div>
            <SelectField
                name="tipo"
                floatingLabelText="Tipo"
                value={ingreso.tipo}
                onChange={onChangeTipo}
            >
                {menuItems}
            </SelectField>
            {
                props.showedFormAlimentos &&
                <CommonFieldForm
                    ingreso={ingreso}
                    controlledDate={controlledDate}
                    onChange={onChange}
                    onChangeTipo={onChangeTipo}
                    onChangeDate={onChangeDate}
                />
            }

        </div>
    );
};

//IngresoForm.propTypes = {};
IngresoForm.defaultProps = {
    textSubscribe: 'Actualizar'
};

const styleComponent = {
  margin: '10px 15px'
};

export default InventarioForm;
