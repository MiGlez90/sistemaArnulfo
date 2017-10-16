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

function formatMenuItems(tipos) {
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
                subtipo: ''
            },
            controlledDate: {},
            showedFormAlimentos: false,
            showedFormGranos: false
        };
    }
    componentWillMount(){
        this.props.navBarNameActions.changeName('Añadir ingreso');
    }

    openFormAlimentos = () => {
        this.setState({showedFormAlimentos: true});
    };

    closeFormAlimentos = () => {
        this.setState({showedFormAlimentos: false});
    };

    openFormGranos = () => {
        this.setState({showedFormGranos:true});
    };

    closeFormGranos = () => {
        this.setState({showedFormGranos:false});
    };

    handleChangeTipo = (event, index, value) => {
        let ingreso = Object.assign({}, this.state.ingreso);
        ingreso.tipo = value;
        this.setState({ingreso}, () => {
            switch (ingreso.tipo){
                case 'animales':
                    this.openFormAlimentos();
                    break;
                case 'granos':
                    this.openFormAlimentos();
                    break;
                case 'otros':
                    this.openFormAlimentos();
                    break;
                default:
            }
        });
    };

    handleChangeSubtipo = (event, index, value) => {
        let ingreso = Object.assign({}, this.state.ingreso);
        ingreso.subtipo = value;
        this.setState({ingreso});
    };



    handleChangeDate = (name, date) => {
        const ingreso = this.state.ingreso;
        ingreso.date = date.toString();
        this.setState({
            ingreso,
            controlledDate: date
        });
    };

    updateIngresoState = (e) => {
        const field = e.target.name;
        let ingreso = Object.assign({}, this.state.ingreso);
        ingreso[field] = e.target.value;
        this.setState({ingreso});
    };

    saveItem = () => {
        debugger;
        const ingresoCopy = Object.assign({},this.state.ingreso);
        this.props.actions.saveIngreso(ingresoCopy)
            .then( (r) => {
                toastr.success('Guardado');
                console.log(r);
                const newIngreso = {
                    description: '',
                    monto: '',
                    cantidad: '',
                    tipo: '',
                    date: '',
                    referencia: '',
                    subtipo: ''
                };
                this.setState({ingreso:newIngreso});
            }).catch(e=>console.error(e));
        this.closeForm();
    };


    render() {
        const { ingreso, controlledDate, showedFormAlimentos} = this.state;
        const {tipos, subtiposAnimales,subtiposGranos} = this.props;
        const menuItems = formatMenuItems(tipos);
        const menuItemsSubAnimales = formatMenuItems(subtiposAnimales);
        const menuItemsSubGranos = formatMenuItems(subtiposGranos);
        const otros = [{text: 'En construccion', value: 'enconstruccion'}];
        const menuItemsSubOtros = formatMenuItems(otros);
        const menuItemsSub =
            ingreso.tipo === 'animales'?
                menuItemsSubAnimales :
            ingreso.tipo === 'granos' ?
                menuItemsSubGranos :
                menuItemsSubOtros
        ;
        return (
            <div style={{width:'100%'}}>
                <Row gutter={32}>
                    <Col xs={24} sm={24} md={8} lg={8} xl={8} >
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
                    showedFormAlimentos &&
                    <CommonFieldForm
                        ingreso={ingreso}
                        subtipoMenuItems={menuItemsSub}
                        controlledDate={controlledDate}
                        onChange={this.updateIngresoState}
                        onChangeTipo={this.handleChangeTipo}
                        onChangeDate={this.handleChangeDate}
                        onChangeSubtipo={this.handleChangeSubtipo}
                    />
                }

            </div>
        );
    }
}


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
