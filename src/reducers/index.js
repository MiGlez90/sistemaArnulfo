import {combineReducers} from 'redux';
import ingresoReducer from './ingresoReducer';
import tipoReducer from './tipoReducer';
import cajaReducer from './cajaReducer';


const rootReducer = combineReducers({
    ingresos: ingresoReducer,
    tipos: tipoReducer,
    caja:cajaReducer
});

export default rootReducer;
