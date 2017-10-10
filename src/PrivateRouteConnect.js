import {connect} from 'react-redux';
import PrivateRoute from './PrivateRoute';

function mapStateToProps(state) {
    return {
        usuario: state.usuario,
        usuarioVerificado: state.usuarioVerificado,
        fetched: state.usuarioVerificado !== false
    }
}

export default connect(mapStateToProps) (PrivateRoute);