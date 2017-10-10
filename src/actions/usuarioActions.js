import firebase from '../firebase';
import toastr from 'toastr';
import {usuarioVerificado} from "./usuarioVerificadoActions";


export function iniciarSesionAction(usuario) {
    return {type:"INICIAR_SESION" , usuario};
}

export function cerrarSesionAction(usuario) {
    return { type:"CERRAR_SESION" , usuario };
}

export function comprobarUsuarioAction(usuario) {
    return { type:"COMPROBAR_USUARIO", usuario};
}

export function iniciarSesion(user) {
    return function(dispatch, getState) {
        // console.log(user)
        return firebase.auth()
            .signInWithEmailAndPassword(user.email, user.password)
            .then((u) => {
                //console.log(user)
                toastr.success("Bienvenido");
                console.log('Ya estoy adentro');
                console.log('USUARIO ID' + u.uid);
                dispatch(iniciarSesionAction(u));
                //dispatch(loadListaMedidas(u.uid,moment().format('YYYY'),moment().format('MM')));
            })
            .catch((error) => {
                var errorCode = error.code;
                let errorMessage = '';
                if (errorCode === 'auth/user-not-found') {
                    errorMessage = 'Usuario no encontrado';
                } else if (errorCode === 'auth/wrong-password') {
                    errorMessage = 'La contraseña es inválida';
                }

                console.log('Algo estuvo mal ',error );
                toastr.error(errorMessage);
            });

    }
}

export function registrarEIniciarSesion(user) {
    return function (dispatch, getState) {
        return firebase.auth()
            .createUserWithEmailAndPassword(user.email, user.password)
            .then((u) => {
                debugger;
                toastr.success('Se ha creado el usuario con éxito');
                actualizarPerfil(u);
                iniciarSesion(user);

                //this.props.history.push('/login');
            })
            .catch(function(error) {
                //var errorCode = error.code;
                let errorMessage = error.message;
                console.log('something wrong ' + errorMessage);
                toastr.error('something wrong ' + errorMessage);
            });
    }
}

export function actualizarPerfil (user) {
    return function (dispatch, getState) {
        let userFirebase = firebase.auth().currentUser;
        let fullname = user.fullName;
        userFirebase.updateProfile({
            displayName: fullname,
            //photoURL: "https://example.com/jane-q-user/profile.jpg"
        }).then( () => {
            //toastr.success('Actualizado!');
            console.log('Perfil actualizado');
        }, error => {
            toastr.error('Algo mal' + error.message);
        });
    }
}



export function cerrarSesion() {
    return function (dispatch,getState) {
        return firebase.auth().signOut()
            .then( (r) => {
                console.log('Ya sali ', r);
                //toastr.success('Ha cerrado sesión');
                dispatch(cerrarSesionAction(null));
            }).catch( (error) => {
                console.error('No pude salir');
            });

    }
}

export function comprobarUsuario(){
    return function (dispatch, getState) {
        return firebase.auth().onAuthStateChanged((u) => {
            dispatch(usuarioVerificado());
            if(u){
                debugger;
                dispatch(comprobarUsuarioAction(u));
            }else{
                debugger;
            }

        });
    }
}