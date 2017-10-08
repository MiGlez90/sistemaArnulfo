import firebase from '../firebase';

export function createIngreso(ingreso){
    return {type: "CREATE_INGRESO", ingreso}
}

export function loadIngresosSuccess(ingresos){
    return {type: "LOAD_INGRESOS_SUCCESS", ingresos}
}

export function createIngresoSuccess(ingreso){
    return { type: "SAVE_NEW_INGRESO_SUCCESS", ingreso };
}

export function updateIngresoSuccess(ingreso){
    return { type: "UPDATE_INGRESO_SUCCESS", ingreso };
}

export function deleteIngresoSuccess(ingreso) {
    return { type: "DELETE_INGRESO_SUCCESS", ingreso };
}


export function loadIngresos(){
    return function(dispatch){
        // Despachamos la accion para el loader
       // dispatch(beginAjaxCall());
        return firebase.database().ref('ingresos')
            .once('value')
            .then(s => {
                let array = [];
                for (let k in s.val()){
                    let c = s.val()[k];
                    //console.log(s.val()[k]);
                    c['key'] = k;
                    array.push(c);
                }
                dispatch(loadIngresosSuccess(array));
            }).catch(error =>{
                throw(error);
            });
    };
}

export function saveIngreso(ingreso){
    return function (dispatch, getState){
        // Despachamos la accion para el loader
        //dispatch(beginAjaxCall());
        if(ingreso.key){
            let updates = {};
            updates['/ingresos/' + ingreso.key] = ingreso;
            return firebase.database().ref().update(updates)
                .then(()=>{
                    //console.log('chet');
                    return dispatch(updateIngresoSuccess(ingreso));
                });
        }else{
            return firebase.database().ref('ingresos/')
                .push(ingreso)
                .then(s =>{
                    //console.log(s.key);

                    ingreso['key'] = s.key;
                    //console.log('nuevo chet');
                    return dispatch(createIngresoSuccess(ingreso));
                })
                .catch(error => {
                    //dispatch(ajaxCallError());
                    throw(error);
                });
        }


    };
}

export function deleteIngreso(ingreso) {
    return function (dispatch, getState) {
        debugger;
        let updates = {};
        updates['/ingresos/' + ingreso.key] = null;
        return firebase.database().ref().update(updates)
            .then(r=>{
                dispatch(deleteIngresoSuccess(ingreso));
                console.log(r);
            }).catch(e=>{
                console.log(e)
            });

    }
}

