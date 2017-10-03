import {combineReducers} from 'redux';
import ingresoReducer from './ingresoReducer';
import tipoReducer from './tipoReducer';
import gastoReducer from "./gastoReducer";
import usuarioReducer from "./usuarioReducer";


const rootReducer = combineReducers({
    ingresos: ingresoReducer,
    tipos: tipoReducer,
    gastos:gastoReducer,
    usuario: usuarioReducer
});

export default rootReducer;