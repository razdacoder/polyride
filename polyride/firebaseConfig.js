// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA43-2jzp7QzhkRIJ2iMvD06RXgAWbupis",
  authDomain: "polyride-f3484.firebaseapp.com",
  projectId: "polyride-f3484",
  storageBucket: "polyride-f3484.appspot.com",
  messagingSenderId: "183397970388",
  appId: "1:183397970388:web:c3637db85eac45bf982641",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
