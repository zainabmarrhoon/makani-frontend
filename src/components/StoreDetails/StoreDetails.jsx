
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { getStore } from '../../services/storeService';
import { getStoreProducts } from '../../services/productService';

const BASE_URL = import.meta.env.VITE_BACK_END_SERVER_URL;

const StoreDetails = () => {
  const navigate = useNavigate();
  const { storeId } = useParams();

  const [store, setStore] = useState(null);
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const loadStore = async () => {
      try {
        const storeData = await getStore(storeId);
        const productsData = await getStoreProducts(storeId);

        setStore(storeData);
        setProducts(productsData);
      } catch (err) {
        setMessage(err.message);
      }
    };

    loadStore();
  }, [storeId]);

  if (message) {
    return (
      <div className="store-builder">
        <p>{message}</p>
      </div>
    );
  }

  if (!store) {
    return (
      <div className="store-builder">
        <p>Loading your store...</p>
      </div>
    );
  }

  return (
    <div className="store-builder">
      <div className="store-builder-toolbar">
        <button
          type="button"
          onClick={() => navigate('/stores')}
        >
          Back to My Stores
        </button>

        <div>
          <button type="button">
            Preview
          </button>

          <button type="button">
            Publish
          </button>
        </div>
      </div>

      <div className="store-builder-content">
        <header className="store-template-header">
          {store.logo && (
            <img
              className="store-template-logo"
              src={`${BASE_URL}/${store.logo}`}
              alt={store.name}
            />
          )}

          <h1>{store.name}</h1>

          <p>{store.description}</p>

          <nav className="store-template-nav">
            <a href="#home">Home</a>
            <a href="#products">Products</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
            <a href="#cart">Cart</a>
          </nav>
        </header>

        <section
          id="home"
          className="store-template-hero"
        >
          <h2>Welcome to {store.name}</h2>

          <p>
            {store.description}
          </p>

          <button
            type="button"
            onClick={() =>
              document
                .getElementById('products')
                ?.scrollIntoView()
            }
          >
            Shop Now
          </button>
        </section>

        <section
          id="products"
          className="store-template-products"
        >
          <div className="store-template-section-header">
            <div>
              <h2>Products</h2>

              <p>
                Explore our products
              </p>
            </div>

            <button
              type="button"
              onClick={() =>
                navigate(
                  `/products/create?storeId=${storeId}`
                )
              }
            >
              + Add Product
            </button>
          </div>

          {products.length === 0 ? (
            <div className="store-template-empty">
              <h3>No products yet</h3>

              <p>
                Add your first product to start building
                your store.
              </p>

              <button
                type="button"
                onClick={() =>
                  navigate(
                    `/products/create?storeId=${storeId}`
                  )
                }
              >
                Add Your First Product
              </button>
            </div>
          ) : (
            <div className="store-template-product-grid">
              {products.map((product) => (
                <div
                  className="store-template-product-card"
                  key={product.id}
                >
                  <div className="store-template-product-image">
                    {product.image ? (
                      <img
                        src={`${BASE_URL}/${product.image}`}
                        alt={product.name}
                      />
                    ) : (
                      <span>Product Image</span>
                    )}
                  </div>

                  <h3>{product.name}</h3>

                  <p>
                    {Number(product.price).toFixed(2)} BHD
                  </p>

                  <button
                    type="button"
                    onClick={() =>
                      navigate(
                        `/products/${product.id}`
                      )
                    }
                  >
                    Add to Cart
                  </button>

                  <div className="store-template-product-actions">
                    <button
                      type="button"
                      onClick={() =>
                        navigate(
                          `/products/${product.id}/edit`
                        )
                      }
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        navigate(
                          `/products/${product.id}`
                        )
                      }
                    >
                      View
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        <section
          id="about"
          className="store-template-about"
        >
          <h2>About Us</h2>

          <p>
            {store.description}
          </p>
        </section>

        <section
          id="contact"
          className="store-template-contact"
        >
          <h2>Contact</h2>

          {store.phone && (
            <p>Phone: {store.phone}</p>
          )}

          {store.email && (
            <p>Email: {store.email}</p>
          )}

          {store.address && (
            <p>Address: {store.address}</p>
          )}
        </section>

        <footer className="store-template-footer">
          <h3>{store.name}</h3>

          <p>
            © 2026 {store.name}. All rights reserved.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default StoreDetails;

