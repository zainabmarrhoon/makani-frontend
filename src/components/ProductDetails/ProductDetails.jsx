
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { getProduct } from '../../services/productService';

const BASE_URL = import.meta.env.VITE_BACK_END_SERVER_URL;

const ProductDetails = () => {
  const navigate = useNavigate();
  const { productId } = useParams();

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

      <div className="product-details-image">
        {product.image ? (
          <img
            src={`${BASE_URL}/${product.image}`}
            alt={product.name}
          />
        ) : (
          <span>No image available</span>
        )}
      </div>

      <h1>{product.name}</h1>

      <p>{product.description}</p>

      <p>
        {Number(product.price).toFixed(2)} BHD
      </p>
    </div>
  );
};

export default ProductDetails;

