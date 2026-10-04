import { useLocation, useNavigate } from 'react-router';

const OrderSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const orderId = location.state?.orderId;

  return (
    <div className="order-success-page">
      <h1>Order Placed Successfully</h1>

      <p>
        Thank you for your order. Your order has
        been received.
      </p>

      {orderId && (
        <p>
          Order #{orderId}
        </p>
      )}

      <p>
        You can track your order status using
        your order details.
      </p>

      {orderId && (
        <button
          type="button"
          onClick={() =>
            navigate(`/orders/${orderId}/track`)
          }
        >
          Track Order
        </button>
      )}

      <button
        type="button"
        onClick={() => navigate('/')}
      >
        Back to Home
      </button>
    </div>
  );
};

export default OrderSuccess;