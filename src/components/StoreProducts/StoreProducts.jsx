import { useEffect, useState, useContext } from 'react';
import { useNavigate, useParams } from 'react-router';
import { CartContext } from '../../contexts/CartContext';
import { getPublicStore } from '../../services/storeService';

const BASE_URL = import.meta.env.VITE_BACK_END_SERVER_URL;

const StoreProducts = () => {
  const navigate = useNavigate();
  const { slug } = useParams();

  const { addToCart } = useContext(CartContext);

  const [store, setStore] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const loadStore = async () => {
      try {
        const data = await getPublicStore(slug);
        setStore(data);
      } catch (err) {
        setMessage(err.message);
      }
    };

    loadStore();
  }, [slug]);

  if (message) {
    return (
      <div className="store-products-page">
        <p>{message}</p>
      </div>
    );
  }

  if (!store) {
    return (
      <div className="store-products-page">
        <p>Loading products...</p>
      </div>
    );
  }

  const products = store.products || [];

  const handleAddToCart = (product) => {
    addToCart({
      ...product,
      store_id: product.store_id || store.id
    });

    navigate(`/store/${store.slug}/cart`);
  };

  const handleViewProduct = (productId) => {
    navigate(
      `/store/${store.slug}/products/${productId}`
    );
  };

  return (
    <div className="store-products-page">

      <section className="store-products-header">
        <h1>Products</h1>
      </section>

      {products.length === 0 ? (
        <div className="products-empty">
          <h2>No products yet</h2>

          <p>
            This store has not added any products
          </p>
        </div>
      ) : (
        <div className="store-products-list">
          {products.map((product) => (
            <div
              className="product-card"
              key={product.id}
            >
              {product.image && (
                <img
                  src={`${BASE_URL}/${product.image}`}
                  alt={product.name}
                />
              )}

              <h2>{product.name}</h2>

              <p>{product.description}</p>

              <p>
                {Number(product.price).toFixed(2)} BHD
              </p>

              <button
                type="button"
                onClick={() =>
                  handleViewProduct(product.id)
                }
              >
                View Product
              </button>

              <button
                type="button"
                onClick={() =>
                  handleAddToCart(product)
                }
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

export default StoreProducts;