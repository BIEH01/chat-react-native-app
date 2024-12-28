// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
// Your web app's Firebase configuration
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore, collection } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase/app";
import "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyA1bpO3q9DzOLL_Qkv3XrFOCNa0eExxWVQ",
  authDomain: "mercadosapp-0107n.firebaseapp.com",
  projectId: "mercadosapp-0107n",
  storageBucket: "mercadosapp-0107n.appspot.com",
  messagingSenderId: "228986231933",
  appId: "1:228986231933:web:48ab420817c782fb816514",
  measurementId: "G-3DTJ3Q4H1D",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

async function initializeAnalytics() {
  const analyticsSupported = await isSupported();
  if (analyticsSupported) {
    const analytics = getAnalytics(app);
    console.log("Firebase Analytics initialized");
  } else {
    console.log("Firebase Analytics is not supported in this environment");
  }
}

initializeAnalytics();

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export const db = getFirestore(app);
export const storage = getStorage(app);

export const usersRef = collection(db, "users");
export const roomRef = collection(db, "rooms");
