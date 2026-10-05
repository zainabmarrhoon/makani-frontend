const BASE_URL = import.meta.env.VITE_BACK_END_SERVER_URL;

const getStoreOrders = async (storeId) => {
  try {
    const res = await fetch(`${BASE_URL}/stores/${storeId}/orders`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.detail || 'Failed to get store orders');
    }

    return data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const getOrder = async (orderId) => {
  try {
    const res = await fetch(`${BASE_URL}/orders/${orderId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.detail || 'Failed to get order');
    }

    return data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const createOrder = async (storeId, formData) => {
  try {
    const res = await fetch(`${BASE_URL}/stores/${storeId}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.detail || 'Failed to create order');
    }

    return data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const updateOrderStatus = async (orderId, status) => {
  try {
    const res = await fetch(`${BASE_URL}/orders/${orderId}/status`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        status
      })
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.detail || 'Failed to update order status');
    }

    return data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export {
  getStoreOrders,
  getOrder,
  createOrder,
  updateOrderStatus
};