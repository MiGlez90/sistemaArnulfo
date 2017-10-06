import firebase from '../firebase';

export function createCaja(caja){
    return {type: "CREATE_CAJA", caja}
}

export function loadCajaSuccess(caja){
    return {type: "LOAD_CAJA_SUCCESS", caja}
}

export function createCajaSuccess(caja){
    return { type: "SAVE_NEW_CAJA_SUCCESS", caja };
}

export function updateCajaSuccess(caja){
    return { type: "UPDATE_CAJA_SUCCESS", caja };
}

export function loadCaja(){
    return function(dispatch){

        return firebase.database().ref('cajas')
            .once('value')
            .then(s => {
                let array = [];
                for (let k in s.val()){
                    let c = s.val()[k];
                    //console.log(s.val()[k]);
                    c['key'] = k;
                    array.push(c);
                }
                dispatch(loadCajaSuccess(array));
            }).catch(error =>{
                throw(error);
            });
    };
}

export function saveCaja(caja){
    return function (dispatch, getState){
         if(caja.key){
            let updates = {};
            updates['/cajas/' + caja.key] = caja;
            return firebase.database().ref().update(updates)
                .then(()=>{

                    return dispatch(updateCajaSuccess(caja));
                });
        }else{
            return firebase.database().ref('cajas/')
                .push(caja)
                .then(s =>{


                    caja['key'] = s.key;

                    return dispatch(createCajaSuccess(caja));
                })
                .catch(error => {

                    throw(error);
                });
        }


    };
}
