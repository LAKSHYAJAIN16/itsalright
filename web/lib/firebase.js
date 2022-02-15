import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDLlpqRWjsd8WkBq9Y-A-tlQfIXwE_Wh60",
  authDomain: "itsalright-e6062.firebaseapp.com",
  projectId: "itsalright-e6062",
  storageBucket: "itsalright-e6062.appspot.com",
  messagingSenderId: "451606941252",
  appId: "1:451606941252:web:fae20fb51769229e683611",
  measurementId: "G-4421CQ6M2N",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const fauth = getAuth(app);
