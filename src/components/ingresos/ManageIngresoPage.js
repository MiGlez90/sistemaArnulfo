/**
 * Created by BlisS on 22/03/17.
 */
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as ingresoActions from '../../actions/ingresoActions';
import IngresoForm from './IngresoForm';


class ManageIngresoPage extends React.Component {

    state = {
        ingreso:  {},
        errors:{}
    };


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


    render() {
        return (
            <div>
                <h1>Manage Ingreso</h1>
                <IngresoForm
                    ingresoClon={this.state.ingreso}
                    ingreso={this.state.ingreso}
                    errors={this.state.errors}
                    allTipos={this.props.tipos}
                    onChange={this.updateIngresoState}
                    onChangeTipo={this.handleChangeTipo}
                />
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