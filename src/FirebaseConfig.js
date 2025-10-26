// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBn_mDFg5kPSf2Frk4lYhpvaWQQczBrEPY",
  authDomain: "iot-ambiental-35f77.firebaseapp.com",
  projectId: "iot-ambiental-35f77",
  storageBucket: "iot-ambiental-35f77.appspot.com", // ✅ CORREGIDO
  messagingSenderId: "745399243091",
  appId: "1:745399243091:web:efd4d4a9e613308af591a6",
  measurementId: "G-YPNT140SCV",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;

