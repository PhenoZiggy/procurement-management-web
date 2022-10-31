import firebase from 'firebase/app';
import 'firebase/firestore';
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.FireBaseApiKey,
  authDomain: 'procurement-management-sliit.firebaseapp.com',
  projectId: 'procurement-management-sliit',
  storageBucket: 'procurement-management-sliit.appspot.com',
  messagingSenderId: '494233429901',
  appId: '1:494233429901:web:bb061f7007a05e1586ffc4',
  measurementId: 'G-7G2WVHD5Z9',
};

// Initialize Firebase

export const FirebaseApp = initializeApp(firebaseConfig);
