
const BASE_URL = import.meta.env.VITE_BACK_END_SERVER_URL;

const getStores = async () => {
  try {
    const res = await fetch(`${BASE_URL}/stores`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.detail || 'Failed to get stores');
    }

    return data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const createStore = async (formData) => {
  try {
    const res = await fetch(`${BASE_URL}/stores`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(formData)
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.detail || 'Failed to create store');
    }

    return data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export {
  getStores,
  createStore
};