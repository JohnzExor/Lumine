// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCjlSp8LOWU7iGJJIhtF-TKqrSe9iMnUYs",
  authDomain: "lum1ne.firebaseapp.com",
  projectId: "lum1ne",
  storageBucket: "lum1ne.appspot.com",
  messagingSenderId: "99743955639",
  appId: "1:99743955639:web:b6de5043899b09c0702b32",
  measurementId: "G-GQMPE0RWYY",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
