export default function (state = 'Flujo de Efectivo', action) {
    switch (action.type){
        case 'CHANGE_NAME':
            return action.name;
        default:
            return state;
    }
}