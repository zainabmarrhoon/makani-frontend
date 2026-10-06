
import { useContext, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { CartContext } from '../../contexts/CartContext';
import { createOrder } from '../../services/orderService';

const Checkout = () => {
  const navigate = useNavigate();
  const { slug } = useParams();

  const {
    cartItems,
    total,
    clearCart
  } = useContext(CartContext);

  const [formData, setFormData] = useState({
    customerName: '',
    phone: '',
    address: '',
    paymentMethod: ''
  });

  const [paymentProof, setPaymentProof] = useState(null);
  const [message, setMessage] = useState('');
  const [copied, setCopied] = useState(false);

  const iban = 'YOUR_IBAN_HERE';

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handlePaymentProofChange = (event) => {
    setPaymentProof(
      event.target.files[0] || null
    );
  };

  const handleCopyIban = async () => {
    try {
      await navigator.clipboard.writeText(iban);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setMessage('');

      if (cartItems.length === 0) {
        throw new Error('Your cart is empty');
      }

      const storeId = cartItems[0]?.store_id;

      if (!storeId) {
        throw new Error('Store information is missing');
      }

      if (
        formData.paymentMethod === 'benefitpay' &&
        !paymentProof
      ) {
        throw new Error(
          'Please upload your payment proof'
        );
      }

      const orderData = {
        customer_name: formData.customerName,
        customer_phone: formData.phone,
        customer_address: formData.address,
        payment_method: formData.paymentMethod,
        products: cartItems.map((item) => ({
          product_id: item.id,
          quantity: item.quantity
        }))
      };

      const order = await createOrder(
        storeId,
        orderData,
        paymentProof
      );

      const savedOrders =
        JSON.parse(localStorage.getItem('orders')) || [];

      const newOrder = {
        ...order,
        customer_name: formData.customerName,
        customer_phone: formData.phone,
        customer_address: formData.address,
        payment_method: formData.paymentMethod,
        total_amount: order.total_amount ?? total,
        status: order.status ?? 'pending'
      };

      localStorage.setItem(
        'orders',
        JSON.stringify([
          newOrder,
          ...savedOrders
        ])
      );

      clearCart();

      navigate(
        `/store/${slug}/order-success`,
        {
          state: {
            orderId: order.id
          }
        }
      );
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <div className="checkout-page">

      <button
        type="button"
        onClick={() =>
          navigate(`/store/${slug}/cart`)
        }
      >
        Back to Cart
      </button>

      <h1>Checkout</h1>

      <p>
        Enter your details to place your order
      </p>

      {message && <p>{message}</p>}

      <div className="checkout-summary">
        <h2>Order Summary</h2>

        {cartItems.map((item) => (
          <div key={item.id}>
            <p>
              {item.name} × {item.quantity}
            </p>

            <p>
              {(
                Number(item.price) * item.quantity
              ).toFixed(2)} BHD
            </p>
          </div>
        ))}

        <h3>
          Total: {total.toFixed(2)} BHD
        </h3>
      </div>

      <form onSubmit={handleSubmit}>

        <div>
          <label>Full Name</label>

          <input
            type="text"
            name="customerName"
            value={formData.customerName}
            onChange={handleChange}
            placeholder="Enter your full name"
            required
          />
        </div>

        <div>
          <label>Phone</label>

          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter your phone number"
            required
          />
        </div>

        <div>
          <label>Address</label>

          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Enter your delivery address"
            required
          />
        </div>

        <div>
          <label>Payment Method</label>

          <select
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={handleChange}
            required
          >
            <option value="">
              Select payment method
            </option>

            <option value="cash_on_delivery">
              Cash on Delivery
            </option>

            <option value="benefitpay">
              BenefitPay
            </option>
          </select>
        </div>

        {formData.paymentMethod === 'benefitpay' && (
          <div className="benefitpay-payment">

            <h2>BenefitPay Payment</h2>

            <p>
              Transfer the order amount to the
              following IBAN:
            </p>

            <div>
              <span>{iban}</span>

              <button
                type="button"
                onClick={handleCopyIban}
              >
                {copied ? 'Copied' : 'Copy'}
              </button>
            </div>

            <p>
              After completing the payment,
              upload your payment proof.
            </p>

            <label>Payment Proof</label>

            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handlePaymentProofChange}
              required
            />

          </div>
        )}

        <button type="submit">
          Place Order
        </button>

      </form>
    </div>
  );
};

export default Checkout;
