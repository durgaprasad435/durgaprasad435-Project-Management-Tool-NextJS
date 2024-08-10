// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBFZNcvlIZqz_i_kec5zdGM0xeqt5sLwX8",
  authDomain: "dashboard-a1fb6.firebaseapp.com",
  projectId: "dashboard-a1fb6",
  storageBucket: "dashboard-a1fb6.appspot.com",
  messagingSenderId: "466895635521",
  appId: "1:466895635521:web:199d7fb02c791058c832c0",
  measurementId: "G-VN3VMB4QX7",
};

let firebase_app;
let analytics;
let db;
if (typeof window != undefined) {
  firebase_app = initializeApp(firebaseConfig);
  analytics = isSupported().then((yes) =>
    yes ? getAnalytics(firebase_app) : null
  );
  db = getFirestore(firebase_app);
}
export { db, firebase_app };
