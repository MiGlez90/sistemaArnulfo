import moment from 'moment';
const today = new Date();
const oneMonthBefore = new Date();
oneMonthBefore.setMonth(oneMonthBefore.getMonth() - 1);

const initialState = {
    inicio: oneMonthBefore,
    final: today
};

export default function fechaFiltroReducer( state = initialState, action) {
    switch (action.type){
        case "CHANGE_FECHA_INICIO":
            return { ...state, inicio:action.fecha};
        case "CHANGE_FECHA_FINAL":
            return {...state, final:action.fecha};
        default:
            return state;
    }
}