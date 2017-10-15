import React from 'react';
import {TextField, DatePicker} from "material-ui";
import {Row,Col} from 'antd';

const commonFieldsForm = (props) => {
    const {ingreso, onChange, onChangeDate, controlledDate} = props;
    return (
        <form style={{width:'100%'}}>
            <Row gutter={8}>
                <Col xs={24} sm={24} md={8} lg={8} xl={8} >
                    <TextField
                        name="cantidad"
                        floatingLabelText="Cantidad"
                        value={ingreso.cantidad}
                        onChange={onChange}
                        type="number"
                    />
                </Col>
                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                    <TextField
                        name="description"
                        floatingLabelText="Descripcion"
                        value={ingreso.description}
                        onChange={onChange}
                    />
                </Col>
                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                    <TextField
                        name="referencia"
                        floatingLabelText="Referencia"
                        value={ingreso.referencia}
                        onChange={onChange}
                    />
                </Col>
            </Row>
            <Row gutter={8}>
                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                    <TextField
                        name="subtipo"
                        floatingLabelText="Subtipo"
                        value={ingreso.subtipo}
                        onChange={onChange}
                    />
                </Col>
                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                    <DatePicker
                        floatingLabelText="Fecha"
                        value={controlledDate}
                        onChange={onChangeDate}
                    />
                </Col>
                <Col span={8}/>
                <Col span={8}/>
            </Row>


        </form>
    );
};



export default commonFieldsForm;