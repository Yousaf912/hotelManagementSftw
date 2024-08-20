
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from 'firebase/database';
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAAeAn0Bp-ZFLQwePW933NE-OzzRsjLIGU",
  authDomain: "reacthakathon.firebaseapp.com",
  projectId: "reacthakathon",
  storageBucket: "reacthakathon.appspot.com",
  messagingSenderId: "374324694281",
  appId: "1:374324694281:web:5b2fa4f10cdd64551e17d8",
  measurementId: "G-H12B2GXK0J"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getDatabase(app);
export const storage = getStorage(app);