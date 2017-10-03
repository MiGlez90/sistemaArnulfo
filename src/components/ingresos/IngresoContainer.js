/**
 * Created by BlisS on 22/03/17.
 */
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as ingresoActions from '../../actions/ingresoActions';
import IngresoList from './IngresoList';

class IngresoContainer extends React.Component {


    render() {
        const {ingresos} = this.props;
        return (
            <IngresoList ingresos={ingresos} />
        );
    }
}


IngresoContainer.propTypes = {
    // myProp: PropTypes.string.isRequired
};

function mapStateToProps(state, ownProps) {
    return {
        ingresos: state.ingresos,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(ingresoActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(IngresoContainer);