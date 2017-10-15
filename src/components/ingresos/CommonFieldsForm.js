import React from 'react';
import {TextField, DatePicker, SelectField} from "material-ui";
import {Row,Col} from 'antd';

const commonFieldsForm = (props) => {
    const {
        ingreso,
        onChange,
        onChangeDate,
        controlledDate,
        onChangeSubtipo,
        subtipoMenuItems
    } = props;
    return (
        <form style={{width:'100%'}}>
            <Row gutter={32}>
                <Col xs={24} sm={8} md={8} lg={8} xl={8} >
                    <TextField
                        name="monto"
                        hintText="$ MXN"
                        floatingLabelText="Monto"
                        value={ingreso.monto}
                        onChange={onChange}
                        type="number"
                        style={{marginLeft: '2%', width: '96%'}}
                    />
                </Col>
                <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                    <TextField
                        name="description"
                        floatingLabelText="Descripcion"
                        value={ingreso.description}
                        onChange={onChange}
                        fullWidth={true}
                    />
                </Col>
                <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                    <TextField
                        name="referencia"
                        floatingLabelText="Referencia"
                        value={ingreso.referencia}
                        onChange={onChange}
                        fullWidth={true}
                    />
                </Col>
            </Row>
            <Row gutter={32}>
                <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                    <SelectField
                        name="subtipo"
                        floatingLabelText="Tipo de animal"
                        value={ingreso.subtipo}
                        onChange={onChangeSubtipo}
                        fullWidth={true}
                    >
                        {subtipoMenuItems}
                    </SelectField>
                </Col>
                <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                    <DatePicker
                        floatingLabelText="Fecha"
                        value={controlledDate}
                        onChange={onChangeDate}
                        fullWidth={true}
                    />
                </Col>
                <Col span={8}/>
            </Row>


        </form>
    );
};



export default commonFieldsForm;