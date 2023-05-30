import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  // Your Firebase configuration
  apiKey: "AIzaSyBJAv3sIxUFtfHgeUokczwOu-4nPcTyV4A",
  authDomain: "third-app-24bb5.firebaseapp.com",
  projectId: "third-app-24bb5",
  storageBucket: "third-app-24bb5.appspot.com",
  messagingSenderId: "1035420711794",
  appId: "1:1035420711794:web:2a3149a80cd2ac83befbeb",
  measurementId: "G-GTMS80X72S"
  // ...
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Get Firestore instance
const db = getFirestore(app);

export { db };