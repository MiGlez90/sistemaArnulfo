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
                total: 0.0,
                date: '',
                items: []
            },
            itemsList: [],
            cantidadItems: 0,
            controlledDate: {}
        };
    }
    componentWillMount(){
        //cambiar nombre de barra
        this.props.navBarNameActions.changeName('Añadir ingreso');
        this.props.gastosActions.resetGastos();
    }


    // abrir el formulario correspondiente de acuerdo al tipo
    // por el momento solo hay un formulario
    handleChangeReferencia = (event, index, value, gastoIndex) => {
        let {ingreso} = this.state;
        let gastoSeleccionado = this.props.gastos.filter((gasto) => gasto.key === value );
        let gasto = gastoSeleccionado[0];
        this.props.gastosActions.toogleLock(gasto).then( () => {
            gastoSeleccionado = this.props.gastos.filter((gasto) => gasto.key === value );
            let gasto = gastoSeleccionado[0];
            gasto.referencia = value;
            ingreso.total += gasto.monto;
            ingreso.items.push(gasto);
            this.setState({[gastoIndex]:gasto, ingreso});
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
        for(let gasto of ingresoCopy.items){
            gasto.sold = true;
            this.props.gastosActions.saveGasto(gasto);
        }
        this.props.actions.saveIngreso(ingresoCopy)
            .then( (r) => {
                toastr.success('Guardado');
                console.log(r);
                // resetear el ingreso
                const newIngreso = {
                    date: '',
                    total: 0.0,
                    items : []
                };
                this.setState({ingreso:newIngreso});
            }).catch(e=>console.error(e));
    };

    addItem = () => {
        let {cantidadItems, itemsList} = this.state;
        const {gastos} = this.props;
        const length = gastos.length;
        // alert(length);
        // alert(cantidadItems);
        cantidadItems++;
        if (length > 0 && cantidadItems <= length ){
            this.setState({cantidadItems}, () => {
                const newGasto = 'gasto' + cantidadItems;
                this.setState({[newGasto]:{}}, () => {
                    const newItem = {
                        gastoIndex:newGasto
                    };
                    itemsList.push(newItem);
                    this.setState({itemsList});
                });
            });
        }

    };

    removeItem = (itemName, itemGasto) => {
        let {cantidadItems, itemsList} = this.state;
        cantidadItems--;
        if(itemGasto.key){
            this.props.gastosActions.toogleLock(itemGasto).then( () => {
                itemsList = itemsList.filter((item) => {
                    return item.gastoIndex !== itemName
                });
                this.setState({cantidadItems, itemsList});
            });
        }else{
            itemsList = itemsList.filter((item) => {
                return item.gastoIndex !== itemName
            });
            this.setState({cantidadItems, itemsList});
        }

        debugger;
    };

    render() {
        // obtener datos necesarios del state
        const { itemsList, cantidadItems} = this.state;
        // obtener datos necesarios de los props
        // formatear tipos, subtipos de animales y subtipos de granos para dropdown
        // const menuItems = formatMenuItems(tipos);
        // de acuerdo a la eleccion del usuario, se cargan los subtipos
        console.log( this.state);
        const {gastosForDropDown} = this.props;
        const gastosItems = formatMenuItems(gastosForDropDown);
        let i = 0;
        const itemsListForShowing = itemsList.map( (item) => {
            i++;
            const gastoName = 'gasto' + i;
            return  <CommonFieldForm
                    dato={this.state[item.gastoIndex]}
                    onChange={this.updateIngresoState}
                    onChangeTipo={this.handleChangeReferencia}
                    gastosItems={gastosItems}
                    gastoIndex={gastoName}
                    removeItem={this.removeItem}
                />
        });
        const today = new Date();
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
                <div style={firstStepStyle}/>
                <br/>
                {itemsListForShowing}
                <p style={{padding:30,fontSize:'1.3em'}}>
                    Total $ {this.state.ingreso.total}
                </p>
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
    let gastos = state.gastos.filter( (gasto) => {
        return gasto.sold === false;
    });
    let gastosForDropDown = gastos.filter( (gasto) => {
        return gasto.lock === false;
    });
    gastosForDropDown = gastosForDropDown.map((gasto)=> {
        return {
            value: gasto.key,
            text: gasto.key
        }
    });
    return {
        ingresos: state.ingresos,
        tipos: state.tipos,
        gastos: gastos,
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
