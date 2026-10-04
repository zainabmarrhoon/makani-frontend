import { useNavigate } from 'react-router';
import { useState } from 'react';

const Checkout = () => {
  const navigate = useNavigate();

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

    console.log(formData);

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

            <p>Transfer the order amount to the following IBAN:</p>

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
