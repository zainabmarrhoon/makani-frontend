import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { getStoreOrders } from '../../services/orderService';

const StoreOrders = () => {
  const navigate = useNavigate();
  const { storeId } = useParams();

  const [orders, setOrders] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const data = await getStoreOrders(storeId);
        setOrders(data);
      } catch (err) {
        setMessage(err.message);
      }
    };

    loadOrders();
  }, [storeId]);

  return (
    <div className="store-orders-page">
      <button
        type="button"
        onClick={() => navigate(`/stores/${storeId}`)}
      >
        Back to Store
      </button>

      <div className="store-orders-header">
        <h1>Store Orders</h1>
        <p>View and manage orders for this store.</p>
      </div>

      {message && <p>{message}</p>}

      {orders.length === 0 ? (
        <div className="orders-empty">
          <h2>No orders yet</h2>
          <p>Orders for this store will appear here.</p>
        </div>
      ) : (
        <div className="store-orders-list">
          {orders.map((order) => (
            <div className="order-card" key={order.id}>
              <h2>Order #{order.id}</h2>

              <p>
                Customer: {order.customer_name}
              </p>

              <p>
                Total:{' '}
                {Number(order.total_amount).toFixed(2)} BHD
              </p>

              <p>
                Status: {order.status}
              </p>

              <button
                type="button"
                onClick={() =>
                  navigate(`/orders/${order.id}/track`)
                }
              >
                View Order
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StoreOrders;