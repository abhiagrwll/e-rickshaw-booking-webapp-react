import React, { useState, useEffect } from 'react';
import { collection, query, onSnapshot, where, deleteDoc, doc } from 'firebase/firestore';
import { db } from './firebase';
import './DriverInterface.css';

const DriverInterface = ({ onAcceptBooking }) => {
  const [aadharNumber, setAadharNumber] = useState('');
  const [rickshawNumber, setRickshawNumber] = useState('');
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleLicenseUpload = (e) => {
    const file = e.target.files[0];
    // Perform any necessary validation or processing with the file
    console.log('Uploaded license:', file);
  };

  const acceptBooking = async (index, id) => {
    // Call the onAcceptBooking function passed from the parent component
    onAcceptBooking(index);

    try {
      // Delete the booking from the Firestore database
      await deleteDoc(doc(db, 'bookings', id));

    } catch (error) {
      console.log('Error deleting booking:', error);
    }
  };

  useEffect(() => {
    // Fetch bookings from Firebase Firestore
    const q = query(collection(db, 'bookings'), where('accepted', '==', false));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = [];
      snapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
      });
      setBookings(data);
      setLoading(false);
    });

    // Cleanup function
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className="driver-interface">
      <h2>Welcome, Driver!</h2>
      {!loading && bookings.length === 0 && (
        <p>No bookings available.</p>
      )}
      <div className="driver-section">
        <h3>Upload Documents</h3>
        <div>
          <label htmlFor="license">Driving License:</label>
          <input type="file" id="license" onChange={handleLicenseUpload} />
        </div>
        <div>
          <label htmlFor="aadhar">Aadhar Number:</label>
          <input
            type="text"
            id="aadhar"
            value={aadharNumber}
            onChange={(e) => setAadharNumber(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="rickshaw">Rickshaw Number:</label>
          <input
            type="text"
            id="rickshaw"
            value={rickshawNumber}
            onChange={(e) => setRickshawNumber(e.target.value)}
          />
        </div>
      </div>
      <div className="driver-section">
        {bookings.length > 0 && (
          <div>
            <h3>Bookings:</h3>
            <ul>
              {bookings.map((booking, index) => (
                <li key={booking.id}>
                  <span>{booking.pickupLocation} - {booking.destination} - {booking.dateTime}</span>
                  {!booking.accepted && (
                    <button onClick={() => acceptBooking(index, booking.id)}>Accept</button>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default DriverInterface;
