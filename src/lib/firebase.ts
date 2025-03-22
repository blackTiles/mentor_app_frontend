// /lib/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCoF4DHC5sT5Hfr924zKHuqoAa5dUQHxbA",
    authDomain: "bio-project-d45dd.firebaseapp.com",
    projectId: "bio-project-d45dd",
    storageBucket: "bio-project-d45dd.firebasestorage.app",
    messagingSenderId: "739902322350",
    appId: "1:739902322350:web:214760c79e6e66afb25f3f",
    measurementId: "G-EZ288Y3K46"
  };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
