
const BASE_URL = import.meta.env.VITE_BACK_END_SERVER_URL;

const getStoreProducts = async (storeId) => {
  try {
    const res = await fetch(
      `${BASE_URL}/stores/${storeId}/products`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }
    );

    const data = await res.json();

    if (!res.ok) {
      throw new Error(
        data.detail || 'Failed to get products'
      );
    }

    return data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const createProduct = async (storeId, formData) => {
  try {
    const dataToSend = new FormData();

    dataToSend.append('name', formData.name);
    dataToSend.append('description', formData.description);
    dataToSend.append('price', formData.price);

    if (formData.image) {
      dataToSend.append('image', formData.image);
    }

    const res = await fetch(
      `${BASE_URL}/stores/${storeId}/products`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: dataToSend
      }
    );

    const data = await res.json();

    if (!res.ok) {
      throw new Error(
        data.detail || 'Failed to create product'
      );
    }

    return data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const getProduct = async (productId) => {
  try {
    const res = await fetch(
      `${BASE_URL}/products/${productId}`
    );

    const data = await res.json();

    if (!res.ok) {
      throw new Error(
        data.detail || 'Failed to get product'
      );
    }

    return data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const updateProduct = async (productId, formData) => {
  try {
    const dataToSend = new FormData();

    dataToSend.append('name', formData.name);
    dataToSend.append('description', formData.description);
    dataToSend.append('price', formData.price);

    if (formData.image) {
      dataToSend.append('image', formData.image);
    }

    const res = await fetch(
      `${BASE_URL}/products/${productId}`,
      {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: dataToSend
      }
    );

    const data = await res.json();

    if (!res.ok) {
      throw new Error(
        data.detail || 'Failed to update product'
      );
    }

    return data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const deleteProduct = async (productId) => {
  try {
    const res = await fetch(
      `${BASE_URL}/products/${productId}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }
    );

    if (!res.ok) {
      const data = await res.json();

      throw new Error(
        data.detail || 'Failed to delete product'
      );
    }

    return true;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export {
  getStoreProducts,
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct
};
