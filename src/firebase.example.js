import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "demoexample",
    authDomain: "demoexample",
    projectId: "demoexample",
    storageBucket: "demoexample.appspot.com",
    messagingSenderId: "demoexample",
    appId: "demoexample"
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();