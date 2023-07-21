// src/App.js

import React, { useState } from 'react';
import { registerCompany } from './components/registerCompany';

const App = () => {
  const [registrationStatus, setRegistrationStatus] = useState('');

  const handleRegisterCompany = async () => {
    try {
      const companyData = {
        companyName: 'Train Central',
        ownerName: 'Rahul Mahapatra',
        rollNo: '2006329',
        ownerEmail: '2006329@kiit.ac.in',
        accessCode: 'oJnNPG', 
      };

      await registerCompany(companyData);

      setRegistrationStatus('Company registered successfully!');
    } catch (error) {
      console.error('Error registering company:', error);
      setRegistrationStatus('Error registering company. Please try again later.');
    }
  };

  return (
    <div>
      <h1>Welcome to the John Doe Railway</h1>
      <button onClick={handleRegisterCompany}>Register Company</button>
      {registrationStatus && <p>{registrationStatus}</p>}
    </div>
  );
};

export default App;
