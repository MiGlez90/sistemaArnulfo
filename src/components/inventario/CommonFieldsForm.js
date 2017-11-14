import React from 'react';
import {TextField, DatePicker, SelectField, RaisedButton, FlatButton} from "material-ui";
import {Row,Col} from 'antd';
import areIntlLocalesSupported from 'intl-locales-supported';


let DateTimeFormat;

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
        inventario,
        onChange,
        onSubmit,
        onChangeDate,
        controlledDate,
        onChangeSubtipo,
        subtipoMenuItems
    } = props;
    const today = new Date();
    const subtipoLabel =
        inventario.tipo === 'animales'?
            "Tipo de animal" :
            inventario.tipo === 'granos' ?
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
                        value={inventario.subtipo}
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
                        value={inventario.cantidad}
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
                        value={inventario.monto}
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
                        floatingLabelText="Descripción"
                        value={inventario.description}
                        onChange={onChange}
                        fullWidth={true}
                    />
                </Col>
                <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                    <TextField
                        required
                        name="referencia"
                        floatingLabelText="Referencia"
                        value={inventario.referencia}
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
                        label="Guardar"
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
