import {initializeApp} from 'firebase/app';
import {getAuth,GoogleAuthProvider} from 'firebase/auth'; 

const firebaseConfig = {
    apiKey: "AIzaSyBQ_scW4--Pr0c72F_5hienpnZhWG_sE7s",
    authDomain: "mern-whatsapp-a3668.firebaseapp.com",
    projectId: "mern-whatsapp-a3668",
    storageBucket: "mern-whatsapp-a3668.appspot.com",
    messagingSenderId: "788831213422",
    appId: "1:788831213422:web:1d32e6128b99d43691937f",
    measurementId: "G-H067EM1FF4"
  };
  
  const app = initializeApp(firebaseConfig);

  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  export {app,auth,provider};