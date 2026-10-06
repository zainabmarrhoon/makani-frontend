import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import {
  getStoreNotifications,
  markNotificationAsRead
} from '../../services/notificationService';
import { getStores } from '../../services/storeService';

const Notifications = () => {
  const navigate = useNavigate();
  const { storeId } = useParams();

  const [notifications, setNotifications] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const loadNotifications = async () => {
      try {
        if (storeId) {
          const data =
            await getStoreNotifications(storeId);

          setNotifications(data);
          return;
        }

        const storesResponse = await getStores();

        const stores = Array.isArray(storesResponse)
          ? storesResponse
          : storesResponse.stores || [];

        const notificationResponses =
          await Promise.all(
            stores.map((store) =>
              getStoreNotifications(store.id)
            )
          );

        const allNotifications =
          notificationResponses.flat();

        setNotifications(allNotifications);
      } catch (err) {
        setMessage(err.message);
      }
    };

    loadNotifications();
  }, [storeId]);

  const handleMarkAsRead = async (
    notificationId
  ) => {
    try {
      setMessage('');

      const updatedNotification =
        await markNotificationAsRead(
          notificationId
        );

      setNotifications((currentNotifications) =>
        currentNotifications.map((notification) =>
          notification.id === updatedNotification.id
            ? updatedNotification
            : notification
        )
      );
    } catch (err) {
      setMessage(err.message);
    }
  };

  const handleViewOrder = async (
    notification
  ) => {
    try {
      if (!notification.is_read) {
        await handleMarkAsRead(
          notification.id
        );
      }

      if (storeId) {
        navigate(
          `/stores/${storeId}/orders`
        );
      } else {
        navigate('/stores/orders');
      }
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <div className="notifications-page">

      <button
        type="button"
        onClick={() =>
          navigate(
            storeId
              ? `/stores/${storeId}`
              : '/stores'
          )
        }
      >
        {storeId ? 'Back to Store' : 'Back to My Stores'}
      </button>

      <div className="notifications-header">
        <h1>Notifications</h1>

        <p>
          Stay updated with your store orders
        </p>
      </div>

      {message && <p>{message}</p>}

      {notifications.length === 0 ? (
        <div className="notifications-empty">
          <h2>No notifications</h2>

          <p>
            New order notifications will appear here
          </p>
        </div>
      ) : (
        <div className="notifications-list">

          {notifications.map((notification) => (
            <div
              className="notification-card"
              key={notification.id}
            >

              <h2>
                {notification.type}
              </h2>

              <p>
                {notification.message}
              </p>

              <p>
                {new Date(
                  notification.created_at
                ).toLocaleString()}
              </p>

              <p>
                Status:{' '}
                {notification.is_read
                  ? 'Read'
                  : 'Unread'}
              </p>

              {!notification.is_read && (
                <button
                  type="button"
                  onClick={() =>
                    handleMarkAsRead(
                      notification.id
                    )
                  }
                >
                  Mark as Read
                </button>
              )}

              {notification.order_id && (
                <button
                  type="button"
                  onClick={() =>
                    handleViewOrder(
                      notification
                    )
                  }
                >
                  View Order
                </button>
              )}

            </div>
          ))}

        </div>
      )}

    </div>
  );
};

export default Notifications;