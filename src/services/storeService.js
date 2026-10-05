
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

const getStore = async (storeId) => {
  try {
    const res = await fetch(
      `${BASE_URL}/stores/${storeId}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }
    );

    const data = await res.json();

    if (!res.ok) {
      throw new Error(
        data.detail || 'Failed to get store'
      );
    }

    return data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const createStore = async (formData) => {
  try {
    const dataToSend = new FormData();

    dataToSend.append('name', formData.name);
    dataToSend.append('description', formData.description);
    dataToSend.append('phone', formData.phone);
    dataToSend.append('email', formData.email);
    dataToSend.append('address', formData.address);
    dataToSend.append('slug', formData.slug);

    if (formData.logo) {
      dataToSend.append('logo', formData.logo);
    }

    const res = await fetch(`${BASE_URL}/stores`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      body: dataToSend
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

const getPublicStore = async (slug) => {
  try {
    const res = await fetch(
      `${BASE_URL}/public/stores/${slug}`
    );

    const data = await res.json();

    if (!res.ok) {
      throw new Error(
        data.detail || 'Failed to get store'
      );
    }

    return data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export {
  getStores,
  getStore,
  createStore,
  getPublicStore
};

