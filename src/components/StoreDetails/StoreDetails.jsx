import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import {
  getStore,
  updateStore
} from '../../services/storeService';
import { getStoreProducts } from '../../services/productService';

const BASE_URL = import.meta.env.VITE_BACK_END_SERVER_URL;

const StoreDetails = () => {
  const navigate = useNavigate();
  const { storeId } = useParams();

  const [store, setStore] = useState(null);
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState('');
  const [saving, setSaving] = useState(false);

  const [settings, setSettings] = useState({
    show_home: true,
    show_products: true,
    show_about: true,
    show_contact: true,
    show_cart: true,
    hero_title: '',
    hero_description: '',
    hero_button_text: '',
    about_title: '',
    about_description: ''
  });

  useEffect(() => {
    const loadStore = async () => {
      try {
        const storeData = await getStore(storeId);
        const productsData = await getStoreProducts(storeId);

        setStore(storeData);
        setProducts(productsData);

        setSettings({
          show_home: storeData.show_home,
          show_products: storeData.show_products,
          show_about: storeData.show_about,
          show_contact: storeData.show_contact,
          show_cart: storeData.show_cart,
          hero_title:
            storeData.hero_title ||
            `Welcome to ${storeData.name}`,
          hero_description:
            storeData.hero_description ||
            storeData.description ||
            '',
          hero_button_text:
            storeData.hero_button_text ||
            'Shop Now',
          about_title:
            storeData.about_title ||
            'About Us',
          about_description:
            storeData.about_description ||
            storeData.description ||
            ''
        });
      } catch (err) {
        setMessage(err.message);
      }
    };

    loadStore();
  }, [storeId]);

  const handleSettingChange = (event) => {
    const { name, value, type, checked } = event.target;

    setSettings({
      ...settings,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setMessage('');

      const updatedStore = await updateStore(
        storeId,
        settings
      );

      setStore(updatedStore);

      setMessage('Store settings saved successfully.');
    } catch (err) {
      setMessage(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handlePublish = async () => {
    try {
      setSaving(true);
      setMessage('');

      const updatedStore = await updateStore(
        storeId,
        {
          ...settings,
          status: 'published'
        }
      );

      setStore(updatedStore);

      setMessage('Store published successfully.');
    } catch (err) {
      setMessage(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handlePreview = () => {
    if (!store) {
      return;
    }

    window.open(
      `/store/${store.slug}`,
      '_blank'
    );
  };

  if (message && !store) {
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

        <div className="store-builder-toolbar-actions">
          <button
            type="button"
            onClick={handlePreview}
          >
            Preview
          </button>

          <button
            type="button"
            onClick={handlePublish}
            disabled={saving}
          >
            {saving ? 'Saving...' : 'Publish'}
          </button>
        </div>
      </div>

      {message && (
        <p className="store-builder-message">
          {message}
        </p>
      )}

      <div className="store-builder-layout">
        <aside className="store-builder-sidebar">
          <h2>Store Builder</h2>

          <div className="builder-settings">
            <h3>Sections</h3>

            <label>
              <input
                type="checkbox"
                name="show_home"
                checked={settings.show_home}
                onChange={handleSettingChange}
              />
              Home
            </label>

            <label>
              <input
                type="checkbox"
                name="show_products"
                checked={settings.show_products}
                onChange={handleSettingChange}
              />
              Products
            </label>

            <label>
              <input
                type="checkbox"
                name="show_about"
                checked={settings.show_about}
                onChange={handleSettingChange}
              />
              About
            </label>

            <label>
              <input
                type="checkbox"
                name="show_contact"
                checked={settings.show_contact}
                onChange={handleSettingChange}
              />
              Contact
            </label>

            <label>
              <input
                type="checkbox"
                name="show_cart"
                checked={settings.show_cart}
                onChange={handleSettingChange}
              />
              Cart
            </label>
          </div>

          <div className="builder-settings">
            <h3>Hero Section</h3>

            <label>
              Hero Title
              <input
                type="text"
                name="hero_title"
                value={settings.hero_title}
                onChange={handleSettingChange}
              />
            </label>

            <label>
              Hero Description
              <textarea
                name="hero_description"
                value={settings.hero_description}
                onChange={handleSettingChange}
              />
            </label>

            <label>
              Button Text
              <input
                type="text"
                name="hero_button_text"
                value={settings.hero_button_text}
                onChange={handleSettingChange}
              />
            </label>
          </div>

          <div className="builder-settings">
            <h3>About Section</h3>

            <label>
              About Title
              <input
                type="text"
                name="about_title"
                value={settings.about_title}
                onChange={handleSettingChange}
              />
            </label>

            <label>
              About Description
              <textarea
                name="about_description"
                value={settings.about_description}
                onChange={handleSettingChange}
              />
            </label>
          </div>

          <button
            type="button"
            className="save-builder-button"
            onClick={handleSave}
            disabled={saving}
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </aside>

        <main className="store-builder-preview">
          <div className="store-template">

            <header className="store-template-header">
              {store.logo && (
                <img
                  className="store-template-logo"
                  src={`${BASE_URL}/${store.logo}`}
                  alt={store.name}
                />
              )}

              <nav className="store-template-nav">
                {settings.show_home && (
                  <a href="#home">Home</a>
                )}

                {settings.show_products && (
                  <a href="#products">Products</a>
                )}

                {settings.show_about && (
                  <a href="#about">About</a>
                )}

                {settings.show_contact && (
                  <a href="#contact">Contact</a>
                )}

                {settings.show_cart && (
                  <a href="#cart">Cart</a>
                )}
              </nav>
            </header>

            {store.hero_image && (
              <section className="store-template-hero-image">
                <img
                  src={`${BASE_URL}/${store.hero_image}`}
                  alt={`${store.name} hero`}
                />
              </section>
            )}

            {settings.show_home && (
              <section
                id="home"
                className="store-template-home"
              >
                <button type="button">
                  {settings.hero_button_text || 'Shop Now'}
                </button>
              </section>
            )}

            {settings.show_products && (
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
                      Add your first product to start
                      building your store.
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
                            <span>
                              Product Image
                            </span>
                          )}
                        </div>

                        <h3>{product.name}</h3>

                        <p>
                          {Number(product.price).toFixed(2)} BHD
                        </p>

                        <button type="button">
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
            )}

            {settings.show_about && (
              <section
                id="about"
                className="store-template-about"
              >
                <h2>{settings.about_title}</h2>

                <p>
                  {settings.about_description}
                </p>
              </section>
            )}

            {settings.show_contact && (
              <section
                id="contact"
                className="store-template-contact"
              >
                <h2>Contact</h2>

                {store.phone && (
                  <p>
                    Phone: {store.phone}
                  </p>
                )}

                {store.email && (
                  <p>
                    Email: {store.email}
                  </p>
                )}

                {store.address && (
                  <p>
                    Address: {store.address}
                  </p>
                )}
              </section>
            )}

            {settings.show_cart && (
              <section
                id="cart"
                className="store-template-cart"
              >
                <h2>Your Cart</h2>

                <p>
                  Your customers will see their
                  selected products here.
                </p>
              </section>
            )}

            <footer className="store-template-footer">
              <h3>{store.name}</h3>

              <p>
                © 2026 {store.name}. All rights reserved.
              </p>
            </footer>

          </div>
        </main>
      </div>
    </div>
  );
};

export default StoreDetails;