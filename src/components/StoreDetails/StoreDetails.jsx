import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import {
  getStore,
  updateStore,
  uploadHeroImage,
  getPreviewStore
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
  const [heroImage, setHeroImage] = useState(null);
  const [logo, setLogo] = useState(null);
  const [publicUrl, setPublicUrl] = useState('');

  const [settings, setSettings] = useState({
    show_home: true,
    show_products: true,
    show_about: true,
    show_contact: true,
    show_cart: true,
    show_orders: true,
    hero_title: '',
    hero_description: '',
    hero_button_text: '',
    about_title: '',
    about_description: '',
    benefitpay_iban: ''
  });

  useEffect(() => {
    const loadStore = async () => {
      try {
        const storeData = await getStore(storeId);
        const productsData = await getStoreProducts(storeId);

        setStore(storeData);
        setProducts(productsData);

        if (storeData.status === 'published') {
          setPublicUrl(
            `${window.location.origin}/store/${storeData.slug}`
          );
        }

        setSettings({
          show_home: storeData.show_home,
          show_products: storeData.show_products,
          show_about: storeData.show_about,
          show_contact: storeData.show_contact,
          show_cart: storeData.show_cart,
          show_orders: storeData.show_orders,
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
            '',
          benefitpay_iban:
            storeData.benefitpay_iban ||
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

  const handleHeroImageChange = (event) => {
    setHeroImage(event.target.files[0] || null);
  };

  const handleLogoChange = (event) => {
    setLogo(event.target.files[0] || null);
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setMessage('');

      let updatedStore = await updateStore(
        storeId,
        settings
      );

      if (heroImage) {
        updatedStore = await uploadHeroImage(
          storeId,
          heroImage
        );
        setHeroImage(null);
      }

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

      let updatedStore = await updateStore(
        storeId,
        {
          ...settings,
          status: 'published'
        }
      );

      if (heroImage) {
        updatedStore = await uploadHeroImage(
          storeId,
          heroImage
        );
        setHeroImage(null);
      }

      setStore(updatedStore);

      const url =
        `${window.location.origin}/store/${updatedStore.slug}`;

      setPublicUrl(url);

      setMessage('Store published successfully.');
    } catch (err) {
      setMessage(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(publicUrl);
      setMessage('Store URL copied successfully.');
    } catch (err) {
      setMessage('Failed to copy store URL.');
    }
  };

  const handlePreview = async () => {
    try {
      const previewStore = await getPreviewStore(storeId);

      window.open(
        `/store/${previewStore.slug}?preview=true&storeId=${storeId}`,
        '_blank'
      );
    } catch (err) {
      setMessage(err.message);
    }
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

      {publicUrl && (
        <div className="store-public-url">
          <p>Your store is published!</p>

          <input
            type="text"
            value={publicUrl}
            readOnly
          />

          <button
            type="button"
            onClick={handleCopyUrl}
          >
            Copy URL
          </button>
        </div>
      )}

      <main className="store-builder-form-container">

        <form
          className="store-builder-form"
          onSubmit={(event) => {
            event.preventDefault();
            handleSave();
          }}
        >

          <h1>Store Builder</h1>

          <section className="builder-form-section">

            <h2>Store Sections</h2>

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

            <label>
              <input
                type="checkbox"
                name="show_orders"
                checked={settings.show_orders}
                onChange={handleSettingChange}
              />
              My Orders
            </label>

          </section>

          <section className="builder-form-section">

            <h2>Store Logo</h2>

            <label>
              Upload Logo

              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleLogoChange}
              />
            </label>

            {logo && (
              <p>
                Selected: {logo.name}
              </p>
            )}

            {store.logo && !logo && (
              <p>
                Current logo: {store.logo.split('/').pop()}
              </p>
            )}

          </section>

          <section className="builder-form-section">

            <h2>Hero Section</h2>

            <label>
              Hero Image

              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleHeroImageChange}
              />
            </label>

            {heroImage && (
              <p>
                Selected: {heroImage.name}
              </p>
            )}

            {store.hero_image && !heroImage && (
              <p>
                Current hero image:{' '}
                {store.hero_image.split('/').pop()}
              </p>
            )}

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

          </section>

          <section className="builder-form-section">

            <h2>About Section</h2>

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

          </section>

          <section className="builder-form-section">

            <h2>BenefitPay Settings</h2>

            <label>
              BenefitPay IBAN

              <input
                type="text"
                name="benefitpay_iban"
                value={settings.benefitpay_iban}
                onChange={handleSettingChange}
                placeholder="Enter BenefitPay IBAN"
              />
            </label>

          </section>

          <button
            type="submit"
            className="save-builder-button"
            disabled={saving}
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>

        </form>

      </main>

    </div>
  );
};

export default StoreDetails;