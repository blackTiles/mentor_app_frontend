import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDIbGoj_M5jx7pAk105QdVRVA0fN8WjeZY",
  authDomain: "skillsbridge-aac69.firebaseapp.com",
  projectId: "skillsbridge-aac69",
  storageBucket: "skillsbridge-aac69.firebasestorage.app",
  messagingSenderId: "135476807170",
  appId: "1:135476807170:web:532513cb054f38f88b491b",
  measurementId: "G-8H9RQC3ND6",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export default app;
