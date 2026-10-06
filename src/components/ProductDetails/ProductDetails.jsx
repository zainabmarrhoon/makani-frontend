import { useEffect, useState, useContext } from 'react';
import { useNavigate, useParams } from 'react-router';
import { getProduct } from '../../services/productService';
import { getPublicStore } from '../../services/storeService';
import { CartContext } from '../../contexts/CartContext';

const BASE_URL = import.meta.env.VITE_BACK_END_SERVER_URL;

const ProductDetails = () => {
  const navigate = useNavigate();
  const { productId, slug } = useParams();

  const { addToCart } = useContext(CartContext);

  const [product, setProduct] = useState(null);
  const [store, setStore] = useState(null);
  const [message, setMessage] = useState('');

  const isCustomer = Boolean(slug);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        if (isCustomer) {
          const storeData = await getPublicStore(slug);

          const foundProduct = storeData.products?.find(
            (item) => item.id === Number(productId)
          );

          if (!foundProduct) {
            throw new Error('Product not found');
          }

          setStore(storeData);
          setProduct(foundProduct);
        } else {
          const data = await getProduct(productId);
          setProduct(data);
        }
      } catch (err) {
        setMessage(err.message);
      }
    };

    loadProduct();
  }, [productId, slug, isCustomer]);

  const handleAddToCart = () => {
    addToCart({
      ...product,
      store_id: product.store_id || store.id
    });

    navigate(`/store/${store.slug}/cart`);
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

      {isCustomer && (
        <button
          type="button"
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>
      )}
    </div>
  );
};

export default ProductDetails;