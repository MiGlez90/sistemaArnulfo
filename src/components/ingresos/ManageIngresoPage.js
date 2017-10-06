/**
 * Created by BlisS on 22/03/17.
 */
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as ingresoActions from '../../actions/ingresoActions';
import IngresoForm from './IngresoForm';
import ListaDetalle from "./ListaDetalle";
import {Dialog, FlatButton, TextField} from 'material-ui';
import toastr from 'toastr';
import FormularioEditar from "./FormularioEditar";


class ManageIngresoPage extends React.Component {

    state = {
        edit: false,
        ingreso:  {},
        ingresoMutable:  {},
        errors:{}
        // openForm: false
    };

    componentWillMount(){
        this.props.history.push(this.props.match.url);
    }

    componentWillReceiveProps(nP){
        const newIngreso = Object.assign({},this.props.ingreso);
        this.setState({ingreso:newIngreso, ingresoMutable:newIngreso});
    }

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

    editIngreso = () => {
        const ingresoCopy = Object.assign({},this.state.ingresoMutable);
        this.props.actions.saveIngreso(ingresoCopy)
            .then( (r) => {
                toastr.success('Guardado');
                console.log(r);
            }).catch(e=>console.error(e));
        this.closeForm();
    };

    closeForm = () => {
        // this.setState({openForm:false});
        this.setState({edit:false});
    };

    actions = [
        <FlatButton
            label="Editar"
            primary={true}
            keyboardFocused={true}
            onClick={this.editIngreso}
        />
    ];


    handleChangeTipo = (event, index, value) => {
        let ingresoMutable = Object.assign({}, this.state.ingresoMutable);
        ingresoMutable.tipo = value;
        this.setState({ingresoMutable});
    };

    updateIngresoState = (e) => {
        const field = e.target.name;
        let ingresoMutable = Object.assign({}, this.state.ingresoMutable);
        ingresoMutable[field] = e.target.value;
        this.setState({ingresoMutable});
    };

    openForm = () => {
        // this.setState({openForm:true});
        this.setState({edit:true});
    };

    render() {
        const {edit} = this.state;
        let ingresoToPrint = [];

        const ingreso = this.props.ingreso;
        for (let field in ingreso) {
            let newIngreso = {};
            newIngreso.value = ingreso[field];
            newIngreso.label = field;
            ingresoToPrint.push(newIngreso);
        }






        return (
            <div style={{width:'50vw'}}>
                { (!edit)
                    ?<ListaDetalle title="Detalle Ingreso" data={ingresoToPrint}/>
                    :< FormularioEditar data={ingresoToPrint}/>
                }
                {/*<IngresoForm*/}
                    {/*ingreso={this.state.ingreso}*/}
                    {/*allTipos={this.props.tipos}*/}
                    {/*onChange={this.updateIngresoState}*/}
                    {/*onChangeTipo={this.handleChangeTipo}*/}
                {/*/>*/}
                { !edit
                    ?<FlatButton label="Editar" primary={true} onClick={this.openForm}/>
                    :<FlatButton label="Cancelar" primary={true} onClick={this.closeForm}/>
                }




                <FlatButton
                    label="Eliminar"
                    primary={true}
                    onClick={this.deleteItem}/>
                {/*<Dialog*/}
                    {/*contentStyle={{width:350}}*/}
                    {/*title="Editar Ingreso"*/}
                    {/*actions={this.actions}*/}
                    {/*modal={false}*/}
                    {/*open={this.state.openForm}*/}
                    {/*onRequestClose={this.closeForm}>*/}
                    {/*<IngresoForm*/}
                        {/*ingreso={this.state.ingresoMutable}*/}
                        {/*allTipos={this.props.tipos}*/}
                        {/*onChange={this.updateIngresoState}*/}
                        {/*onChangeTipo={this.handleChangeTipo}*/}
                    {/*/>*/}

                {/*</Dialog>*/}
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