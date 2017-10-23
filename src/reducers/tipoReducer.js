export default function tipoReducer(state = [], action){
    switch(action.type){
        case "LOAD_TIPOS_SUCCESS":
            return action.tipos;
        default:
            return state;
    }
}