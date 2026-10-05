import { parseToken, registerToken } from '../lib/helpers/jwt-helpers';

const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/auth`;

const signUp = async (formData) => {
  try {
    const res = await fetch(`${BASE_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });

    const text = await res.text();

    console.log('SIGN UP STATUS:', res.status);
    console.log('SIGN UP RESPONSE:', text);

    let data = {};

    if (text) {
      try {
        data = JSON.parse(text);
      } catch (err) {
        throw new Error(`Server returned invalid response: ${text}`);
      }
    }

    if (!res.ok) {
      throw new Error(data.detail || `Sign up failed (${res.status})`);
    }

    if (data.token) {
      registerToken(data.token);
      return parseToken(data.token);
    }

    throw new Error('Invalid response from server');
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const signIn = async (formData) => {
  try {
    const res = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.detail || 'Sign in failed');
    }

    if (data.token) {
      registerToken(data.token);
      return parseToken(data.token);
    }

    throw new Error('Invalid response from server');
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export { signUp, signIn };