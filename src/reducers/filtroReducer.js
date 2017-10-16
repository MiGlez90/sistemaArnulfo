export default function filtroReducer(state = "todos", action){
    switch(action.type){
        case "CHANGE_FILTER_TIPO":
            return action.filtro;
        // case "SHOW_GRANOS":
        //     return action.filtro;
        // case "SHOW_OTROS":
        //     return action.filtro;
        default:
            return state;
    }
}