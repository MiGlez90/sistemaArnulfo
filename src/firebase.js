import * as firebase from 'firebase';

const config = {
    apiKey: "AIzaSyCgEBgWpBbzOAJGuS5pWDIBCAaJ7LUfV88",
    authDomain: "hackaton-b4fd1.firebaseapp.com",
    databaseURL: "https://hackaton-b4fd1.firebaseio.com",
    projectId: "hackaton-b4fd1",
    storageBucket: "hackaton-b4fd1.appspot.com",
    messagingSenderId: "360798458585"
};
firebase.initializeApp(config);

export default firebase;