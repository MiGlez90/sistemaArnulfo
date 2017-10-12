import firebase from '../firebase';

export function loadSubtiposGranosSuccess(subtiposGranos){
    return {type: "LOAD_SUBTIPOSGRANOS_SUCCESS", subtiposGranos};
}



export function loadSubtiposGranos(){
    return dispatch =>{
        return firebase.database().ref('subtipoGranos')
            .once('value')
            .then(s=>{
                const subtiposGranos = s.val();
                dispatch(loadSubtiposGranosSuccess(subtiposGranos));
            })
            .catch(e=>{throw(e)});
    };
}