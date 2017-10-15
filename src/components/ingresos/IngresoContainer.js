/**
 * Created by BlisS on 22/03/17.
 */
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as ingresoActions from '../../actions/ingresoActions';
import * as navBarNameActions from '../../actions/navBarNameActions';
import IngresoList from '../common/ShowTable';
import {FloatingActionButton, Dialog, FlatButton} from 'material-ui';
import ContentAdd from 'material-ui/svg-icons/content/add';
import {Link} from "react-router-dom";
// import IngresoForm from './IngresoForm';
// import toastr from 'toastr';


class IngresoContainer extends React.Component {

    componentWillMount(){
        this.props.navBarNameActions.changeName('Ingresos');
    }



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

    actions = [
        <FlatButton
            label="Ok"
            primary={true}
            keyboardFocused={true}
            onClick={this.saveItem}
        />,
    ];


    render() {
        const {ingresos} = this.props;
        return (
            <div>
                <IngresoList data={ingresos} />
                <Link to="/ingresos/addIngreso">
                    <FloatingActionButton
                        style={fabstyle}>
                        <ContentAdd/>
                    </FloatingActionButton>
                </Link>
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