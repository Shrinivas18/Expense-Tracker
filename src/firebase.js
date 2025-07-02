import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC0mz_OPaRnkC6L3D6fywt4Y2Fzp3tz6Bc",
  authDomain: "expensetracker-2afae.firebaseapp.com",
  projectId: "expensetracker-2afae",
  storageBucket: "expensetracker-2afae.appspot.com",
  messagingSenderId: "964880452081",
  appId: "1:964880452081:web:baea58662edf35ee1c5c50",
  measurementId: "G-6XBN4P1B7M"
};

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getFirestore(app);

export default db;
