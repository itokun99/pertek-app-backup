// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyAYBhEMXuDAG-vN-pPa4AtVStlzMYGLBBo",
  authDomain: "propertek-v2.firebaseapp.com",
  projectId: "propertek-v2",
  storageBucket: "propertek-v2.appspot.com",
  messagingSenderId: "75322054028",
  appId: "1:75322054028:web:d16e6c40ae54fe7af3b2a9",
  measurementId: "G-T7F6VMLQ15",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
