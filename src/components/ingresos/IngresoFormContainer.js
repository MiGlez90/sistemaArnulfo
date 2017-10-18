/*
    Developed by Miguel Gonzalez
    Pagina /ingresos/addIngreso
 */
import React, {Component} from 'react';
//import IngresoForm from "./IngresoForm";
import {MenuItem, SelectField} from "material-ui";
import CommonFieldForm from './CommonFieldsForm';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as ingresoActions from '../../actions/ingresoActions';
import * as navBarNameActions from '../../actions/navBarNameActions';
import toastr from 'toastr';
import {Row, Col} from 'antd';
import moment from 'moment';

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
                description: '',
                referencia: '',
                monto: '',
                cantidad: '',
                tipo: '',
                date: '',
                subtipo: '',
                dateMS: ''
            },
            controlledDate: {},
            showCommonForm: false,
            showedFormGranos: false
        };
    }
    componentWillMount(){
        //cambiar nombre de barra
        this.props.navBarNameActions.changeName('Añadir ingreso');
    }

    // abrir el common field form
    openCommonForm = () => {
        this.setState({showCommonForm: true});
    };

    closeFormAlimentos = () => {
        this.setState({showCommonForm: false});
    };

    openFormGranos = () => {
        this.setState({showedFormGranos:true});
    };

    closeFormGranos = () => {
        this.setState({showedFormGranos:false});
    };

    // abrir el formulario correspondiente de acuerdo al tipo
    // por el momento solo hay un formulario
    handleChangeTipo = (event, index, value) => {
        let ingreso = Object.assign({}, this.state.ingreso);
        ingreso.tipo = value;
        this.setState({ingreso}, () => {
            switch (ingreso.tipo){
                case 'animales':
                    this.openCommonForm();
                    break;
                case 'granos':
                    this.openCommonForm();
                    break;
                case 'otros':
                    this.openCommonForm();
                    break;
                default:
            }
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
                    description: '',
                    monto: '',
                    cantidad: '',
                    tipo: '',
                    date: '',
                    referencia: '',
                    subtipo: '',
                    dateMS: ''
                };
                this.setState({ingreso:newIngreso});
            }).catch(e=>console.error(e));
    };


    render() {
        // obtener datos necesarios del state
        const { ingreso, controlledDate, showCommonForm} = this.state;
        // obtener datos necesarios de los props
        const {tipos, subtiposAnimales,subtiposGranos} = this.props;
        // formatear tipos, subtipos de animales y subtipos de granos para dropdown
        const menuItems = formatMenuItems(tipos);
        const menuItemsSubAnimales = formatMenuItems(subtiposAnimales);
        const menuItemsSubGranos = formatMenuItems(subtiposGranos);
        const otros = [{text: 'En construccion', value: 'enconstruccion'}];
        const menuItemsSubOtros = formatMenuItems(otros);
        // de acuerdo a la eleccion del usuario, se cargan los subtipos
        const menuItemsSub = ingreso.tipo === 'animales' ? menuItemsSubAnimales :
            ingreso.tipo === 'granos' ? menuItemsSubGranos : menuItemsSubOtros;
        return (
            <div style={{width:'100%'}}>
                <Row gutter={32}>
                    <Col xs={24} sm={24} md={8} lg={8} xl={8} >
                        {/*El usuario debe seleccionar un tipo, al dar click*/}
                        {/*Se abre el otro form*/}
                        <SelectField
                            name="tipo"
                            floatingLabelText="Tipo"
                            value={ingreso.tipo}
                            onChange={this.handleChangeTipo}
                            fullWidth={true}
                        >
                            {menuItems}
                        </SelectField>
                    </Col>
                    <Col xs={24} sm={24} md={8} lg={8} xl={8}/>
                    <Col xs={24} sm={24} md={8} lg={8} xl={8}/>
                </Row>
                {
                    showCommonForm &&
                    <CommonFieldForm
                        ingreso={ingreso}
                        subtipoMenuItems={menuItemsSub}
                        controlledDate={controlledDate}
                        onChange={this.updateIngresoState}
                        onChangeTipo={this.handleChangeTipo}
                        onChangeDate={this.handleChangeDate}
                        onChangeSubtipo={this.handleChangeSubtipo}
                        onSubmit={this.saveItem}
                    />
                }

            </div>
        );
    }
}

/*********************** Conectar con redux ************************************/
function mapStateToProps(state, ownProps) {
    return {
        ingresos: state.ingresos,
        tipos: state.tipos,
        subtiposAnimales: state.subtiposAnimales,
        subtiposGranos: state.subtiposGranos,
        navBarName: state.navBarName
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(ingresoActions, dispatch),
        navBarNameActions: bindActionCreators(navBarNameActions, dispatch)
    };
}


export default connect(mapStateToProps,mapDispatchToProps)(IngresoFormContainer);
