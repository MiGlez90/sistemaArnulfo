import React from 'react';
import {TextField, DatePicker, SelectField, RaisedButton, FlatButton} from "material-ui";
import {Row,Col} from 'antd';
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
        <form style={{width:'100%'}}>
            <Row>
                <Col xs={24} sm={24} md={8} lg={8} xl={8} >
                    <SelectField
                        name="referencia"
                        floatingLabelText="Referencia"
                        value={dato.referencia}
                        onChange={handleChangeTipo}
                        fullWidth={true}
                    >
                        {gastosItems}
                    </SelectField>
                </Col>
                <Col xs={24} sm={24} md={8} lg={8} xl={8} />
                <Col xs={24} sm={24} md={8} lg={8} xl={8} />
            </Row>
            <Row gutter={32}>
                <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                    <TextField
                        disabled={true}
                        required
                        name="tipo"
                        floatingLabelText="Tipo"
                        value={dato.tipo}
                        onChange={onChange}
                        fullWidth={true}
                    />
                </Col>
                <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                    <TextField
                        disabled={true}
                        required
                        name="subtipo"
                        floatingLabelText="Subtipo"
                        value={dato.subtipo}
                        onChange={onChange}
                        fullWidth={true}
                    />
                </Col>
                <Col xs={24} sm={8} md={8} lg={8} xl={8} >
                    <TextField
                        disabled={true}
                        required
                        name="peso"
                        hintText="Kgs"
                        floatingLabelText="Peso"
                        value={dato.peso}
                        onChange={onChange}
                        type="number"
                        style={{marginLeft: '2%', width: '96%'}}
                    />
                </Col>
            </Row>
            <Row gutter={32}>
                <Col xs={24} sm={8} md={8} lg={8} xl={8} >
                    <TextField
                        required
                        disabled={true}
                        name="monto"
                        hintText="$ MXN"
                        floatingLabelText="Monto"
                        value={dato.monto}
                        onChange={onChange}
                        type="number"
                        fullWidth={true}
                    />
                </Col>
                <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                    <TextField
                        required
                        disabled={true}
                        name="description"
                        floatingLabelText="Descripcion"
                        value={dato.description}
                        onChange={onChange}
                        fullWidth={true}
                    />
                </Col>
                <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                    <TextField
                        required
                        disabled={true}
                        name="referencia"
                        floatingLabelText="Referencia"
                        value={dato.referencia}
                        onChange={onChange}
                        fullWidth={true}
                    />
                </Col>
            </Row>
        </form>
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

export default commonFieldsForm;