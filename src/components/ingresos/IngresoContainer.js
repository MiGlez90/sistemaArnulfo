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
import FiltroSelect from "./FiltroSelect";
import {formatMenuItems} from './IngresoFormContainer';
import * as filtroActions from '../../actions/filtroTiposActions';
import FiltroFecha from "./FiltroFecha";
import moment from  'moment';

// import IngresoForm from './IngresoForm';
// import toastr from 'toastr';


class IngresoContainer extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            filtro: 'todos',
            filtroFecha: {
                inicio: {},
                final: {}
            }
        }
    }
    componentWillMount(){
        this.props.navBarNameActions.changeName('Ingresos');
    }



    filterItems = (losItems, filtro) => {
        switch(filtro){
            case "animales":
                return losItems.filter(i=>i.tipo==='animales');
            case "granos":
                return losItems.filter(i=>i.tipo==='granos');
            case "otros":
                return losItems.filter(i=>i.tipo==='otro');
            case 'todos':
                return losItems;

        }
    };

    handleChangeSelect = (event, index, value) => {
        this.setState({filtro:value});
        //this.props.filtroActions.changeFilterTipo(value);
    };

    handleChangeDateInicio = (event, date) => {
        let {filtroFecha} = this.state;
        filtroFecha.inicio = date;
        this.setState({
            filtroFecha
        });
    };

    handleChangeDateFinal = (event, date) => {
        let {filtroFecha} = this.state;
        filtroFecha.final = date;
        this.setState({
            filtroFecha
        });
    };

    retrieveIngresosWithDate = (e) => {
        e.preventDefault();
        const {filtroFecha} = this.state;
        const fechaInicio = moment(filtroFecha.inicio.toISOString(), moment.ISO_8601).format('x');
        const fechaFinal = moment(filtroFecha.final.toISOString(), moment.ISO_8601).format('x');
        this.props.actions.loadIngresosDelimitedByRange(fechaInicio, fechaFinal);
    };

    render() {
        const {ingresos, tipos} = this.props;
        const {filtro, filtroFecha} = this.state;
        const ingresosFiltrados = this.filterItems(ingresos,filtro);
        const tiposMenuItems = formatMenuItems(tipos);
        return (
            <div>
                <FiltroSelect
                    tipos={tiposMenuItems}
                    filtro={filtro}
                    onChange={this.handleChangeSelect}
                />
                <FiltroFecha
                    filtro={filtroFecha}
                    onChangeInicio={this.handleChangeDateInicio}
                    onChangeFinal={this.handleChangeDateFinal}
                    onSubmit={this.retrieveIngresosWithDate}
                />
                <IngresoList
                    data={ingresosFiltrados}
                />
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
    return {
        ingresos: state.ingresos,
        tipos: state.tipos,
        navBarName: state.navBarName,
        filtro: state.filtro
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(ingresoActions, dispatch),
        filtroActions: bindActionCreators(filtroActions, dispatch),
        navBarNameActions: bindActionCreators(navBarNameActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(IngresoContainer);