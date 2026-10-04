import { useNavigate, useParams } from 'react-router';

const OrderTracking = () => {
  const navigate = useNavigate();
  const { orderId } = useParams();

  const order = null;

  return (
    <div className="order-tracking-page">
      <button
        type="button"
        onClick={() => navigate('/orders')}
      >
        Back to My Orders
      </button>

      <h1>Track Your Order</h1>

      {order === null ? (
        <div className="order-tracking-empty">
          <h2>Order #{orderId}</h2>

          <p>
            Order tracking information will appear here.
          </p>
        </div>
      ) : (
        <div className="order-tracking-content">
          <h2>Order #{order.id}</h2>

          <p>Status: {order.status}</p>

          <div className="order-status">
            <div>
              <span>1</span>
              <p>Pending</p>
            </div>

            <div>
              <span>2</span>
              <p>Confirmed</p>
            </div>

            <div>
              <span>3</span>
              <p>Preparing</p>
            </div>

            <div>
              <span>4</span>
              <p>Ready</p>
            </div>

            <div>
              <span>5</span>
              <p>Delivered</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderTracking;