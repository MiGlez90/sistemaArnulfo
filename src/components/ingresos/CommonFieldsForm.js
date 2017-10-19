import React from 'react';
import {TextField, SelectField, Card, CardHeader, CardActions, CardText} from "material-ui";
import areIntlLocalesSupported from 'intl-locales-supported';
//import moment from "moment";

let DateTimeFormat;

/**
 * Use the native Intl.DateTimeFormat if available, or a polyfill if not.
 */
if (areIntlLocalesSupported(['es', 'es-MX'])) {
    DateTimeFormat = global.Intl.DateTimeFormat;
    console.info(DateTimeFormat.toString());
} else {
    const IntlPolyfill = require('intl');
    DateTimeFormat = IntlPolyfill.DateTimeFormat;
    require('intl/locale-data/jsonp/es');
    require('intl/locale-data/jsonp/es-MX');
}

const commonFieldsForm = (props) => {
    const {
        dato,
        onChange,
        onChangeTipo,
        gastosItems,
        gastoIndex,
        onChangeSubtipo,
        subtipoMenuItems
    } = props;
    const handleChangeTipo = (event, index, value) => {
        onChangeTipo(event,index,value,gastoIndex);
    };
    const subtipoLabel =
        dato.tipo === 'animales'?
            "Tipo de animal" :
            dato.tipo === 'granos' ?
                "Tipo de grano" :
                "Subtipo"
    ;
    return (
        <div style={{width:'100%'}}>
            <Card>
                <CardHeader
                    title={gastoIndex}
                    subtitle="Introduzca la referencia de su inventario"
                    actAsExpander={true}
                    showExpandableButton={true}
                />
                <CardActions>
                    <SelectField
                        name="referencia"
                        floatingLabelText="Referencia"
                        value={dato.referencia}
                        onChange={handleChangeTipo}
                        style={textFieldStyle}
                    >
                        {gastosItems}
                    </SelectField>
                </CardActions>
                <CardText expandable={true}>
                    <div>
                        <TextField
                            disabled={true}
                            required
                            name="tipo"
                            floatingLabelText="Tipo"
                            value={dato.tipo}
                            onChange={onChange}
                            style={textFieldStyle}
                        />
                        <TextField
                            disabled={true}
                            required
                            name="subtipo"
                            floatingLabelText="Subtipo"
                            value={dato.subtipo}
                            onChange={onChange}
                            style={textFieldStyle}
                        />
                        <TextField
                            disabled={true}
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
                            disabled={true}
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
                            disabled={true}
                            name="description"
                            floatingLabelText="Descripcion"
                            value={dato.description}
                            onChange={onChange}
                            style={textFieldStyle}
                        />
                        <TextField
                            required
                            disabled={true}
                            name="referencia"
                            floatingLabelText="Referencia"
                            value={dato.referencia}
                            onChange={onChange}
                            style={textFieldStyle}
                        />
                    </div>
                </CardText>
            </Card>




        </div>
    );
};

commonFieldsForm.defaultProps = {
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

export default commonFieldsForm;