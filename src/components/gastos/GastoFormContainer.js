import React,{Component} from 'react';
import {formatMenuItems} from '../ingresos/IngresoFormContainer';
import {MenuItem, DatePicker, RaisedButton} from "material-ui";
import CommonFieldForm from './CommonFieldsForm';
import * as ingresoActions from '../../actions/ingresoActions';
import * as gastosActions from '../../actions/gastoActions';
import * as navBarNameActions from '../../actions/navBarNameActions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import toastr from 'toastr';
import {Row, Col} from 'antd';
import moment from 'moment';
import {DateTimeFormat} from "../../index";


class GastoFormContainer extends Component{
    constructor(props){
        super(props);
        this.state ={
            gasto: {

                total: 0.0,
                date: '',
                items: []
            },

            itemsList: [],
            gastosList: [],
            cantidadItems: 0,
            controlledDate: {}

               /* tipo: '',
                subtipo: '',
                peso: '',
                monto:'',
                descripcion:'',
                fecha:'',
                valorFinal:'',
                inversion:''*/
        };
    }

    componentWillMount(){
        this.props.navBarNameActions.changeName('Añadir Gasto');
        this.props.gastosActions.resetGastos();

    }

    getItemFromList = (itemKey) => {
        let gastoSeleccionado = this.props.gastos.filter((gasto) => gasto.key === itemKey );
        return gastoSeleccionado[0];

    };

    handleChangeReferencia = (event, index, value, gastoIndex) => {
        //bajar ingresos y gastosList del state
        let {ingreso, gastosList} = this.state;
        const gasto = this.getItemFromList(value);
        this.props.gastosActions.toogleLock(gasto).then( () => {
            const gasto = this.getItemFromList(value);
            gasto.referencia = value;
            ingreso.total += gasto.monto;
            gastosList.push(gasto);
            this.setState({[gastoIndex]:gasto, gastosList, ingreso});
        });
    };

    handleChangeDate = (name, date) => {
        const gasto = this.state.gasto;
        // formatear y guardar en el state
        gasto.date = moment(date.toISOString(), moment.ISO_8601).format('DD MMMM YYYY');
        gasto.dateMS = moment(date.toISOString(), moment.ISO_8601).format('x');
        this.setState({
            gasto,
            controlledDate: date
        }, () => {
        });
    };

    updateIngresoState = (e) => {
        const field = e.target.name;
        let gasto = Object.assign({}, this.state.gasto);
        gasto[field] = e.target.value;
        this.setState({gasto});
    };
// guardar el nuevo gasto
    saveItem = (e) => {
        e.preventDefault();
        // clonar el state para no generar problemas
        const gastoCopy = Object.assign({},this.state.ingreso);
        gastoCopy.items = this.state.gastosList;
        for(let gasto of gastoCopy.items){
            gasto.sold = false;
            this.props.gastosActions.saveGasto(gasto)
                .then((r) => {
                    toastr.success('Guardado');
                    console.log(r);});
        }
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
                        dato:{}
                    };
                    itemsList.push(newItem);
                    this.setState({itemsList});
                });
            });
        }

    };

    removeItem = (itemName, itemGasto) => {
        let {cantidadItems, itemsList, gastosList, gasto} = this.state;
        cantidadItems--;
        if(itemGasto.key){
            this.props.gastosActions.toogleLock(itemGasto).then( () => {
                itemsList = itemsList.filter((item) => {
                    return item.gastoIndex !== itemName;
                });
                gastosList = gastosList.filter( item => {
                    return item.key !== itemGasto.key;
                });
                gasto.total -= itemGasto.monto;
                this.setState({cantidadItems, itemsList, gastosList, gasto});
            });
        }else{
            itemsList = itemsList.filter((item) => {
                return item.gastoIndex !== itemName
            });
            this.setState({cantidadItems, itemsList});
        }
    };

    render() {
        // obtener datos necesarios del state
        const { gastosList, cantidadItems} = this.state;
        // obtener datos necesarios de los props
        // formatear tipos, subtipos de animales y subtipos de granos para dropdown
        // const menuItems = formatMenuItems(tipos);
        // de acuerdo a la eleccion del usuario, se cargan los subtipos
        console.log( this.state);
        const {gastosForDropDown} = this.props;
        let itemsListForShowing = [];
        const gastosItems = formatMenuItems(gastosForDropDown);
        for(let i = 0; i < cantidadItems; i++){
            const gastoName = 'gasto' + i;
            itemsListForShowing.push(  <CommonFieldForm
                    dato={gastosList[i]}
                    onChange={this.updateIngresoState}
                    onChangeTipo={this.handleChangeReferencia}
                    gastosItems={gastosItems}
                    gastoIndex={gastoName}
                    removeItem={this.removeItem}
                />
            );
        }
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
                    Total $ {this.state.gasto.total}
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
        gastos: state.gastos,
        tipos: state.tipos,
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


export default connect(mapStateToProps,mapDispatchToProps)(GastoFormContainer);
