import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyDqdH71sKMQGU8qHsVKeTq3z2Dqa3Ld09Y",
    authDomain: "event-management-applica-419a2.firebaseapp.com",
    projectId: "event-management-applica-419a2",
    storageBucket: "event-management-applica-419a2.appspot.com",
    messagingSenderId: "747547005761",
    appId: "1:747547005761:web:5432ca64f6079e8af2c7c0"
};
// Initialize Firebase and Firestore
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
export { db }