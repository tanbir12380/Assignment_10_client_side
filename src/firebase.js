// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDDcDz6dkwwoCvBRRjW8CN4hgRcRhEzfvU",
  authDomain: "auth-context-provider-auth.firebaseapp.com",
  projectId: "auth-context-provider-auth",
  storageBucket: "auth-context-provider-auth.firebasestorage.app",
  messagingSenderId: "677463347284",
  appId: "1:677463347284:web:2cf0f9e33994c578b49dc1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
