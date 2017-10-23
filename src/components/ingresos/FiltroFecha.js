import React from 'react';
import {DatePicker, RaisedButton} from 'material-ui';
import {Row, Col} from 'antd';
//import moment from 'moment';
import {DateTimeFormat} from "../../index";


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
                        maxDate={today}
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
                        minDate={filtro.inicio}
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