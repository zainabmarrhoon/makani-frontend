
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { getOrder } from '../../services/orderService';

const OrderTracking = () => {
  const navigate = useNavigate();
  const { slug, orderId } = useParams();

  const [order, setOrder] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const loadOrder = async () => {
      try {
        const data = await getOrder(orderId);
        setOrder(data);
      } catch (err) {
        setMessage(err.message);
      }
    };

    loadOrder();
  }, [orderId]);

  if (message) {
    return (
      <div className="order-tracking-page">
        <button
          type="button"
          onClick={() =>
            navigate(`/store/${slug}/orders`)
          }
        >
          Back to Orders
        </button>

        <p>{message}</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="order-tracking-page">
        <p>Loading order...</p>
      </div>
    );
  }

  const statuses = [
    'pending',
    'confirmed',
    'preparing',
    'ready',
    'delivered'
  ];

  const currentStatusIndex =
    statuses.indexOf(order.status);

  return (
    <div className="order-tracking-page">
      <button
        type="button"
        onClick={() =>
          navigate(`/store/${slug}/orders`)
        }
      >
        Back to Orders
      </button>

      <div className="order-tracking-header">
        <h1>
          Order #{order.id}
        </h1>

        <p>
          Total:{' '}
          {Number(order.total_amount).toFixed(2)} BHD
        </p>

        <p>
          Current Status: {order.status}
        </p>
      </div>

      <div className="order-status-timeline">
        {statuses.map((status, index) => {
          const isCompleted =
            currentStatusIndex >= index;

          const isCurrent =
            order.status === status;

          return (
            <div
              className="order-status-step"
              key={status}
            >
              <h2>{status}</h2>

              {isCompleted && (
                <p>
                  {isCurrent
                    ? 'Current status'
                    : 'Completed'}
                </p>
              )}

              {!isCompleted && (
                <p>Waiting</p>
              )}
            </div>
          );
        })}
      </div>

      {order.status === 'cancelled' && (
        <div className="order-cancelled">
          <h2>Order Cancelled</h2>

          <p>
            This order has been cancelled
          </p>
        </div>
      )}
    </div>
  );
};

export default OrderTracking;

