import { useContext } from 'react';
import { useNavigate } from 'react-router';

import { CartContext } from '../../contexts/CartContext';

const Cart = () => {
  const navigate = useNavigate();

  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    total
  } = useContext(CartContext);

  return (
    <div className="cart-page">
      <div className="cart-header">
        <h1>Your Cart</h1>
        <p>Review your products before checkout</p>
      </div>

      {cartItems.length === 0 ? (
        <div className="cart-empty">
          <h2>Your cart is empty</h2>
          <p>Add products from a store to see them here</p>
        </div>
      ) : (
        <div className="cart-content">
          <div className="cart-items">
            {cartItems.map((item) => (
              <div className="cart-item" key={item.id}>
                <h2>{item.name}</h2>

                <p>{Number(item.price).toFixed(2)} BHD</p>

                <div>
                  <button
                    type="button"
                    onClick={() => decreaseQuantity(item.id)}
                  >
                    -
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    type="button"
                    onClick={() => increaseQuantity(item.id)}
                  >
                    +
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h2>Order Summary</h2>

            <p>Total: {total.toFixed(2)} BHD</p>

            <button
              type="button"
              onClick={() => navigate('/checkout')}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;