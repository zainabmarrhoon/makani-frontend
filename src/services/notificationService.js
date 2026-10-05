const BASE_URL = import.meta.env.VITE_BACK_END_SERVER_URL;

const getStoreNotifications = async (storeId) => {
  try {
    const res = await fetch(
      `${BASE_URL}/stores/${storeId}/notifications`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }
    );

    const data = await res.json();

    if (!res.ok) {
      throw new Error(
        data.detail || 'Failed to get notifications'
      );
    }

    return data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const markNotificationAsRead = async (notificationId) => {
  try {
    const res = await fetch(
      `${BASE_URL}/notifications/${notificationId}/read`,
      {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }
    );

    const data = await res.json();

    if (!res.ok) {
      throw new Error(
        data.detail || 'Failed to mark notification as read'
      );
    }

    return data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export {
  getStoreNotifications,
  markNotificationAsRead
};