import { useContext } from 'react';
import { useNavigate, useParams } from 'react-router';

import { CartContext } from '../../contexts/CartContext';

const StorePage = () => {
  const navigate = useNavigate();
  const { slug } = useParams();

  const { addToCart } = useContext(CartContext);

  const products = [];

  return (
    <div className="store-page">
      <div className="store-page-header">
        <h1>{slug}</h1>
        <p>Welcome to our store.</p>
      </div>

      {products.length === 0 ? (
        <div className="store-products-empty">
          <h2>No products available</h2>
          <p>This store has not added any products yet.</p>
        </div>
      ) : (
        <div className="store-products-grid">
          {products.map((product) => (
            <div
              className="store-product-card"
              key={product.id}
            >
              <img
                src={product.images?.[0]}
                alt={product.name}
              />

              <h2>{product.name}</h2>

              <p>{product.description}</p>

              <p>{Number(product.price).toFixed(2)} BHD</p>

              <button
                type="button"
                onClick={() => navigate(`/products/${product.id}`)}
              >
                View Product
              </button>

              <button
                type="button"
                onClick={() => addToCart(product)}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StorePage;