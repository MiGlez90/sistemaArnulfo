/**
 * Created by BlisS on 22/03/17.
 */
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as ingresoActions from '../../actions/ingresoActions';
import ListaDetalle from "./ListaDetalle";
import { FlatButton, FloatingActionButton} from 'material-ui';
import toastr from 'toastr';
import FormularioEditar from "./FormularioEditar";
import ContentRemove from 'material-ui/svg-icons/action/delete-forever';

const buttonStyle = {
    margin: '20px 0px'
};

class ManageIngresoPage extends React.Component {

    state = {
        edit: false,
        ingreso:  {},
        errors:{}
    };


    deleteItem = () => {
        debugger;
        const response = window.confirm('Seguro');
        if(response){
            const ingresoForRemoving = Object.assign({},this.props.ingreso);
            this.props.actions.deleteIngreso(ingresoForRemoving)
                .then( r => {
                    toastr.success('Se ha eliminado');
                    this.props.history.push('/ingresos');
                }).catch( e => {
                    console.log(e);
            });
        }

    };

    editIngreso = () => {
        const ingresoCopy = Object.assign({},this.state.ingreso);
        this.props.actions.saveIngreso(ingresoCopy)
            .then( (r) => {
                toastr.success('Guardado');
                console.log(r);
            }).catch(e=>console.error(e));
        this.closeForm();
    };

    openForm = () => {
        // this.setState({openForm:true});
        const ingreso = Object.assign({},this.props.ingreso);
        this.setState({edit:true, ingreso}, () => {
            console.log(this.state.ingreso);
        } );
    };

    closeForm = () => {
        // this.setState({openForm:false});
        this.setState({edit:false});
    };


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
            <div style={{width:'70vw'}}>
                { (!edit)
                    ?<ListaDetalle
                        title="Detalle Ingreso"
                        data={ingresoToPrint}/>
                    :< FormularioEditar
                        data={ingresoToPrint}
                        ingreso={this.state.ingreso}
                        onChange={this.updateIngresoState}
                        onChangleTipo={this.handleChangeTipo}/>
                }
                { !edit
                    ?
                    <div>
                        <FlatButton
                            label="Editar"
                            primary={true}
                            onClick={this.openForm}
                            style={buttonStyle}
                        />
                        <FlatButton
                            label="Regresar"
                            primary={true}
                            onClick={()=>this.props.history.push('/ingresos')}
                            style={buttonStyle}
                        />
                    </div>
                    :
                    <div>
                        <FlatButton
                            label="Guardar Cambios"
                            primary={true}
                            onClick={this.editIngreso}
                            style={buttonStyle}
                        />
                        <FlatButton
                            label="Cancelar"
                            primary={true}
                            onClick={this.closeForm}
                            style={buttonStyle}
                        />
                    </div>
                }

                <FloatingActionButton
                    style={fabstyle}
                    onClick={this.deleteItem}>
                    <ContentRemove/>
                </FloatingActionButton>


                {/*<FlatButton*/}
                    {/*label="Eliminar"*/}
                    {/*primary={true}*/}
                    {/*onClick={this.deleteItem}/>*/}

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

const fabstyle = {
    position:'fixed',
    right: 15,
    bottom: 15
};

function mapStateToProps(state, ownProps) {
    console.log(state.ingresos);

    debugger;
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