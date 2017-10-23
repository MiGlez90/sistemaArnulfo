export function changeFechaInicioSuccess(fecha) {
    return {type: "CHANGE_FECHA_INICIO", fecha}
}
export function changeFechaInicio(fecha) {
    return function (dispatch, getState) {
        dispatch(changeFechaInicioSuccess(fecha));
        return Promise.resolve();
    }
}

export function changeFechaFinalSuccess(fecha) {
    return {type: "CHANGE_FECHA_FINAL", fecha}
}
export function changeFechaFinal(fecha) {
    return function (dispatch, getState) {
        dispatch(changeFechaFinalSuccess(fecha));
        return Promise.resolve();
    }
}

