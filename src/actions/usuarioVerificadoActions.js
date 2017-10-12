export function usuarioVerificado() {
    return {type: 'USUARIO_VERIFICADO', verificado:true}
}

export function usuarioNoVerificado() {
    return {type: 'USUARIO_NO_VERIFICADO', verificado:false}
}