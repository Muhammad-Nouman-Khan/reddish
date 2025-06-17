import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyAwKIlmjpWGwSVxj-DDahiTyiz0UQWAe8U",
  authDomain: "talkhire-1abf3.firebaseapp.com",
  projectId: "talkhire-1abf3",
  storageBucket: "talkhire-1abf3.firebasestorage.app",
  messagingSenderId: "942170505557",
  appId: "1:942170505557:web:977624d3b637485e7cefdc",
  measurementId: "G-DET1F68T40",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);
