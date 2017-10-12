export default function filtroReducer(state = "SHOW_TODOS", action){
    switch(action.type){
        case "SHOW_ANIMALES":
            return action.filtro;
        case "SHOW_GRANOS":
            return action.filtro;
        case "SHOW_OTROS":
            return action.filtro;
        default:
            return state;
    }
}