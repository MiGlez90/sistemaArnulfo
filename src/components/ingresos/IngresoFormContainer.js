/*
    Developed by Miguel Gonzalez
    Pagina /ingresos/addIngreso
 */
import React, {Component} from 'react';
//import IngresoForm from "./IngresoForm";
import {MenuItem, DatePicker, RaisedButton} from "material-ui";
import CommonFieldForm from './CommonFieldsForm';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as ingresoActions from '../../actions/ingresoActions';
import * as gastosActions from '../../actions/gastoActions';
import * as navBarNameActions from '../../actions/navBarNameActions';
import toastr from 'toastr';
import {Row, Col} from 'antd';
import moment from 'moment';
import {DateTimeFormat} from "../../index";

//Función para que un array pueda ser mostrado en un drop down
export function formatMenuItems(tipos) {
    let formattedItems = [];
    if ( typeof tipos !== 'undefined') {
        formattedItems = tipos.map((tipo) => {
            return <MenuItem key={tipo.value} primaryText={tipo.text} value={tipo.value}/>
        });
        return formattedItems;
    }
}

class IngresoFormContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ingreso: {
                total: '',
                date: '',
                items: []
            },
            cantidadItems: 0,
            controlledDate: {}
        };
    }
    componentWillMount(){
        //cambiar nombre de barra
        this.props.navBarNameActions.changeName('Añadir ingreso');
    }


    // abrir el formulario correspondiente de acuerdo al tipo
    // por el momento solo hay un formulario
    handleChangeReferencia = (event, index, value, gastoIndex) => {
        debugger;
        let gasto = Object.assign({}, this.state[gastoIndex]);
        let {ingreso} = this.state;
        let gastoSeleccionado = this.props.gastos.filter((gasto) => gasto.key === value );
        gasto = gastoSeleccionado[0];
        gasto.referencia = value;
        ingreso.items.push(gasto);
        this.setState({[gastoIndex]:gasto}, () => {
        });
    };
    // controlar el subtipo
    handleChangeSubtipo = (event, index, value) => {
        let ingreso = Object.assign({}, this.state.ingreso);
        ingreso.subtipo = value;
        this.setState({ingreso});
    };

    // controlar la fecha
    handleChangeDate = (name, date) => {
        const ingreso = this.state.ingreso;
        // formatear y guardar en el state
        ingreso.date = moment(date.toISOString(), moment.ISO_8601).format('DD MMMM YYYY');
        ingreso.dateMS = moment(date.toISOString(), moment.ISO_8601).format('x');
        this.setState({
            ingreso,
            controlledDate: date
        }, () => {
        });
    };
    // controlar los text field
    updateIngresoState = (e) => {
        const field = e.target.name;
        let ingreso = Object.assign({}, this.state.ingreso);
        ingreso[field] = e.target.value;
        this.setState({ingreso});
    };
    // guardar el nuevo ingreso
    saveItem = (e) => {
        e.preventDefault();
        // clonar el state para no generar problemas
        const ingresoCopy = Object.assign({},this.state.ingreso);
        this.props.actions.saveIngreso(ingresoCopy)
            .then( (r) => {
                toastr.success('Guardado');
                console.log(r);
                // resetear el ingreso
                const newIngreso = {
                    date: '',
                    total: '',
                    items : []
                };
                this.setState({ingreso:newIngreso});
            }).catch(e=>console.error(e));
    };

    addItem = () => {
        let {cantidadItems} = this.state;
        cantidadItems++;
        this.setState({cantidadItems});
    };

    removeItem = () => {
        let {cantidadItems} = this.state;
        cantidadItems--;
        this.setState({cantidadItems})
    };

    render() {
        // obtener datos necesarios del state
        const { ingreso, gasto, controlledDate, cantidadItems} = this.state;
        // obtener datos necesarios de los props
        const {tipos, subtiposAnimales,subtiposGranos, gastos, gastosForDropDown} = this.props;
        // formatear tipos, subtipos de animales y subtipos de granos para dropdown
        // const menuItems = formatMenuItems(tipos);
        const menuItemsSubAnimales = formatMenuItems(subtiposAnimales);
        const menuItemsSubGranos = formatMenuItems(subtiposGranos);
        const gastosItems = formatMenuItems(gastosForDropDown);
        const otros = [{text: 'En construccion', value: 'enconstruccion'}];
        const menuItemsSubOtros = formatMenuItems(otros);
        // de acuerdo a la eleccion del usuario, se cargan los subtipos
        const menuItemsSub = ingreso.tipo === 'animales' ? menuItemsSubAnimales :
            ingreso.tipo === 'granos' ? menuItemsSubGranos : menuItemsSubOtros;
        const today = new Date();
        const itemsParaIngreso = [];
        for( let i = 0 ; i < cantidadItems; i++ ){
            const newGasto = 'gasto' + i;
            itemsParaIngreso.push(
                <div>
                    <CommonFieldForm
                        gastoIndex={newGasto}
                        dato={this.state[newGasto]}
                        gastosItems={gastosItems}
                        subtipoMenuItems={menuItemsSub}
                        controlledDate={controlledDate}
                        onChange={this.updateIngresoState}
                        onChangeTipo={this.handleChangeReferencia}
                        onChangeDate={this.handleChangeDate}
                        onChangeSubtipo={this.handleChangeSubtipo}
                    />
                </div>
            );
        }
        return (
            <div style={{width:'100%'}}>
                <div style={firstStepStyle}>
                    <DatePicker
                        required
                        floatingLabelText="Fecha"
                        value={this.state.controlledDate}
                        onChange={this.handleChangeDate}
                        DateTimeFormat={DateTimeFormat}
                        okLabel="OK"
                        cancelLabel="Cancelar"
                        locale="es"
                        maxDate={today}
                        fullWidth={true}
                    />
                </div>
                <div style={firstStepStyle}>
                    <RaisedButton
                        //primary={true}
                        label="Agregar item"
                        onClick={this.addItem}
                        fullWidth={true}
                    />
                </div>
                <div style={firstStepStyle}>
                    <RaisedButton
                        //primary={true}
                        label="Eliminar item"
                        onClick={this.removeItem}
                        fullWidth={true}
                    />
                </div>
                <br/>
                {itemsParaIngreso}
                { cantidadItems > 0 &&
                    <Row style={{marginTop: 20}} gutter={32}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <RaisedButton
                                primary={true}
                                onClick={this.saveItem}
                                label="Guadar"
                                fullWidth={true}
                            />
                        </Col>
                    </Row>
                }
            </div>
        );
    }
}

const firstStepStyle = {
    display: 'inline-block',
    width: '33.33% ',
    margin: '10px 0px 25px 0px',
    padding: 10
};

/*********************** Conectar con redux ************************************/
function mapStateToProps(state, ownProps) {
    const gastosForDropDown = state.gastos.map((gasto)=> {
        return {
            value: gasto.key,
            text: gasto.key
        }
    });
    return {
        ingresos: state.ingresos,
        tipos: state.tipos,
        gastos: state.gastos,
        gastosForDropDown: gastosForDropDown,
        subtiposAnimales: state.subtiposAnimales,
        subtiposGranos: state.subtiposGranos,
        navBarName: state.navBarName
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(ingresoActions, dispatch),
        gastosActions: bindActionCreators(gastosActions,dispatch),
        navBarNameActions: bindActionCreators(navBarNameActions, dispatch)
    };
}


export default connect(mapStateToProps,mapDispatchToProps)(IngresoFormContainer);
