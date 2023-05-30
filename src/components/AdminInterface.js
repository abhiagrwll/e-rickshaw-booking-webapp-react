import React, { useState } from 'react';
import './AdminInterface.css';
import { collection, addDoc } from 'firebase/firestore';
import { db } from './firebase';

const AdminInterface = ({ onAddBooking }) => {
  const [drivers, setDrivers] = useState([]);
  const [driverName, setDriverName] = useState('');
  const [driverContact, setDriverContact] = useState('');
  const [pickupLocation, setPickupLocation] = useState('');
  const [destination, setDestination] = useState('');
  const [dateTime, setDateTime] = useState('');
  const [section, setSection] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleAddDriver = (e) => {
    e.preventDefault();
    if (!driverName || !driverContact) {
      alert('Please fill in all fields.');
      return;
    }
    const newDriver = {
      name: driverName,
      contact: driverContact,
    };
    setDrivers([...drivers, newDriver]);
    setDriverName('');
    setDriverContact('');
    setSuccessMessage('Driver added successfully.');
  };

  const handleBookRickshaw = async (e) => {
    e.preventDefault();
    if (!pickupLocation || !destination || !dateTime) {
      alert('Please fill in all fields.');
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
  

  const handleSectionClose = () => {
    setSuccessMessage('');
  };

  return (
    <div className="admin-interface">
      <h2>Welcome, Admin!</h2>
      <div className="admin-section">
        <button onClick={() => setSection(section === 'addDriver' ? '' : 'addDriver')}>
          {section === 'addDriver' ? 'Close Add Driver' : 'Add Driver Details'}
        </button>
        {section === 'addDriver' && (
          <div>
            <h3>Add Driver Details</h3>
            <form onSubmit={handleAddDriver}>
              <div className="form-group">
                <label htmlFor="driverName">Driver Name:</label>
                <input
                  type="text"
                  id="driverName"
                  value={driverName}
                  onChange={(e) => setDriverName(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="driverContact">Driver Contact:</label>
                <input
                  type="text"
                  id="driverContact"
                  value={driverContact}
                  onChange={(e) => setDriverContact(e.target.value)}
                />
              </div>
              <button type="submit">Add Driver</button>
            </form>
            {successMessage && (
              <div className="success-message">
                <p>{successMessage}</p>
                <button onClick={handleSectionClose}>Close</button>
              </div>
            )}
          </div>
        )}
      </div>
      <div className="admin-section">
        <button onClick={() => setSection(section === 'viewDrivers' ? '' : 'viewDrivers')}>
          {section === 'viewDrivers' ? 'Close View Drivers' : 'View Driver Details'}
        </button>
        {section === 'viewDrivers' && (
          <div>
            <h3>Driver Details</h3>
            {drivers.length > 0 ? (
              <ul>
                {drivers.map((driver, index) => (
                  <li key={index}>
                    <span>{driver.name} - {driver.contact}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No drivers available.</p>
            )}
          </div>
        )}
      </div>
      <div className="admin-section">
        <button onClick={() => setSection(section === 'bookRickshaw' ? '' : 'bookRickshaw')}>
          {section === 'bookRickshaw' ? 'Close Book Rickshaw' : 'Book Rickshaw'}
        </button>
        {section === 'bookRickshaw' && (
          <div>
            <h3>Book Rickshaw:</h3>
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
                />
              </div>
              <button type="submit">Book Rickshaw</button>
            </form>
            {successMessage && (
              <div className="success-message">
                <p>{successMessage}</p>
                <button onClick={handleSectionClose}>Close</button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminInterface;
