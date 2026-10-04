import { useNavigate } from 'react-router';

const OrderSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="order-success-page">
      <h1>Order Placed Successfully</h1>

      <p>
        Thank you for your order. Your order has been received.
      </p>

      <p>
        You can track your order status using your order details.
      </p>

      <button
        type="button"
        onClick={() => navigate('/orders')}
      >
        View My Orders
      </button>

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