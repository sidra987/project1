import React, { useState } from 'react';

const App = () => {
  const [form, setForm] = useState({ username: '', password: '' });
  const [users, setUsers] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState('');
  const [page, setPage] = useState('home');
  const [showRegister, setShowRegister] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [bookingForm, setBookingForm] = useState({ room: '', date: '' });
  const [editingIndex, setEditingIndex] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleBookingChange = (e) => {
    setBookingForm({ ...bookingForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { username, password } = form;
    const foundUser = users.find(user => user.username === username && user.password === password);
    if (foundUser || (username === 'admin' && password === '1234')) {
      setIsLoggedIn(true);
      setError('');
    } else {
      setError('Invalid username or password');
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const { username, password } = form;
    if (users.find(user => user.username === username)) {
      setError('Username already exists');
    } else {
      setUsers([...users, { username, password }]);
      setForm({ username: '', password: '' });
      setShowRegister(false);
      setError('');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setForm({ username: '', password: '' });
  };

  const handleAddBooking = (e) => {
    e.preventDefault();
    if (bookingForm.room && bookingForm.date) {
      if (editingIndex !== null) {
        const updatedBookings = [...bookings];
        updatedBookings[editingIndex] = bookingForm;
        setBookings(updatedBookings);
        setEditingIndex(null);
      } else {
        setBookings([...bookings, bookingForm]);
      }
      setBookingForm({ room: '', date: '' });
    }
  };

  const handleEditBooking = (index) => {
    setBookingForm(bookings[index]);
    setEditingIndex(index);
  };

  const handleDeleteBooking = (index) => {
    const updated = bookings.filter((_, i) => i !== index);
    setBookings(updated);
    if (editingIndex === index) {
      setBookingForm({ room: '', date: '' });
      setEditingIndex(null);
    }
  };

  const renderPageContent = () => {
    if (page === 'about') return <p style={{ marginTop: '20px' }}>We are the best in hotel booking services!</p>;
    if (page === 'contact') return <p style={{ marginTop: '20px' }}>Contact us at support@hotelbooker.com</p>;
    return null;
  };

  return (
    <div style={{ fontFamily: 'Arial', background: '#f8fafc', minHeight: '100vh', padding: '20px' }}>
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#1d4ed8', padding: '1rem', color: 'white' }}>
        <h1>Hotel Login</h1>
        <div>
          <button onClick={() => setPage('home')} style={navBtnStyle}>Home</button>
          <button onClick={() => setPage('about')} style={navBtnStyle}>About</button>
          <button onClick={() => setPage('contact')} style={navBtnStyle}>Contact Us</button>
        </div>
      </nav>

      <div style={{ background: 'white', padding: '2rem', borderRadius: '10px', boxShadow: '0 0 10px rgba(0,0,0,0.1)', maxWidth: '400px', margin: '40px auto', textAlign: 'center' }}>
        {isLoggedIn ? (
          <>
            <h2 style={{ color: '#16a34a' }}>Welcome, {form.username}!</h2>
            <button onClick={handleLogout} style={logoutBtnStyle}>Logout</button>
            <hr style={{ margin: '20px 0' }} />
            <h3>{editingIndex !== null ? 'Update Booking' : 'Book a Room'}</h3>
            <form onSubmit={handleAddBooking}>
              <input
                name="room"
                placeholder="Room Number"
                value={bookingForm.room}
                onChange={handleBookingChange}
                style={inputStyle}
              />
              <input
                name="date"
                type="date"
                value={bookingForm.date}
                onChange={handleBookingChange}
                style={inputStyle}
              />
              <button type="submit" style={loginBtnStyle}>{editingIndex !== null ? 'Update' : 'Add Booking'}</button>
            </form>
            <ul style={{ textAlign: 'left', marginTop: '20px' }}>
              {bookings.map((b, i) => (
                <li key={i}>
                  Room: {b.room}, Date: {b.date}
                  <button onClick={() => handleEditBooking(i)} style={{ ...loginBtnStyle, padding: '4px 10px', marginLeft: '10px' }}>Edit</button>
                  <button onClick={() => handleDeleteBooking(i)} style={{ ...logoutBtnStyle, padding: '4px 10px', marginLeft: '10px' }}>Delete</button>
                </li>
              ))}
            </ul>
          </>
        ) : showRegister ? (
          <>
            <h2 style={{ color: '#1d4ed8' }}>Register</h2>
            <form onSubmit={handleRegister}>
              <input name="username" placeholder="Username" value={form.username} onChange={handleChange} style={inputStyle} />
              <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} style={inputStyle} />
              <button type="submit" style={loginBtnStyle}>Register</button>
            </form>
            <p style={{ marginTop: '10px' }}>Already have an account? <button onClick={() => { setShowRegister(false); setError(''); }} style={linkBtnStyle}>Login</button></p>
            {error && <p style={{ color: 'red' }}>{error}</p>}
          </>
        ) : (
          <>
            <h2 style={{ color: '#1d4ed8' }}>Login</h2>
            <form onSubmit={handleSubmit}>
              <input name="username" placeholder="Username" value={form.username} onChange={handleChange} style={inputStyle} />
              <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} style={inputStyle} />
              <button type="submit" style={loginBtnStyle}>Login</button>
            </form>
            <p style={{ marginTop: '10px' }}>Don't have an account? <button onClick={() => { setShowRegister(true); setError(''); }} style={linkBtnStyle}>Register</button></p>
            <p><button onClick={() => alert('Password reset link sent!')} style={linkBtnStyle}>Forgot Password?</button></p>
            {error && <p style={{ color: 'red' }}>{error}</p>}
          </>
        )}
        {renderPageContent()}
      </div>
    </div>
  );
};

const navBtnStyle = {
  marginLeft: '10px',
  background: 'white',
  color: '#1d4ed8',
  border: 'none',
  padding: '8px 12px',
  borderRadius: '5px',
  cursor: 'pointer'
};

const inputStyle = {
  margin: '10px 0',
  padding: '10px',
  width: '100%',
  border: '1px solid #ccc',
  borderRadius: '5px'
};

const loginBtnStyle = {
  background: '#2563eb',
  color: 'white',
  padding: '10px 20px',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  marginTop: '10px'
};

const logoutBtnStyle = {
  background: '#ef4444',
  color: 'white',
  padding: '10px 20px',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  marginTop: '10px'
};

const linkBtnStyle = {
  background: 'none',
  border: 'none',
  color: '#1d4ed8',
  cursor: 'pointer',
  textDecoration: 'underline'
};

export default App;
