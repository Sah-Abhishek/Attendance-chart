import React, { useState } from 'react';
import axios from 'axios';
import AttendanceChart from './Graph';

const SimpleForm = () => {
  const [userName, setUsername] = useState('');
  const [dates, setDates] = useState([]);
  const [percentages, setPercentages] = useState([]);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/api/attendance', {
        userName,
        password,
      });
      setDates(response.data.dates);
      setPercentages(response.data.percentages);
      console.log(dates);
      

      setSuccess('Login successful!');
      setError('');
      console.log('Response Data:', response.data);
    } catch (error) {
      setError('Failed to submit: ' + error.response?.data?.message || error.message);
      setSuccess('');
    }
  };

  return (
    <>
    <form  style={{ display: 'flex', flexDirection: 'column', maxWidth: '300px', margin: '0 auto' }}>
      <div>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={userName}
          onChange={(e) => setUsername(e.target.value)}
          required
          style={{ margin: '10px 0', padding: '8px' }}
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ margin: '10px 0', padding: '8px' }}
        />
      </div>
      <button onClick={handleSubmit} type="submit" style={{ padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px' }}>
        Submit
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
      {/* <p>{dates}{percentages}</p> */}
    </form>
    <br />
    <br />

    <AttendanceChart dates={dates} percentages={percentages}/>
    </>
  );
};

export default SimpleForm;
