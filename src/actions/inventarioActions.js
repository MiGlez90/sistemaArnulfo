import firebase from '../firebase';

export function createInventario(inventario){
    return {type: "CREATE_INVENTARIO", inventario}
}

export function loadInventarioSuccess(inventarios){
    return {type: "LOAD_INVENTARIO_SUCCESS", inventarios}
}

export function createInventarioSuccess(inventario){
    return { type: "SAVE_NEW_INVENTARIO_SUCCESS", inventario };
}

export function updateInventarioSuccess(inventario){
    return { type: "UPDATE_INVENTARIO_SUCCESS", inventario };
}

export function deleteInventarioSuccess(inventario) {
    return { type: "DELETE_INVENTARIO_SUCCESS", inventario };
}


export function loadInventario(){
    return function(dispatch, getState){
        return firebase.database().ref('/inventarios/' + getState().usuario.uid)
            .once('value')
            .then(s => {
                let array = [];
                for (let k in s.val()){
                    let c = s.val()[k];

                    c['key'] = k;
                    array.push(c);
                }
                dispatch(loadInventarioSuccess(array));
            }).catch(error =>{
                throw(error);
            });
    };
}

export function loadInventarioDelimitedByRange(fechaInicio, fechaFinal){
    return async(dispatch, getState) => {
        debugger;


        return firebase.database().ref('/inventarios/' + getState().usuario.uid)
            .orderByChild('dateMS')
            .startAt(fechaInicio)
            .endAt(fechaFinal)
            .once('value')
            .then(s => {
                let array = [];
                for (let k in s.val()){
                    let c = s.val()[k];

                    c['key'] = k;
                    array.push(c);
                }
                dispatch(loadInventarioSuccess(array));
            }).catch(error =>{
                throw(error);
            });
    };
}

export function saveInventario(inventario){
    return function (dispatch, getState){

        if(inventario.key){
            let updates = {};
            updates['/inventarios/' + getState().usuario.uid  + '/' +  inventario.key] = inventario;
            return firebase.database().ref().update(updates)
                .then(()=>{
                    //console.log('chet');
                    return dispatch(updateInventarioSuccess(inventario));
                });
        }else{
            return firebase.database().ref('/inventarios/' + getState().usuario.uid)
                .push(inventario)
                .then(s =>{

                    inventario['key'] = s.key;

                    return dispatch(createInventarioSuccess(inventario));
                })
                .catch(error => {

                    throw(error);
                });
        }


    };
}

export function deleteIngreso(inventario) {
    return function (dispatch, getState) {
        debugger;
        let updates = {};
        updates['/inventarios/' + getState().usuario.uid + '/' + inventario.key] = null;
        return firebase.database().ref().update(updates)
            .then(r=>{
                dispatch(deleteInventarioSuccess(inventario));
                console.log(r);
            }).catch(e=>{
                console.log(e)
            });

    }
}
