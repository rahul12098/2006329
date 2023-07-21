// src/components/registerCompany.js

import axios from 'axios';

const BASE_URL = 'http://20.244.56.144/train'; // Update with the correct base URL

export const registerCompany = async (companyData) => {
  try {
    const response = await axios.post(`${BASE_URL}/register`, companyData);
    return response.data;
  } catch (error) {
    console.error('Error registering company:', error);
    throw error;
  }
};
