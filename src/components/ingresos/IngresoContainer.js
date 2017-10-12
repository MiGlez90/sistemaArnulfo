/**
 * Created by BlisS on 22/03/17.
 */
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as ingresoActions from '../../actions/ingresoActions';
import * as navBarNameActions from '../../actions/navBarNameActions';
import IngresoList from './IngresoList';
import {FloatingActionButton, Dialog, FlatButton} from 'material-ui';
import ContentAdd from 'material-ui/svg-icons/content/add';
import IngresoForm from './IngresoForm';
import toastr from 'toastr';


class IngresoContainer extends React.Component {
    state = {
        openForm: false,
        ingreso: {
            description: '',
            referencia: '',
            cantidad: '',
            tipo: '',
            captureDate: '',
            subtipo: ''
        },
        controlledDate: {}
    };

    componentWillMount(){
        this.props.navBarNameActions.changeName('Ingresos');
    }

    handleChangeTipo = (event, index, value) => {
        let ingreso = Object.assign({}, this.state.ingreso);
        ingreso.tipo = value;
        this.setState({ingreso});
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

    filterItems = (losItems, filtro) => {
        switch(filtro){
            case "SHOW_ANIMALES":
                return losItems.filter(i=>i.tipo==='animales');
            case "SHOW_GRANOS":
                return losItems.filter(i=>i.tipo==='granos');

            case "SHOW_OTROS":
                return losItems.filter(i=>i.tipo==='otro');

            case "SHOW_TODOS":
                return losItems;

        }
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

    actions = [
        <FlatButton
            label="Ok"
            primary={true}
            keyboardFocused={true}
            onClick={this.saveItem}
        />,
    ];

    openForm = () => {
        this.setState({openForm:true});
    };

    closeForm = () => {
        this.setState({openForm:false});
    };

    render() {
        const {ingresos} = this.props;
        return (
            <div>
                <IngresoList ingresos={ingresos} />
                <FloatingActionButton
                    style={fabstyle}
                    onClick={this.openForm}>
                    <ContentAdd/>
                </FloatingActionButton>
                <Dialog
                    contentStyle={{width:350}}
                    title="Agregar Ingreso"
                    actions={this.actions}
                    modal={false}
                    open={this.state.openForm}
                    onRequestClose={this.closeForm}>
                    <IngresoForm
                        ingreso={this.state.ingreso}
                        controlledDate={this.state.controlledDate}
                        allTipos={this.props.tipos}
                        onChange={this.updateIngresoState}
                        onChangeTipo={this.handleChangeTipo}
                        onChangeDate={this.handleChangeCaptureDate}
                    />

                </Dialog>
            </div>

        );
    }
}

const fabstyle = {
  position:'fixed',
  right: 15,
  bottom: 15
};

IngresoContainer.propTypes = {
    // myProp: PropTypes.string.isRequired
};

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

export default connect(mapStateToProps, mapDispatchToProps)(IngresoContainer);