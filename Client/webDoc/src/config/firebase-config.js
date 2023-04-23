// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAfiI8s0TYlzp9GztjPgQLsEyi1h2Cn6K0",
  authDomain: "web-doc-2d205.firebaseapp.com",
  projectId: "web-doc-2d205",
  storageBucket: "web-doc-2d205.appspot.com",
  messagingSenderId: "830974571752",
  appId: "1:830974571752:web:f414dd9e687e75a404c55d",
  measurementId: "G-KD25RVV4P0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export {app}
export const auth = getAuth(app);