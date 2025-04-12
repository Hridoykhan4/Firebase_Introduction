// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// Do not share config on public
const firebaseConfig = {
  apiKey: "AIzaSyAzr7YC1sWd1OaZWoAsEaRkGN2mKc7JQQs",
  authDomain: "email-password-auth-module-2.firebaseapp.com",
  projectId: "email-password-auth-module-2",
  storageBucket: "email-password-auth-module-2.firebasestorage.app",
  messagingSenderId: "395520131640",
  appId: "1:395520131640:web:92f98d530a569a530edccd",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
