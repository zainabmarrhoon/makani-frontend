import { useContext } from 'react';
import { useNavigate, useParams } from 'react-router';

import { CartContext } from '../../contexts/CartContext';

const ProductDetails = () => {
  const navigate = useNavigate();
  const { productId } = useParams();

  const { addToCart } = useContext(CartContext);

  const product = null;

  const handleAddToCart = () => {
    addToCart(product);
    navigate('/cart');
  };

  return (
    <div className="product-details-page">
      <button
        type="button"
        onClick={() => navigate(-1)}
      >
        Back
      </button>

      {product === null ? (
        <div className="product-details-empty">
          <h1>Product Details</h1>
          <p>Product ID: {productId}</p>
          <p>Product information will appear here.</p>
        </div>
      ) : (
        <div className="product-details">
          <div className="product-gallery">
            {product.images?.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`${product.name} ${index + 1}`}
              />
            ))}
          </div>

          <div className="product-info">
            <h1>{product.name}</h1>
            <p>{product.description}</p>
            <p>{product.price} BHD</p>

            <button
              type="button"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;