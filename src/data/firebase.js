// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAf_IPU-dmiZj-9HUBDPXm8ZuG3kqSrKI0",
  authDomain: "trackmateui.firebaseapp.com",
  projectId: "trackmateui",
  storageBucket: "trackmateui.firebasestorage.app",
  messagingSenderId: "564651183548",
  appId: "1:564651183548:web:f36a3365b181b15de82fb9",
  measurementId: "G-BPZJXEV8NY"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
