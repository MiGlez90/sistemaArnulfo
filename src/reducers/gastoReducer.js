export default function gastoReducer (state = [], action){
    switch (action.type){

        case "LOAD_GASTOS_SUCCESS":
            return action.gastos;
            break;

        case "SAVE_NEW_GASTO_SUCCESS":
            return [...state,action.gasto];
            break;

        case "CREATE_GASTO":
            return [...state,action.gasto];
            break;;

        case "UPDATE_GASTO_SUCCESS":
            return state;

        default:
            return state;


    }
}