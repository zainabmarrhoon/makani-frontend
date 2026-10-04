import { useEffect, useState } from 'react';
import { useContext } from 'react';
import { useNavigate, useParams } from 'react-router';
import { CartContext } from '../../contexts/CartContext';
import { getPublicStore } from '../../services/storeService';

const StorePage = () => {
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
      <div className="store-page">
        <p>{message}</p>
      </div>
    );
  }

  if (!store) {
    return (
      <div className="store-page">
        <p>Loading store...</p>
      </div>
    );
  }

  const products = store.products || [];

  const handleAddToCart = (product) => {
    addToCart({
      ...product,
      store_id: product.store_id || store.id
    });

    navigate('/cart');
  };

  return (
    <div className="store-page">
      <div className="store-header">
        <h1>{store.name}</h1>

        <p>{store.description}</p>

        {store.phone && (
          <p>Phone: {store.phone}</p>
        )}

        {store.email && (
          <p>Email: {store.email}</p>
        )}

        {store.address && (
          <p>Address: {store.address}</p>
        )}
      </div>

      <div className="store-products">
        <h2>Products</h2>

        {products.length === 0 ? (
          <div>
            <h3>No products yet</h3>
            <p>
              This store has not added any products.
            </p>
          </div>
        ) : (
          <div>
            {products.map((product) => (
              <div
                className="product-card"
                key={product.id}
              >
                {product.image && (
                  <img
                    src={product.image}
                    alt={product.name}
                  />
                )}

                <h3>{product.name}</h3>

                <p>{product.description}</p>

                <p>
                  {Number(product.price).toFixed(2)} BHD
                </p>

                <button
                  type="button"
                  onClick={() =>
                    navigate(`/products/${product.id}`)
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
    </div>
  );
};

export default StorePage;