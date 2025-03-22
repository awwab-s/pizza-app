// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBmPkHPCdtpSRiRZ9jJy29a3P7xXyBBR1w",
  authDomain: "pizza-app-f9ca5.firebaseapp.com",
  projectId: "pizza-app-f9ca5",
  storageBucket: "pizza-app-f9ca5.firebasestorage.app",
  messagingSenderId: "335436484573",
  appId: "1:335436484573:web:234f4cb2a938b2a2ddb034",
  measurementId: "G-BW6RGJL1K6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const WEB_CLIENT_ID = '335436484573-1v7poi970k2qf3vqrell08kq3pi6o2ok.apps.googleusercontent.com'

// Export Firebase services
export { app, auth, db, WEB_CLIENT_ID };