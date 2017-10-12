import React, {Component} from 'react';
import IngresoForm from "./IngresoForm";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as ingresoActions from '../../actions/ingresoActions';
import * as navBarNameActions from '../../actions/navBarNameActions';
import toastr from 'toastr';


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
        return (
            <div>
                <IngresoForm
                    ingreso={this.state.ingreso}
                    controlledDate={this.state.controlledDate}
                    allTipos={this.props.tipos}
                    onChange={this.updateIngresoState}
                    onChangeTipo={this.handleChangeTipo}
                    onChangeDate={this.handleChangeCaptureDate}
                    showedFormAlimentos={this.state.showedFormAlimentos}
                    showedFormGranos={this.state.showedFormGranos}


                />
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
