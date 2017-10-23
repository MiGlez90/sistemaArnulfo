export default function fechaFiltroReducer( state = {}, action) {
    switch (action.type){
        case "CHANGE_FECHA_INICIO":
            return { ...state, inicio:action.fecha};
        case "CHANGE_FECHA_FINAL":
            return {...state, final:action.fecha};
        default:
            return state;
    }
}