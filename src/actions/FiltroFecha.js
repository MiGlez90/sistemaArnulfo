import React from 'react';
import {DatePicker, RaisedButton} from 'material-ui';
import {Row, Col} from 'antd';
//import moment from 'moment';
import {DateTimeFormat} from "../../index";
import './IngresoContainer.css'

const FiltroFecha = (props) => {
    const {filtro, onChangeInicio, onChangeFinal, onSubmit, onClick} = props;
    const today = new Date();
    return (
        <div >
            <Row>
                <Col span={24}>
                    <p>Seleccionar fecha de inicio y final para filtrar</p>
                </Col>
            </Row>
            <Row gutter={32}>
                <div className="container-responsive">
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
                        autoOk={true}
                    />
                </div>
                <div className="container-responsive">
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
                        autoOk={true}
                    />
                </div>
            </Row>
        </div>
    );
};

export default FiltroFecha;