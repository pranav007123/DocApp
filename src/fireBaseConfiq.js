// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAEBDPGjlr8jL-RxAjd8rFVFI4GBa5BWt8",
  authDomain: "docapp-10b5f.firebaseapp.com",
  projectId: "docapp-10b5f",
  storageBucket: "docapp-10b5f.appspot.com",
  messagingSenderId: "158714855673",
  appId: "1:158714855673:web:5ce014cd06b17a631b6228",
  measurementId: "G-EBQ1Y10FEM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)