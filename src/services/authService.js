import { parseToken, registerToken } from '../lib/helpers/jwt-helpers';

const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/auth`;

const getResponseData = async (res) => {
  const text = await res.text();

  if (!text) {
    return {};
  }

  try {
    return JSON.parse(text);
  } catch {
    return {
      detail: text
    };
  }
};

const signUp = async (formData) => {
  try {
    const res = await fetch(`${BASE_URL}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });

    const data = await getResponseData(res);

    if (!res.ok) {
      throw new Error(
        data.detail ||
        data.message ||
        `Sign up failed (${res.status})`
      );
    }

    if (data.token) {
      registerToken(data.token);
      return parseToken(data.token);
    }

    return data;
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

    const data = await getResponseData(res);

    if (!res.ok) {
      throw new Error(
        data.detail ||
        data.message ||
        `Sign in failed (${res.status})`
      );
    }

    if (data.token) {
      registerToken(data.token);
      return parseToken(data.token);
    }

    return data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export { signUp, signIn };