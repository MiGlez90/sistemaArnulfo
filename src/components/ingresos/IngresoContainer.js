/**
 * Created by BlisS on 22/03/17.
 */
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as ingresoActions from '../../actions/ingresoActions';
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
            <div style={ingresoContainerStyle}>
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

const ingresoContainerStyle = {
    width: '85vw'
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
        tipos: tiposFormattedForDropdown
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(ingresoActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(IngresoContainer);