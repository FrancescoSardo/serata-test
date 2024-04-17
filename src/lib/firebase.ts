// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getAuth } from 'firebase/auth'
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // Correct Firestore import

import { collection, doc, getDoc, getDocs, onSnapshot, or, query, updateDoc } from "firebase/firestore";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCMxyf7idxG9Zh_k7fSvNADLjQxqC4fvEk",
  authDomain: "fuego-wallet.firebaseapp.com",
  databaseURL: "https://fuego-wallet-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "fuego-wallet",
  storageBucket: "fuego-wallet.appspot.com",
  messagingSenderId: "587014099008",
  appId: "1:587014099008:web:e34bcbb9fb928efd318fa5",
  measurementId: "G-5KWF8S1ESE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
/* if (await isSupported()) {
  const analytics = getAnalytics(app);
}
  */
export const firebase_auth = getAuth(app);
export const db = getFirestore(app);



export async function loginWithGoogle() {
  const provider = new GoogleAuthProvider();
  const res = await signInWithPopup(firebase_auth, provider);
  return res.user;
}

export async function loginWithGoogleOrGetUser() {
  const user = firebase_auth.currentUser;
  if (user) {
    return user;
  } else {
    return await loginWithGoogle().then(async (user) => {
      console.log("USERRRR ->>>>>", user.displayName)
      await setUserName(user.displayName)
    });
  }
}
export function log_out() {
  firebase_auth.signOut();
}
export async function setUserName(name: string) {
  const user = firebase_auth.currentUser
  
  if (user) {
    const uid = user.uid
    const documentRef = doc(db, "users", uid);
    let documentSnapshot = await getDoc(documentRef);
    while (!documentSnapshot.exists()) {
      documentSnapshot = await getDoc(documentRef);
    }
    if (documentSnapshot.exists()) {
      await updateDoc(documentSnapshot.ref, {
        nome: name
      });
      console.log("Document data:", documentSnapshot.data());
    }
  } else {
    return Promise.reject("No user logged in") 
  }
}

