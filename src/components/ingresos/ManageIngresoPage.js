/**
 * Created by BlisS on 22/03/17.
 */
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as ingresoActions from '../../actions/ingresoActions';
import IngresoForm from './IngresoForm';
import ListaDetalle from "./ListaDetalle";
import {FlatButton} from 'material-ui';
import toastr from 'toastr';


class ManageIngresoPage extends React.Component {

    state = {
        ingreso:  {},
        errors:{}
    };

    componentWillMount(){
        this.props.history.push(this.props.match.url);
    }

    componentWillReceiveProps(nP){
        const newIngreso = Object.assign({},this.props.ingreso);
        this.setState({ingreso:newIngreso});
    }

    handleChangeTipo = (event, index, value) => {
        let ingreso = Object.assign({}, this.state.ingreso);
        ingreso.tipo = value;
        this.setState({ingreso});
    };

    updateIngresoState = (e) => {
        const field = e.target.name;
        let ingreso = Object.assign({}, this.state.ingreso);
        ingreso[field] = e.target.value;
        this.setState({ingreso});
    };

    deleteItem = () => {
        const response = window.confirm('Seguro');
        if(response){
            const ingresoForRemoving = Object.assign({},this.state.ingreso);
            this.props.actions.deleteIngreso(ingresoForRemoving)
                .then( r => {
                    toastr.success('Se ha eliminado');
                    this.props.history.push('/ingresos');
                }).catch( e => {

            });
        }

    };


    render() {
        let ingresoToPrint = [];
        const ingreso = this.state.ingreso;
        for(let field in ingreso){
            let newIngreso = {};
            newIngreso.value = ingreso[field];
            newIngreso.label = field;
            ingresoToPrint.push(newIngreso);
        }

        return (
            <div>
                <ListaDetalle title="Detalle Ingreso" data={ingresoToPrint}/>

                {/*<IngresoForm*/}
                    {/*ingreso={this.state.ingreso}*/}
                    {/*allTipos={this.props.tipos}*/}
                    {/*onChange={this.updateIngresoState}*/}
                    {/*onChangeTipo={this.handleChangeTipo}*/}
                {/*/>*/}
                <FlatButton
                    label="Editar" primary={true}/>
                <FlatButton
                    label="Eliminar"
                    primary={true}
                    onClick={this.deleteItem}/>
            </div>
        );
    }
}

//ManageIngresoPage.propTypes = {
    // myProp: PropTypes.string.isRequired
//};

function mapStateToProps(state, ownProps) {
    // let ingreso = {
    //     key: ownProps.match.params.key,
    //     cantidad:'',
    //     captura:'',
    //     description:'',
    //     fecha:'',
    //     subtipo:'',
    //     tipo:''
    //
    // };

    console.log(state.ingresos);

    const ingresoIsolated = state.ingresos.filter( (ingreso) => {
        return ingreso.key === ownProps.match.params.key;
    });

    const ingreso = ingresoIsolated[0];
    const tiposFormattedForDropdown = state.tipos.map(tipo=>{
        return {
            value:tipo.value,
            text:tipo.text
        }
    });

    return {
        ingreso: ingreso,
        tipos: tiposFormattedForDropdown
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(ingresoActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageIngresoPage);