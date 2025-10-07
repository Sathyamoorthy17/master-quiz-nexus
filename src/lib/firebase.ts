import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyAySpZQOVTxy-hQZk0naGN3dguNoowR6lw",
  authDomain: "quiz-app-1772a.firebaseapp.com",
  projectId: "quiz-app-1772a",
  storageBucket: "quiz-app-1772a.firebasestorage.app",
  messagingSenderId: "609890654795",
  appId: "1:609890654795:web:1d226474a3cc4c62854bce",
  measurementId: "G-PRYM8EEDH7"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
