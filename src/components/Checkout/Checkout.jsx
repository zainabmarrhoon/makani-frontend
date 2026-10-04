import { useContext, useState } from 'react';
import { useNavigate } from 'react-router';

import { CartContext } from '../../contexts/CartContext';

const Checkout = () => {
  const navigate = useNavigate();

  const { cartItems, total, clearCart } = useContext(CartContext);

  const [formData, setFormData] = useState({
    customerName: '',
    phone: '',
    address: '',
    paymentMethod: ''
  });

  const [copied, setCopied] = useState(false);

  const iban = 'YOUR_IBAN_HERE';

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleCopyIban = async () => {
    await navigator.clipboard.writeText(iban);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log({
      ...formData,
      items: cartItems,
      total
    });

    clearCart();
    navigate('/order-success');
  };

  return (
    <div className="checkout-page">
      <button
        type="button"
        onClick={() => navigate('/cart')}
      >
        Back to Cart
      </button>

      <h1>Checkout</h1>
      <p>Enter your details to place your order.</p>

      <div className="checkout-summary">
        <h2>Order Summary</h2>

        {cartItems.map((item) => (
          <div key={item.id}>
            <p>
              {item.name} × {item.quantity}
            </p>

            <p>
              {(Number(item.price) * item.quantity).toFixed(2)} BHD
            </p>
          </div>
        ))}

        <h3>Total: {total.toFixed(2)} BHD</h3>
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
            <option value="">Select payment method</option>

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
              Transfer the order amount to the following IBAN:
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
              After completing the payment, upload your payment proof.
            </p>

            <label>Payment Proof</label>

            <input
              type="file"
              accept="image/*"
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