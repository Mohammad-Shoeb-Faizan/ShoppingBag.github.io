import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDtwojAQu49ffVc_NJR0cY2pqHYUNLG4nQ",
  authDomain: "shopping-bag-c8812.firebaseapp.com",
  projectId: "shopping-bag-c8812",
  storageBucket: "shopping-bag-c8812.appspot.com",
  messagingSenderId: "542436203724",
  appId: "1:542436203724:web:665a8c4af5442b4f19f669",
  measurementId: "G-E091T2Y9VK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);


export { app, analytics, auth, db };