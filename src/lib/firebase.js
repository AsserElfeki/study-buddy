// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDEGTYzIDi3nuDw9Jt0KVy4oTqpm7gg9oY",
    authDomain: "magnificent-ray-394218.firebaseapp.com",
    projectId: "magnificent-ray-394218",
    storageBucket: "magnificent-ray-394218.appspot.com",
    messagingSenderId: "994641788896",
    appId: "1:994641788896:web:89757742e0cfa5101c3585",
    measurementId: "G-JDW0XGVQBM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);