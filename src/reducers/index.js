import {combineReducers} from 'redux';
import ingresoReducer from './ingresoReducer';
import tipoReducer from './tipoReducer';
import subtiposAnimalesReducer from './subtiposAnimalesReducer';
import gastoReducer from "./gastoReducer";
import usuarioReducer from "./usuarioReducer";
import navBarNameReducer from './navBarNameReducer';
import usuarioVerificadoReducer from "./usuarioVerificadoReducer";
import subtiposGranosReducer from "./subtiposGranosReducer";
import filtroReducer from "./filtroReducer";


const rootReducer = combineReducers({
    ingresos: ingresoReducer,
    tipos: tipoReducer,
    subtiposAnimales: subtiposAnimalesReducer,
    subtiposGranos: subtiposGranosReducer,
    gastos:gastoReducer,
    usuario: usuarioReducer,
    navBarName: navBarNameReducer,
    usuarioVerificado: usuarioVerificadoReducer,
    filtro: filtroReducer
});

export default rootReducer;
