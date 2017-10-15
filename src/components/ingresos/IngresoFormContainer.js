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


class IngresoFormContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ingreso: {
                description: '',
                referencia: '',
                cantidad: '',
                tipo: '',
                captureDate: '',
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
                    break;
                case 'otros':
                    break;
                default:
            }
        });
    };

    handleChangeCaptureDate = (name, date) => {
        const ingreso = this.state.ingreso;
        ingreso.captureDate = date.toString();
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
                    cantidad: '',
                    tipo: '',
                    captureDate: '',
                    referencia: '',
                    subtipo: ''
                };
                this.setState({ingreso:newIngreso});
            }).catch(e=>console.error(e));
        this.closeForm();
    };


    render() {
        const { ingreso, controlledDate, showedFormAlimentos} = this.state;
        const {tipos} = this.props;
        let menuItems = [];

        if ( typeof tipos !== 'undefined') {
            menuItems = tipos.map((tipo) => {
                const valor = tipo.value.toLowerCase();
                console.info(valor);
                return <MenuItem key={valor} primaryText={tipo.text} value={valor}/>
            })
        }
        return (
            <div style={{width:'100%'}}>
                <Row>
                    <Col xs={24} sm={24} md={8} lg={8} xl={8} >
                        <SelectField
                            name="tipo"
                            floatingLabelText="Tipo"
                            value={ingreso.tipo}
                            onChange={this.handleChangeTipo}
                        >
                            {menuItems}
                        </SelectField>
                    </Col>
                    <Col span={8}/>
                    <Col span={8}/>
                </Row>
                {
                    showedFormAlimentos &&
                    <CommonFieldForm
                        ingreso={ingreso}
                        controlledDate={controlledDate}
                        onChange={this.updateIngresoState}
                        onChangeTipo={this.handleChangeTipo}
                        onChangeDate={this.handleChangeCaptureDate}
                    />
                }

            </div>
        );
    }
}


function mapStateToProps(state, ownProps) {
    const tiposFormattedForDropdown = state.tipos.map(tipo=>{
        return {
            value:tipo.value,
            text:tipo.text
        }
    });
    return {
        ingresos: state.ingresos,
        tipos: tiposFormattedForDropdown,
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
