import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore} from "firebase/firestore"
import {getStorage} from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDWk7eUV5U-fYnqZfLdMsMKfZx63rGNBf8",
    authDomain: "dashboard-8940e.firebaseapp.com",
    projectId: "dashboard-8940e",
    storageBucket: "dashboard-8940e.appspot.com",
    messagingSenderId: "222165477016",
    appId: "1:222165477016:web:32a77db72dc84652fc92ed"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();
export const storage = getStorage(app);
