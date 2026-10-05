import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

const Orders = () => {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const savedOrders =
      JSON.parse(localStorage.getItem('orders')) || [];

    setOrders(savedOrders);
  }, []);

  return (
    <div className="orders-page">
      <div className="orders-header">
        <h1>My Orders</h1>
        <p>View and track your orders</p>
      </div>

      {orders.length === 0 ? (
        <div className="orders-empty">
          <h2>No orders yet</h2>

          <p>
            Your orders will appear here after you
            place an order
          </p>

          <button
            type="button"
            onClick={() => navigate('/stores')}
          >
            Browse Stores
          </button>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <div
              className="order-card"
              key={order.id}
            >
              <h2>Order #{order.id}</h2>

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
                  navigate(
                    `/orders/${order.id}/track`
                  )
                }
              >
                Track Order
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;