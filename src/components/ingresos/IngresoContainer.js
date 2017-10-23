/**
 * Created by BlisS on 22/03/17.
 * Pagina principal de ingresos /ingresos
 */
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as ingresoActions from '../../actions/ingresoActions';
import * as navBarNameActions from '../../actions/navBarNameActions';
import * as fechaFiltroActions from '../../actions/fechaFiltroActions';
import IngresoList from '../common/ShowTable';
import {FloatingActionButton} from 'material-ui';
import ContentAdd from 'material-ui/svg-icons/content/add';
import {Link} from "react-router-dom";
import FiltroSelect from "./FiltroSelect";
import {formatMenuItems} from './IngresoFormContainer';
import * as filtroActions from '../../actions/filtroTiposActions';
import FiltroFecha from "./FiltroFecha";
import moment from  'moment';

// import IngresoForm from './IngresoForm';
// import toastr from 'toastr';

//funcion para convertir fecha en ISO a fecha en milisegundos
function toMiliseconds(fechaISO) {
    return moment(fechaISO , moment.ISO_8601).format('x');
}


class IngresoContainer extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            filtro: 'todos'
        }
    }
    componentWillMount(){
        //Cambia el nombre de la barra AppBar
        this.props.navBarNameActions.changeName('Ingresos');
    }

    // funcion para filtrar por tipo (dependiendo el state)
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
            default:
                return losItems;
        }
    };


    /** controlar el filtro por tipo ***/
    //controlar el drop down de filtro por tipo
    handleChangeSelect = (event, index, value) => {
        this.setState({filtro:value});
        // si fuera en redux ...
        //this.props.filtroActions.changeFilterTipo(value);
    };

    /*** Controlar el filtro por fecha ***/
    // controlar la fecha de inicio
    handleChangeDateInicio = (event, date) => {
        this.props.fechaFiltroActions.changeFechaInicio(date);
    };

    //controlar la fecha final
    handleChangeDateFinal = (event, date) => {
        this.props.fechaFiltroActions.changeFechaFinal(date);
    };

    // comprobar si la fecha del rango final es mayor a la de inicio
    checkIfFinalIsGreather = (inicio,final) => {
        return final >= inicio;
    };
    // submit recuperar los ingresos de fecha por rango
    retrieveIngresosWithDate = (e) => {
        e.preventDefault();
        const {fechaFiltro} = this.props;
        const fechaFinal = toMiliseconds(fechaFiltro.final);
        const fechaInicio = toMiliseconds(fechaFiltro.inicio);
        if(this.checkIfFinalIsGreather(fechaInicio,fechaFinal)){
            this.props.actions.loadIngresosDelimitedByRange(fechaInicio, fechaFinal);
        }else{
            alert('La fecha final debe ser mayor a la de inicio');
        }
    };

    render() {
        // recuperar variables y constantes de props y state
        const {ingresos, tipos, fechaFiltro} = this.props;
        const {filtro} = this.state;
        // filtrar ingresos dependiendo el state (filtro de tipo)
        const ingresosFiltrados = this.filterItems(ingresos,filtro);
        // formatear los tipos para que se puedan desplegar en un drop down
        const tiposMenuItems = formatMenuItems(tipos);
        return (
            <div>
                {/*Muestra el filtro por tipo*/}
                <FiltroSelect
                    tipos={tiposMenuItems}
                    filtro={filtro}
                    onChange={this.handleChangeSelect}
                />
                {/*Muestra el filtro por rango de fecha*/}
                <FiltroFecha
                    filtro={fechaFiltro}
                    onChangeInicio={this.handleChangeDateInicio}
                    onChangeFinal={this.handleChangeDateFinal}
                    onSubmit={this.retrieveIngresosWithDate}
                />
                {/*Muestra la lista de ingresos*/}
                <IngresoList
                    data={ingresosFiltrados}
                />
                {/*Muestra un fab*/}
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
        filtro: state.filtro,
        fechaFiltro: state.fechaFiltro
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(ingresoActions, dispatch),
        filtroActions: bindActionCreators(filtroActions, dispatch),
        navBarNameActions: bindActionCreators(navBarNameActions, dispatch),
        fechaFiltroActions: bindActionCreators(fechaFiltroActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(IngresoContainer);