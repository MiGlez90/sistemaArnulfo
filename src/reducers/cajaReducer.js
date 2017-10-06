import initialState from './initialState';

export default function cajaReducer(state = [], action){
  switch(action.type){

    case "LOAD_CAJA_SUCCESS":
        return action.caja;
        break;


    case "SAVE_NEW_CAJA_SUCCESS":
        return [...state,
            Object.assign({},action.caja)
        ];

        case "CREATE_CAJA":
            return [...state,
            Object.assign({}, action.caja)
            ];

            case "UPDATE_CAJA_SUCCESS":
                return state;
            default:
                return state;

}
}
