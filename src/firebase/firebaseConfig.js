import 'firebase/firestore';
import 'firebase/auth';
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';


const firebaseConfig = {
    apiKey: "AIzaSyAJLXI7W_a-Shq3Rs_HLTIJOn8Z4oAP29k",
    authDomain: "my-chat-app-xd.firebaseapp.com",
    databaseURL: "https://my-chat-app-xd-default-rtdb.firebaseio.com",
    projectId: "my-chat-app-xd",
    storageBucket: "my-chat-app-xd.appspot.com",
    messagingSenderId: "638690080105",
    appId: "1:638690080105:web:70247529c428fe4de379f8"
};


const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore();
const firebaseAuth = getAuth()


export {
    db,
    firebaseApp,
    firebaseAuth
}
