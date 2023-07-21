// server.js

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

let registeredCompany = null;

app.post('/train/register', (req, res) => {
  const { companyName, ownerName, rollNo, ownerEmail, accessCode } = req.body;

  if (registeredCompany) {
    return res.status(409).json({ error: 'Company is already registered. Cannot register again.' });
  }

  // Replace 'FKDLjg' with the correct access code provided by the John Doe Railway Server
  if (accessCode !== 'oJnNPG') {
    return res.status(401).json({ error: 'Invalid access code. Registration not allowed.' });
  }

  registeredCompany = {
    companyName,
    ownerName,
    rollNo,
    ownerEmail,
    accessCode,
  };

  return res.status(200).json({ message: 'Company registered successfully!' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
