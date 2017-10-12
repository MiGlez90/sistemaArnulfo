import firebase from '../firebase';

export function loadSubtiposAnimalesSuccess(subtiposAnimales){
    return {type: "LOAD_SUBTIPOSANIMALES_SUCCESS", subtiposAnimales};
}



export function loadSubtiposAnimales(){
    return dispatch =>{
        return firebase.database().ref('subtipoAnimales')
            .once('value')
            .then(s=>{
                const subtiposAnimales = s.val();
                dispatch(loadSubtiposAnimalesSuccess(subtiposAnimales));
            })
            .catch(e=>{throw(e)});
    };
}