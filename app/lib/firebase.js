// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCIGcEBsK8gwf-R6CnMSFpJgZB_x5IhWbg',
  authDomain: 'personal-portfolio-585b2.firebaseapp.com',
  projectId: 'personal-portfolio-585b2',
  storageBucket: 'personal-portfolio-585b2.firebasestorage.app',
  messagingSenderId: '1025341263547',
  appId: '1:1025341263547:web:cfe27f1db36a673b32e39e',
  measurementId: 'G-KP3DW1GV4T',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Analytics only in browser environment
let analytics = null;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}

const db = getFirestore(app);

export { db, analytics };
