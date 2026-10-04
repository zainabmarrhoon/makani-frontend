import { useNavigate } from 'react-router';

const Orders = () => {
  const navigate = useNavigate();
  const orders = [];

  return (
    <div className="orders-page">
      <div className="orders-header">
        <div>
          <h1>Orders</h1>
          <p>Manage your store orders.</p>
        </div>
      </div>

      {orders.length === 0 ? (
        <div className="orders-empty">
          <h2>No orders yet</h2>
          <p>Your customer orders will appear here.</p>

          <button
            type="button"
            onClick={() => navigate('/stores')}
          >
            Back to My Stores
          </button>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <div className="order-card" key={order.id}>
              <h2>Order #{order.id}</h2>
              <p>Customer: {order.customer_name}</p>
              <p>Total: {order.total_amount} BHD</p>
              <p>Status: {order.status}</p>

              <button type="button">
                View Order
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;