import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import AdminInterface from './components/AdminInterface';
import DriverInterface from './components/DriverInterface';
import StudentInterface from './components/StudentInterface';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBJAv3sIxUFtfHgeUokczwOu-4nPcTyV4A",
  authDomain: "third-app-24bb5.firebaseapp.com",
  projectId: "third-app-24bb5",
  storageBucket: "third-app-24bb5.appspot.com",
  messagingSenderId: "1035420711794",
  appId: "1:1035420711794:web:2a3149a80cd2ac83befbeb",
  measurementId: "G-GTMS80X72S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const App = () => {
  const [user, setUser] = useState(null);
  const [booking, setBooking] = useState([]);

  const handleLogin = (role) => {
    setUser({ role });
  };

  const handleAddBooking = (newBooking) => {
    setBooking(newBooking);
    try {
      // Store the new booking in Firebase Firestore
      db.collection('bookings').add(newBooking);
    } catch (error) {
      console.log('Error adding booking:', error);
    }
  };

  const handleAcceptBooking = (index) => {
    const updatedBookings = [...booking];
    if (!updatedBookings || index < 0 || index >= updatedBookings.length) {
      console.log('Error: Invalid booking index.');
      return;
    }

    const bookingToUpdate = updatedBookings[index];
    const updatedBooking = { ...bookingToUpdate, accepted: true };
    updatedBookings[index] = updatedBooking;
    setBooking(updatedBookings);
  };

  if (!user) {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login handleLogin={handleLogin} />} />
        </Routes>
      </Router>
    );
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to={`/${user.role}`} />} />
        <Route
          path="/admin"
          element={<AdminInterface onAddBooking={handleAddBooking} />}
        />
        <Route
          path="/driver"  
          element={<DriverInterface onAcceptBooking={handleAcceptBooking} />}
        />
        <Route
          path="/student"
          element={<StudentInterface onAddBooking={handleAcceptBooking} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
