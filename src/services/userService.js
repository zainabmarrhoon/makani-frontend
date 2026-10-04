const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/auth`;

const currentUser = async () => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    };

    const res = await fetch(`${BASE_URL}/current_user`, config);

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.detail || 'Failed to get current user');
    }

    return data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export {
  currentUser
};