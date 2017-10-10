export default function (state = 'Flujo de Efectivo', action) {
    switch (action.type){
        case 'CHANGE_NAME':
            return action.name;
            break;
        default:
            return state;
    }
}