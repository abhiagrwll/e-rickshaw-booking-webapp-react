import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = ({ handleLogin }) => {
  const [role, setRole] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(role);
    navigate(`/${role}`);
  };

  return (
    <div className='login-container'>
      <h1>Namaste</h1>
    <div className='login-form'>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Role:
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="">Select Role</option>
              <option value="admin">Admin</option>
              <option value="driver">Driver</option>
              <option value="student">Student</option>
            </select>
          </label>
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
    </div>
  );
};

export default Login;
