import initialState from './initialState';

export default function ingresoReducer(state = [], action){
    switch(action.type){
        case "LOAD_INGRESOS_SUCCESS":
            return action.ingresos;
            break;
        case "SAVE_NEW_INGRESO_SUCCESS":
            return [...state,
                Object.assign({},action.ingreso)
            ];
        case "CREATE_INGRESO":
            //state.push(action.ingreso);
            //return state;
            return [...state,
            Object.assign({}, action.ingreso)
            ];
        case "UPDATE_INGRESO_SUCCESS":
            return [...state.map( i => {
                if(i.key === action.ingreso.key){
                    return action.ingreso;
                }
                return i;
            } )];

        // case "LOAD_TIPOS_SUCCESS":
        //     return action.tipos;
        case "DELETE_INGRESO_SUCCESS":
            return [...state.filter( i =>
                i.key !== action.ingreso.key
            )];
        default:
            return state;
    }
}