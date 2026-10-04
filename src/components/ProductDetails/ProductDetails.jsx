import { useEffect, useState, useContext } from 'react';
import { useNavigate, useParams } from 'react-router';
import { CartContext } from '../../contexts/CartContext';
import { getProduct } from '../../services/productService';

const ProductDetails = () => {
  const navigate = useNavigate();
  const { productId } = useParams();

  const { addToCart } = useContext(CartContext);

  const [product, setProduct] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const data = await getProduct(productId);
        setProduct(data);
      } catch (err) {
        setMessage(err.message);
      }
    };

    loadProduct();
  }, [productId]);

  const handleAddToCart = () => {
    addToCart(product);
    navigate('/cart');
  };

  if (message) {
    return (
      <div className="product-details-page">
        <p>{message}</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="product-details-page">
        <p>Loading product...</p>
      </div>
    );
  }

  return (
    <div className="product-details-page">
      <button
        type="button"
        onClick={() => navigate(-1)}
      >
        Back
      </button>

      {product.image && (
        <img
          src={product.image}
          alt={product.name}
        />
      )}

      <h1>{product.name}</h1>

      <p>{product.description}</p>

      <p>
        {Number(product.price).toFixed(2)} BHD
      </p>

      <button
        type="button"
        onClick={handleAddToCart}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductDetails;