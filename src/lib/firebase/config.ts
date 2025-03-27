// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDIbGoj_M5jx7pAk105QdVRVA0fN8WjeZY",
  authDomain: "skillsbridge-aac69.firebaseapp.com",
  projectId: "skillsbridge-aac69",
  storageBucket: "skillsbridge-aac69.firebasestorage.app",
  messagingSenderId: "135476807170",
  appId: "1:135476807170:web:532513cb054f38f88b491b",
  measurementId: "G-8H9RQC3ND6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export default app;
