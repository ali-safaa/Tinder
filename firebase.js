import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyAsuqFV8okdXA45L6GJT31eFikL6nobATU",
  authDomain: "tinder-clone-d9f10.firebaseapp.com",
  projectId: "tinder-clone-d9f10",
  storageBucket: "tinder-clone-d9f10.appspot.com",
  messagingSenderId: "983119372709",
  appId: "1:983119372709:web:dc257787c941788dde884c",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

export { auth, db };
