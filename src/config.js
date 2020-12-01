import * as firebase from 'firebase/app'
import  'firebase/auth';
 import  'firebase/firestore';
 import 'firebase/storage'

// import   'firebase/functions'

const Firebase = firebase.initializeApp({
    apiKey: "AIzaSyBpvbJSf-ZOjbEKEYVjbm_DjS_Aw8lx0JM",
    authDomain: "every-dime.firebaseapp.com",
    databaseURL: "https://every-dime.firebaseio.com",
    projectId: "every-dime",
    storageBucket: "every-dime.appspot.com",
    messagingSenderId: "982040474281",
    appId: "1:982040474281:web:3ac994a727fa5ac2dbafb8",
    measurementId: "G-FSCPP416XT"
})

//const auth = firebase.auth();

 //const db = firebase.firestore();
// const functions = firebase.functions();

export default Firebase;
 export {firebase}
