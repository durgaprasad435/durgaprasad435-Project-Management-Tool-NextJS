// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics, isSupported } from "firebase/analytics";
// import { getFirestore } from "@firebase/firestore";

// const firebaseConfig = {
//   apiKey: process.env.NEXT_PUBLIC_API_KEY,
//   authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
//   projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
//   storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
//   messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
//   appId: process.env.NEXT_PUBLIC_APP_ID,
//   measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
// };

// let firebase_app;
// let analytics;
// let db;
// if (typeof window != undefined) {
//   firebase_app = initializeApp(firebaseConfig);
//   analytics = isSupported().then((yes) =>
//     yes ? getAnalytics(firebase_app) : null
//   );
//   db = getFirestore(firebase_app);
// }
// export { db, firebase_app };

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

// Initialize Firebase
const firebase_app = initializeApp(firebaseConfig);
if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) {
      const analytics = getAnalytics(firebase_app);
    } else {
      console.log("Firebase Analytics is not supported in this environment.");
    }
  });
}
const db = getFirestore(firebase_app);
export { db, firebase_app };
