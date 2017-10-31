import React from 'react';
import areIntlLocalesSupported from 'intl-locales-supported';
import {DatePicker, RaisedButton} from 'material-ui';
import {Row, Col} from 'antd';

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

const FiltroFecha = (props) => {
    const {filtro, onChangeInicio, onChangeFinal, onSubmit} = props;
    const today = new Date();
    return (
        <form onSubmit={onSubmit}>
            <Row>
                <Col span={24}>
                    <p>Seleccionar fecha de inicio y final para filtrar</p>
                </Col>
            </Row>
            <Row gutter={32}>
                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                    <DatePicker
                        required
                        floatingLabelText="Inicio"
                        value={filtro.inicio}
                        onChange={onChangeInicio}
                        DateTimeFormat={DateTimeFormat}
                        okLabel="OK"
                        cancelLabel="Cancelar"
                        locale="es"
                        fullWidth={true}
                    />
                </Col>
                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                    <DatePicker
                        required
                        floatingLabelText="Final"
                        value={filtro.final}
                        onChange={onChangeFinal}
                        DateTimeFormat={DateTimeFormat}
                        okLabel="OK"
                        cancelLabel="Cancelar"
                        locale="es"
                        maxDate={today}
                        fullWidth={true}
                    />
                </Col>
                <Col xs={24} sm={24} md={8} lg={8} xl={8} >
                    <RaisedButton
                        label="Aceptar"
                        type="submit"
                        fullWidth={true}
                        primary={true}
                    />
                </Col>
            </Row>
        </form>
    );
};

export default FiltroFecha;
