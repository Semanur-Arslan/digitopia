import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


export const login = createAsyncThunk('auth/login', async (credentials) => {
  try {
    const response = await axios.post('https://dev.digitopia.co/api/a2/signIn', credentials, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Giriş başarısız');
  }
});
