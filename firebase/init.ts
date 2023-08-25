import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { GoogleAuthProvider } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyDNkL1_e0uwdVtgDxk1G0AvAOK1ceiNWro",
  authDomain: "isound-2d15a.firebaseapp.com",
  projectId: "isound-2d15a",
  storageBucket: "isound-2d15a.appspot.com",
  messagingSenderId: "689298462509",
  appId: "1:689298462509:web:54ebe87383c749b9b565a4",
  measurementId: "G-G2CLB9QX7Q"
}


export const app = initializeApp(firebaseConfig)
export const googleProvider = new GoogleAuthProvider()
export const auth = getAuth(app)
export const store = getFirestore(app)
