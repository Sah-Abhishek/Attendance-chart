import React, { useState } from 'react';
import axios from 'axios';
import AttendanceChart from './Graph';
// require('dotenv').config();


const SimpleForm = () => {
  const [userName, setUsername] = useState('');
  const [dates, setDates] = useState([]);
  const [percentages, setPercentages] = useState([]);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false); // Loader State
  const [avgPercentages, setAvgPercentages] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true); // Start Loading

    try {
      setSuccess('');
      const response = await axios.post('http://localhost:4000/api/attendance', {
        userName,
        password,
      });
      setDates(response.data.dates);
      setPercentages(response.data.percentages);
      setAvgPercentages(response.data.avgPercentages);
      console.log(dates);
      

      setSuccess('Fetching Succesfull!');
      setError('');
      console.log('Response Data:', response.data);
    } catch (error) {
      setError('Failed to submit: ' + error.response?.data?.message || error.message);
      setSuccess('');
    }finally{
      setLoading(false);
    }
  };

  return (
    <>
    <form  style={{ display: 'flex', flexDirection: 'column', maxWidth: '300px', margin: '0 auto' }}>
      <div>
        <label htmlFor="username" className='hidden'>Username:</label>
        <input
          type="text"
          id="username"
          placeholder='Username'
          className='bg-gray-200 border rounded-lg text-gray-600 font-extrabold pr-4 focus:outline-none'
          value={userName}
          onChange={(e) => setUsername(e.target.value)}
          required
          style={{ margin: '10px 0', padding: '8px' }}
        />
      </div>
      <div>
        <label htmlFor="password" className='hidden' >Password:</label>
        <input
          type="text"
          id="password"
          placeholder='Password'
          className='bg-gray-200 border rounded-lg text-gray-600 font-extrabold px-3 focus:outline-none'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ margin: '10px 0', padding: '8px' }}
        />
      </div>
      <button onClick={handleSubmit} type="submit" className='bg-blue-500 py-2 mt-5 text-white border font-extrabold rounded-lg hover:bg-blue-400'>
        Submit
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
      {/* <p>{dates}{percentages}</p> */}
    </form>
    <br />
    <br />
    {loading && <p style={{ color: 'blue' }}>Fetching...</p>}
    

    <AttendanceChart dates={dates} percentages={percentages} avgPercentages={avgPercentages}/>
    </>
  );
};

export default SimpleForm;
