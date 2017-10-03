import {combineReducers} from 'redux';
import ingresoReducer from './ingresoReducer';
import tipoReducer from './tipoReducer';


const rootReducer = combineReducers({
    ingresos: ingresoReducer,
    tipos: tipoReducer
});

export default rootReducer;