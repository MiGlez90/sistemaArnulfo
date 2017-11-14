import React from 'react';
import {DatePicker,RaisedButton} from 'material-ui';
import {Row, Col} from 'antd';
import {} from "../../index";
import './GastoContainer.css'
import {DateTimeFormat} from "../../index";

const FiltroFecha = (props) => {
    const {filtro, onChangeInicio, onChangeFinal, onSubmit, onClick} = props;
    const hoy = new Date();
    return (
        <div>
            <Row>
                <Col span={24}>
                    <p>Seleccione la fecha de inicio y final paara filtrar</p>
                </Col>
            </Row>
            <Row gutter={32}>
                <div className={"container-responsive"}>
                    <DatePicker
                        required
                        floatingLabelText={"Fecha de Inicio"}
                        value={filtro.inicio}
                        onChange={onChangeInicio}
                        DateTimeFormat={DateTimeFormat}
                        okLabel={"OK"}
                        cancelLabel="Cancelar"
                        locale="es"
                        maxDate={today}
                        fullWidth={true}
                        autoOk={true}
                    />
                </div>
                <div className={"container-responsive"}>
                    <DatePicker
                        required
                        floatingLabelText="final"
                        value={filtro.final}
                        onChange={onChangeFinal}
                        DateTimeFormat={DateTimeFormat}
                        okLabel={"Ok"}
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