import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as gastosActions from '../../actions/gastoActions';
import * as navBarNameActions from '../../actions/navBarNameActions';
import GastoFormContainer from './GastoFormContainer';





function mapStateToProps(state,ownProps) {
    return {
        gastosList: state.gastos,
        navBarName: state.navBarName,
        tipos: state.tipos
    }
}

function mapDispatchToProps(dispatch) {
    return{
        gastosActions: bindActionCreators(gastosActions,dispatch),
        navBarNameActions: bindActionCreators(navBarNameActions,dispatch)
    }

}

export default connect(mapStateToProps,mapDispatchToProps) (GastoFormContainer);
