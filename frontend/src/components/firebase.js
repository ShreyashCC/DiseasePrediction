// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBJtR3chrOSWySKStAdt3qHSqjDQpRimvc",
  authDomain: "diseaseprediction-cc913.firebaseapp.com",
  projectId: "diseaseprediction-cc913",
  storageBucket: "diseaseprediction-cc913.firebasestorage.app",
  messagingSenderId: "784189580576",
  appId: "1:784189580576:web:d6ddd53b547a1db952e345",
  measurementId: "G-GKP4X9CZE0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth=getAuth();
export const db=getFirestore(app);
export default app;