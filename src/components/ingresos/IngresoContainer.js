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
import {Dialog, FloatingActionButton, Toggle} from 'material-ui';
import ContentAdd from 'material-ui/svg-icons/content/add';
import {Link} from "react-router-dom";
import FiltroSelect from "./FiltroSelect";
import {formatMenuItems} from './IngresoFormContainer';
import * as filtroActions from '../../actions/filtroTiposActions';
import FiltroFecha from "./FiltroFecha";
import moment from  'moment';
import FiltroFechaOnlyRead from "./FiltroFechaOnlyRead";

// import IngresoForm from './IngresoForm';
// import toastr from 'toastr';

//funcion para convertir fecha en ISO a fecha en milisegundos
export function toMiliseconds(fechaISO) {
    return moment(fechaISO , moment.ISO_8601).format('x');
}

export function toBetterFormat(fechaISO) {
    return moment(fechaISO , moment.ISO_8601).format('DD MMMM YYYY');
}


class IngresoContainer extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            filtro: 'todos',
            fechaFiltro: {
                inicio: {},
                final: {},
            },
            editDate: false
        }
    }
    componentWillMount(){
        //Cambia el nombre de la barra AppBar
        this.props.navBarNameActions.changeName('Ingresos');
    }

    onToogle = (event) => {
        let {editDate} = this.state;
        editDate = !editDate;
        this.setState({editDate});
    };

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
        // this is for local changes
        // let {fechaFiltro} = this.state;
        // fechaFiltro.inicio = date;
        // this.setState({fechaFiltro});
        // this is for redux
        this.props.fechaFiltroActions.changeFechaInicio(date);
        this.retrieveIngresosWithDate();
    };

    //controlar la fecha final
    handleChangeDateFinal = (event, date) => {
        // let {fechaFiltro} = this.state;
        // fechaFiltro.final = date;
        // this.setState({fechaFiltro});
        // this is for redux
        this.props.fechaFiltroActions.changeFechaFinal(date);
        this.retrieveIngresosWithDate();
    };

    // comprobar si la fecha del rango final es mayor a la de inicio
    checkIfFinalIsGreather = (inicio,final) => {
        return final >= inicio;
    };
    // submit recuperar los ingresos de fecha por rango
    retrieveIngresosWithDate = () => {
        const {fechaFiltro} = this.props;
        const fechaFinal = toMiliseconds(fechaFiltro.final);
        const fechaInicio = toMiliseconds(fechaFiltro.inicio);
        if(this.checkIfFinalIsGreather(fechaInicio,fechaFinal)){
            this.props.actions.loadIngresosDelimitedByRange(fechaInicio, fechaFinal)
                .then( r => {
                    // this.props.fechaFiltroActions.changeFechaFinal(fechaFiltro.final);
                    // this.props.fechaFiltroActions.changeFechaInicio(fechaFiltro.inicio);
                    // this.onToogle();
                });
        }else{
            alert('La fecha final debe ser mayor a la de inicio');
        }
    };

    render() {
        // recuperar variables y constantes de props y state
        const {ingresos, tipos, fechaFiltro} = this.props;
        const {filtro} = this.state;
        const fechaFiltroLocal = this.state.fechaFiltro;
        // filtrar ingresos dependiendo el state (filtro de tipo)
        const ingresosFiltrados = this.filterItems(ingresos,filtro);
        // formatear los tipos para que se puedan desplegar en un drop down
        const tiposMenuItems = formatMenuItems(tipos);
        const fechaInicio = toBetterFormat(fechaFiltro.inicio.toISOString());
        const fechaFinal = toBetterFormat(fechaFiltro.final.toISOString());
        return (
            <div>
                {/*Muestra el filtro por tipo*/}
                {/*<FiltroSelect*/}
                    {/*tipos={tiposMenuItems}*/}
                    {/*filtro={filtro}*/}
                    {/*onChange={this.handleChangeSelect}*/}
                {/*/>*/}
                {/*Muestra el filtro por rango de fecha*/}
                    <FiltroFecha
                        // si la fecha está guardada en redux, mostrar fecha de redux, si no
                        // mostrar fecha local del state
                        filtro={ fechaFiltro }
                        onChangeInicio={this.handleChangeDateInicio}
                        onChangeFinal={this.handleChangeDateFinal}
                        onSubmit={this.retrieveIngresosWithDate}
                        onClick={this.onToogle}
                    />

                {/*Muestra la lista de ingresos*/}
                <IngresoList
                    data={ingresosFiltrados}
                />
                {/*Muestra un fab*/}
                {
                    this.props.gastosLength > 0 ?
                    <Link to="/ingresos/addIngreso">
                        <FloatingActionButton
                            style={fabstyle}>
                            <ContentAdd/>
                        </FloatingActionButton>
                    </Link> :
                        <FloatingActionButton
                            onClick={ () => {
                                alert('No tiene nada en inventario para vender');
                            }}
                            style={fabstyle}>
                            <ContentAdd/>
                        </FloatingActionButton>
                }
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
    const gastosForSelling = state.gastos.filter( (gasto) => {
       return !gasto.sold
    });
    return {
        ingresos: state.ingresos,
        gastosLength : gastosForSelling.length,
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