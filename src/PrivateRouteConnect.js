import {connect} from 'react-redux';
import PrivateRoute from './PrivateRoute';

function mapStateToProps(state) {
    return {
        usuario: state.usuario,
        fetched: state.usuario !== null
    }
}

export default connect(mapStateToProps) (PrivateRoute);