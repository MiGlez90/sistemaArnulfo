export default function usuarioVerificadoReducer(state = false, action) {
    switch (action.type){
        case 'USUARIO_VERIFICADO':
            return action.verificado;
            break;
        case 'USUARIO_NO_VERIFICADO':
            return action.verificado;
            break;
        default:
            return state;
            break;
    }
}