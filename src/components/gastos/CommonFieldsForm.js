import React from 'react';
import {TextField, SelectField, Card, CardHeader, CardActions, CardText, RaisedButton, MenuItem} from "material-ui";
//import moment from "moment";


const CommonFieldsForm = (props) => {
    const {
        dato,
        onChange,
        onChangeTipo,
        gastosItems,
        gastoIndex,
        removeItem
    } = props;
    
    const handleChangeTipo = (event, index, value) => {
        onChangeTipo(event,index,value,gastoIndex);
    };
    const removeThisItem = () => {
        removeItem(gastoIndex, dato)
    };
    return (
        <div style={{width:'100%'}}>
            <Card>
                <CardHeader
                    title={gastoIndex}
                    subtitle="Introduzca la referencia de su inventario"
                    actAsExpander={true}
                    showExpandableButton={true}
                />
                <CardActions >
                    { !dato.lock ?
                        <SelectField
                            name="referencia"
                            floatingLabelText="Referencia"
                            value={dato.referencia}
                            onChange={handleChangeTipo}
                            style={textFieldStyle}
                        >
                            {gastosItems}
                        </SelectField>
                        :
                        <TextField
                            required
                            disabled={false}
                            name="referencia"
                            floatingLabelText="Referencia"
                            value={dato.referencia}
                            onChange={onChange}
                            style={textFieldStyle}
                        />
                    }
                    <RaisedButton
                        style={{right:10,position:'absolute',bottom:25}}
                        label="Eliminar"
                        onClick={removeThisItem}
                    />
                </CardActions>
                <CardText expandable={true}>
                    <div>
                        <SelectField
                            disabled={false}
                            required
                            name="tipo"
                            floatingLabelText="Tipo"
                            value={dato.tipo}
                            onChange={onChange}
                            style={textFieldStyle}
                        >
                            <MenuItem value={1} primaryText="Porcino"/>
                        </SelectField>
                        <SelectField
                            disabled={false}
                            required
                            name="subtipo"
                            floatingLabelText="Subtipo"
                            value={dato.subtipo}
                            onChange={onChange}
                            style={textFieldStyle}
                        >
                            <MenuItem value={1} primaryText="Porcino"/>
                        </SelectField>
                        <TextField
                            disabled={false}
                            required
                            name="peso"
                            hintText="Kgs"
                            floatingLabelText="Peso"
                            value={dato.peso}
                            onChange={onChange}
                            type="number"
                            style={textFieldStyle}
                        />
                        <TextField
                            required
                            disabled={false}
                            name="monto"
                            hintText="$ MXN"
                            floatingLabelText="Monto"
                            value={dato.monto}
                            onChange={onChange}
                            type="number"
                            style={textFieldStyle}
                        />
                        <TextField
                            required
                            disabled={false}
                            name="description"
                            floatingLabelText="Descripcion"
                            value={dato.description}
                            onChange={onChange}
                            style={textFieldStyle}
                        />
                    </div>
                </CardText>
            </Card>

        </div>
    );
};

CommonFieldsForm.defaultProps = {
    dato: {
        description: '',
        referencia: '',
        monto: '',
        peso: '',
        tipo: '',
        subtipo: '',
    },
};

const textFieldStyle = {
    margin: 10,
    width: '45%'
};

export default CommonFieldsForm;