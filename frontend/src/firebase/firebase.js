import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // Import authentication

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
const auth = getAuth(app); // Firebase Authentication

export { auth };
