import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import {
  getOrder,
  updateOrderStatus
} from '../../services/orderService';

const OrderTracking = () => {
  const navigate = useNavigate();
  const { orderId } = useParams();

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

  const handleStatusChange = async (status) => {
    try {
      setMessage('');

      const updatedOrder = await updateOrderStatus(
        orderId,
        status
      );

      setOrder(updatedOrder);
    } catch (err) {
      setMessage(err.message);
    }
  };

  if (message && !order) {
    return (
      <div className="order-tracking-page">
        <p>{message}</p>

        <button
          type="button"
          onClick={() => navigate(-1)}
        >
          Back
        </button>
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

  return (
    <div className="order-tracking-page">
      <button
        type="button"
        onClick={() => navigate(-1)}
      >
        Back
      </button>

      <h1>Order #{order.id}</h1>

      <p>
        Customer: {order.customer_name}
      </p>

      <p>
        Phone: {order.customer_phone}
      </p>

      <p>
        Address: {order.customer_address}
      </p>

      <p>
        Total:{' '}
        {Number(order.total_amount).toFixed(2)} BHD
      </p>

      <p>
        Payment Method: {order.payment_method}
      </p>

      <p>
        Current Status: {order.status}
      </p>

      {message && <p>{message}</p>}

      <h2>Order Status</h2>

      <div className="order-status-list">
        {statuses.map((status) => (
          <div key={status}>
            <p>{status}</p>

            <button
              type="button"
              onClick={() => handleStatusChange(status)}
              disabled={order.status === status}
            >
              {order.status === status
                ? 'Current Status'
                : `Set ${status}`}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderTracking;