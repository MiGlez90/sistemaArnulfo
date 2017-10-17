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
        ingreso,
        onChange,
        onSubmit,
        onChangeDate,
        controlledDate,
        onChangeSubtipo,
        subtipoMenuItems
    } = props;
    const today = new Date();
    const subtipoLabel =
        ingreso.tipo === 'animales'?
            "Tipo de animal" :
            ingreso.tipo === 'granos' ?
                "Tipo de grano" :
                "Subtipo"
    ;
    return (
        <form onSubmit={onSubmit} style={{width:'100%'}}>
            <Row gutter={32}>
                <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                    <SelectField
                        required
                        name="subtipo"
                        floatingLabelText={subtipoLabel}
                        value={ingreso.subtipo}
                        onChange={onChangeSubtipo}
                        fullWidth={true}
                    >
                        {subtipoMenuItems}
                    </SelectField>
                </Col>
                <Col xs={24} sm={8} md={8} lg={8} xl={8} >
                    <TextField
                        required
                        name="cantidad"
                        hintText="Kgs"
                        floatingLabelText="Cantidad"
                        value={ingreso.cantidad}
                        onChange={onChange}
                        type="number"
                        style={{marginLeft: '2%', width: '96%'}}
                    />
                </Col>
                <Col xs={24} sm={8} md={8} lg={8} xl={8} >
                    <TextField
                        required
                        name="monto"
                        hintText="$ MXN"
                        floatingLabelText="Monto"
                        value={ingreso.monto}
                        onChange={onChange}
                        type="number"
                        style={{marginLeft: '2%', width: '96%'}}
                    />
                </Col>
            </Row>
            <Row gutter={32}>
                <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                    <TextField
                        required
                        name="description"
                        floatingLabelText="Descripcion"
                        value={ingreso.description}
                        onChange={onChange}
                        fullWidth={true}
                    />
                </Col>
                <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                    <TextField
                        required
                        name="referencia"
                        floatingLabelText="Referencia"
                        value={ingreso.referencia}
                        onChange={onChange}
                        fullWidth={true}
                    />
                </Col>
                <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                    <DatePicker
                        required
                        floatingLabelText="Fecha"
                        value={controlledDate}
                        onChange={onChangeDate}
                        fullWidth={true}
                        DateTimeFormat={DateTimeFormat}
                        okLabel="OK"
                        cancelLabel="Cancelar"
                        locale="es"
                        maxDate={today}
                    />
                </Col>
            </Row>
            <Row style={{marginTop:20}} gutter={32}>
                <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                    <RaisedButton
                        primary={true}
                        label="Guadar"
                        type="subscribe"
                        fullWidth={true}
                    />
                </Col>
                <Col xs={24} sm={8} md={8} lg={8} xl={8}/>
                <Col xs={24} sm={8} md={8} lg={8} xl={8}/>
            </Row>


        </form>
    );
};



export default commonFieldsForm;