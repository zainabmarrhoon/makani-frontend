import { useNavigate, useParams } from 'react-router';

const StoreOrders = () => {
  const navigate = useNavigate();
  const { storeId } = useParams();

  const orders = [];

  return (
    <div className="store-orders-page">
      <button
        type="button"
        onClick={() => navigate(`/stores/${storeId}`)}
      >
        Back to Store
      </button>

      <div className="store-orders-header">
        <div>
          <h1>Store Orders</h1>
          <p>Manage the orders for your store.</p>
        </div>
      </div>

      {orders.length === 0 ? (
        <div className="store-orders-empty">
          <h2>No orders yet</h2>
          <p>Your customer orders will appear here.</p>
        </div>
      ) : (
        <div className="store-orders-list">
          {orders.map((order) => (
            <div
              className="order-card"
              key={order.id}
            >
              <h2>Order #{order.id}</h2>

              <p>
                Customer: {order.customer_name}
              </p>

              <p>
                Total: {Number(order.total_amount).toFixed(2)} BHD
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