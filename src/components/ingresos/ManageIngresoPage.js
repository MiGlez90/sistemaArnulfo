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
        ingreso: Object.assign({}, this.props.ingreso),
        errors:{}
    };

    updateIngresoState = (e) => {
        const field = e.target.name;
        let ingreso = Object.assign({}, this.state.ingreso);
        ingreso[field] = e.target.value;
        return this.setState({ingreso});
    };

    render() {
        return (
            <div>
                <h1>Manage Ingreso</h1>
                <IngresoForm
                    ingreso={this.state.ingreso}
                    errors={this.state.errors}
                    allTipos={this.props.tipos}
                    onChange={this.updateIngresoState}
                />
            </div>
        );
    }
}

//ManageIngresoPage.propTypes = {
    // myProp: PropTypes.string.isRequired
//};

function mapStateToProps(state, ownProps) {
    let ingreso = {
        key:'',
        cantidad:'',
        captura:'',
        description:'',
        fecha:'',
        subtipo:'',
        tipo:''

    };

    const tiposFormattedForDropdown = state.tipos.map(tipo=>{
        return {
            value:tipo.value,
            text:tipo.text
        }
    });

    return {
        ingreso,
        tipos: tiposFormattedForDropdown
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(ingresoActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageIngresoPage);