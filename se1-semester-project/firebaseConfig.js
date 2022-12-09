// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, getAuth } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAreeMFoWlVSFGufnz63bFIvOVyzMdE3PQ",
  authDomain: "klykins-cmsc4373-webapp.firebaseapp.com",
  projectId: "klykins-cmsc4373-webapp",
  storageBucket: "klykins-cmsc4373-webapp.appspot.com",
  messagingSenderId: "602160172217",
  appId: "1:602160172217:web:a81a7b6e7dd200c7965f68"
};

// Initialize Firebase


export function initFirebase() {
    if (typeof window !== undefined) {
        initializeApp(firebaseConfig);
        console.log("Firebase has been init successfully");
    }
}


const app = initializeApp(firebaseConfig);
//export const auth = getAuth(app);
const db = getFirestore(app);