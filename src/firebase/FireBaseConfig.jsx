// import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// const firebaseConfig = {
//   apiKey: "AIzaSyDlkZe-OI7ozU-h9ggX485DXMVQ5wYxVs4",
//   authDomain: "auth-f77ef.firebaseapp.com",
//   projectId: "auth-f77ef",
//   storageBucket: "auth-f77ef.firebasestorage.app",
//   messagingSenderId: "843368083966",
//   appId: "1:843368083966:web:14868ed623857a8f37d0af"
// };

// const app = initializeApp(firebaseConfig);


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCRsm4Xi-Tgsu_kHO7CuvxOyapj85Z0mSk",
  authDomain: "authexample-75dfb.firebaseapp.com",
  projectId: "authexample-75dfb",
  storageBucket: "authexample-75dfb.firebasestorage.app",
  messagingSenderId: "388368836614",
  appId: "1:388368836614:web:b31e9e414fc556703d7b87",
  measurementId: "G-1YBDJ5ZY53"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);