import React, { useState } from 'react';
import './StudentInterface.css';
import { collection, addDoc } from 'firebase/firestore';
import { db } from './firebase';

const StudentInterface = ({ onAddBooking }) => {
  const [pickupLocation, setPickupLocation] = useState('');
  const [destination, setDestination] = useState('');
  const [dateTime, setDateTime] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleBookRickshaw = async (e) => {
    e.preventDefault();
    if (!pickupLocation || !destination || !dateTime) {
      alert('Please fill in all fields.');
      return;
    }
    const currentDate = new Date();
    const selectedDate = new Date(dateTime);
    if (selectedDate < currentDate) {
      alert('Please select a future date and time.');
      return;
    }
    const newBooking = {
      pickupLocation,
      destination,
      dateTime,
      accepted: false,
    };
    try {
      const docRef = await addDoc(collection(db, 'bookings'), newBooking);
      console.log('Booking added with ID: ', docRef.id);
      setPickupLocation('');
      setDestination('');
      setDateTime('');
      setSuccessMessage('Rickshaw booked successfully.');
      onAddBooking(newBooking);
    } catch (error) {
      console.error('Error adding booking: ', error);
    }
  };

  return (
    <div className="student-interface">
      <h2>Welcome, Student!</h2>
      <div className="student-section">
        <h3>Book Rickshaw</h3>
        <form onSubmit={handleBookRickshaw}>
          <div className="form-group">
            <label htmlFor="pickupLocation">Pickup Location:</label>
            <input
              type="text"
              id="pickupLocation"
              value={pickupLocation}
              onChange={(e) => setPickupLocation(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="destination">Destination:</label>
            <input
              type="text"
              id="destination"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="dateTime">Date and Time:</label>
            <input
              type="datetime-local"
              id="dateTime"
              value={dateTime}
              onChange={(e) => setDateTime(e.target.value)}
              min={new Date().toISOString().slice(0, 16)}
            />
          </div>
          <button type="submit">Book Rickshaw</button>
        </form>
        {successMessage && <p className="success-message">{successMessage}</p>}
      </div>
    </div>
  );
};

export default StudentInterface;
