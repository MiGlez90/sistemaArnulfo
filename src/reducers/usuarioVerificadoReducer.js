export default function usuarioVerificadoReducer(state = false, action) {
    switch (action.type){
        case 'USUARIO_VERIFICADO':
            return action.verificado;
        case 'USUARIO_NO_VERIFICADO':
            return action.verificado;
        default:
            return state;
    }
}