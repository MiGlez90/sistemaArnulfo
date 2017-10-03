import firebase from '../firebase';

export function loadTiposSuccess(tipos){
    return {type: "LOAD_TIPOS_SUCCESS", tipos};
}



export function loadTipos(){
    return dispatch =>{
        return firebase.database().ref('tipos')
            .once('value')
            .then(s=>{
                const tipos = s.val();
                dispatch(loadTiposSuccess(tipos));
            })
            .catch(e=>{throw(e)});
    };
}