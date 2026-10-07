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
          show_home: storeData.show_home ?? true,
          show_products: storeData.show_products ?? true,
          show_about: storeData.show_about ?? true,
          show_contact: storeData.show_contact ?? true,
          show_cart: storeData.show_cart ?? true,
          show_orders: storeData.show_orders ?? true,

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

    setSettings((currentSettings) => ({
      ...currentSettings,
      [name]: type === 'checkbox' ? checked : value
    }));
   };

   const handleHeroImageChange = (event) => {
    setHeroImage(event.target.files[0] || null);
   };

   const handleLogoChange = (event) => {
    setLogo(event.target.files[0] || null);
   };
   const handleSave = async () => {
   console.log('SAVE BUTTON CLICKED');

   try {
    setSaving(true);
    setMessage('Saving changes...');

    console.log('Sending update...');

   const updatedStore = await updateStore(storeId, settings);

    console.log('STORE UPDATED:', updatedStore);

    setStore(updatedStore);
    setMessage('Store settings saved successfully.');
  } catch (err) {
    console.error('SAVE STORE ERROR:', err);

    setMessage(
      err?.message || 'Failed to save store settings.'
    );
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
        <div className="store-builder-error">
          <h2>Something went wrong</h2>
          <p>{message}</p>
          <button
            type="button"
            onClick={() => navigate('/stores')}
          >
            Back to My Stores
          </button>
        </div>
      </div>
    );
  }

  if (!store) {
    return (
      <div className="store-builder">
        <div className="store-builder-loading">
          <p>Loading your store...</p>
        </div>
      </div>
    );
  }

  const logoPreview = logo
    ? URL.createObjectURL(logo)
    : store.logo
      ? `${BASE_URL}/${store.logo}`
      : null;

  const heroPreview = heroImage
    ? URL.createObjectURL(heroImage)
    : store.hero_image
      ? `${BASE_URL}/${store.hero_image}`
      : null;

  return (
    <div className="store-builder">

      {/* TOOLBAR */}
      <div className="store-builder-toolbar">

        <button
          type="button"
          className="builder-back-button"
          onClick={() => navigate('/stores')}
        >
          ← Back to My Stores
        </button>

        <div className="store-builder-toolbar-actions">

          <button
            type="button"
            className="builder-preview-button"
            onClick={handlePreview}
          >
            Preview
          </button>

          <button
            type="button"
            className="builder-publish-button"
            onClick={handlePublish}
            disabled={saving}
          >
            {saving ? 'Publishing...' : 'Publish Store'}
          </button>

        </div>
      </div>

      {/* HEADER */}
      <header className="store-builder-header">

        <div>
          <p className="store-builder-eyebrow">
            STORE CUSTOMIZATION
          </p>

          <h1>Build your store</h1>

          <p>
            Customize your storefront, add your content,
            and publish when everything looks right.
          </p>
        </div>

        <div className="store-builder-store-name">
          <span>YOUR STORE</span>
          <strong>{store.name}</strong>
          <small>/{store.slug}</small>
        </div>

      </header>

      {/* MESSAGE */}
      {message && (
        <div className="store-builder-message">
          <span>✓</span>
          <p>{message}</p>
        </div>
      )}

      {/* PUBLIC URL */}
      {publicUrl && (
        <section className="store-public-url">

          <div>
            <span className="builder-section-label">
              PUBLISHED STORE
            </span>

            <h3>Your store is live</h3>

            <p>
              Share this link with your customers.
            </p>
          </div>

          <div className="store-public-url-actions">

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

        </section>
      )}

      <main className="store-builder-form-container">

        <form
          className="store-builder-form"
          onSubmit={(event) => {
            event.preventDefault();
            handleSave();
          }}
        >

          {/* STORE SECTIONS */}
          <section className="builder-form-section">

            <div className="builder-section-heading">
              <div>
                <span className="builder-section-number">
                  01
                </span>

                <div>
                  <p className="builder-section-label">
                    NAVIGATION
                  </p>

                  <h2>Store Sections</h2>

                  <p>
                    Choose which sections customers can see
                    in your store.
                  </p>
                </div>
              </div>
            </div>

            <div className="store-sections-grid">

              {[
                ['show_home', 'Home', 'Your store landing page'],
                ['show_products', 'Products', 'Browse your products'],
                ['show_about', 'About', 'Tell customers about your business'],
                ['show_contact', 'Contact', 'Your business contact details'],
                ['show_cart', 'Cart', 'Customer shopping cart'],
                ['show_orders', 'My Orders', 'Customer order tracking']
              ].map(([name, title, description]) => (
                <label
                  key={name}
                  className={`store-section-option ${
                    settings[name] ? 'active' : ''
                  }`}
                >

                  <div className="store-section-option-text">

                    <strong>{title}</strong>

                    <span>{description}</span>

                  </div>

                  <input
                    type="checkbox"
                    name={name}
                    checked={settings[name]}
                    onChange={handleSettingChange}
                  />

                  <span className="custom-checkbox">
                    ✓
                  </span>

                </label>
              ))}

            </div>

          </section>

          {/* STORE LOGO */}
          <section className="builder-form-section">

            <div className="builder-section-heading">
              <div>
                <span className="builder-section-number">
                  02
                </span>

                <div>
                  <p className="builder-section-label">
                    BRANDING
                  </p>

                  <h2>Store Logo</h2>

                  <p>
                    Add your business logo to make your store
                    recognizable.
                  </p>
                </div>
              </div>
            </div>

            <div className="builder-upload-layout">

              <div className="builder-image-preview">

                {logoPreview ? (
                  <img
                    src={logoPreview}
                    alt={`${store.name} logo`}
                  />
                ) : (
                  <div className="builder-image-placeholder">
                    <span>LOGO</span>
                    <p>No logo selected</p>
                  </div>
                )}

              </div>

              <div className="builder-upload-content">

                <label className="builder-file-label">

                  <span>Choose Logo</span>

                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={handleLogoChange}
                  />

                </label>

                {logo && (
                  <p className="builder-file-name">
                    Selected: {logo.name}
                  </p>
                )}

                {!logo && store.logo && (
                  <p className="builder-file-name">
                    Current logo is uploaded.
                  </p>
                )}

                <p className="builder-help-text">
                  Use a clear JPG, PNG, or WEBP image.
                </p>

              </div>

            </div>

          </section>

          {/* HERO */}
          <section className="builder-form-section">

            <div className="builder-section-heading">
              <div>
                <span className="builder-section-number">
                  03
                </span>

                <div>
                  <p className="builder-section-label">
                    HOMEPAGE
                  </p>

                  <h2>Hero Section</h2>

                  <p>
                    Create the first impression customers see
                    when they visit your store.
                  </p>
                </div>
              </div>
            </div>

            <div className="builder-upload-layout">

              <div className="builder-image-preview hero-preview">

                {heroPreview ? (
                  <img
                    src={heroPreview}
                    alt="Store hero"
                  />
                ) : (
                  <div className="builder-image-placeholder">
                    <span>HERO</span>
                    <p>No hero image selected</p>
                  </div>
                )}

              </div>

              <div className="builder-upload-content">

                <label className="builder-file-label">

                  <span>Choose Hero Image</span>

                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={handleHeroImageChange}
                  />

                </label>

                {heroImage && (
                  <p className="builder-file-name">
                    Selected: {heroImage.name}
                  </p>
                )}

                {!heroImage && store.hero_image && (
                  <p className="builder-file-name">
                    Current hero image is uploaded.
                  </p>
                )}

                <p className="builder-help-text">
                  A wide image works best for the storefront
                  hero section.
                </p>

              </div>

            </div>

            <div className="builder-fields-grid">

              <label className="builder-field">
                <span>Hero Title</span>

                <input
                  type="text"
                  name="hero_title"
                  value={settings.hero_title}
                  onChange={handleSettingChange}
                  placeholder="Welcome to your store"
                />
              </label>

              <label className="builder-field">
                <span>Button Text</span>

                <input
                  type="text"
                  name="hero_button_text"
                  value={settings.hero_button_text}
                  onChange={handleSettingChange}
                  placeholder="Shop Now"
                />
              </label>

            </div>

            <label className="builder-field">

              <span>Hero Description</span>

              <textarea
                name="hero_description"
                value={settings.hero_description}
                onChange={handleSettingChange}
                placeholder="Tell customers what makes your store special."
                rows="5"
              />

            </label>

          </section>

          {/* ABOUT */}
          <section className="builder-form-section">

            <div className="builder-section-heading">
              <div>
                <span className="builder-section-number">
                  04
                </span>

                <div>
                  <p className="builder-section-label">
                    YOUR STORY
                  </p>

                  <h2>About Section</h2>

                  <p>
                    Give customers a little more information
                    about your business.
                  </p>
                </div>
              </div>
            </div>

            <label className="builder-field">

              <span>About Title</span>

              <input
                type="text"
                name="about_title"
                value={settings.about_title}
                onChange={handleSettingChange}
                placeholder="About Us"
              />

            </label>

            <label className="builder-field">

              <span>About Description</span>

              <textarea
                name="about_description"
                value={settings.about_description}
                onChange={handleSettingChange}
                placeholder="Tell customers about your business."
                rows="6"
              />

            </label>

          </section>

          {/* BENEFITPAY */}
          <section className="builder-form-section">

            <div className="builder-section-heading">
              <div>
                <span className="builder-section-number">
                  05
                </span>

                <div>
                  <p className="builder-section-label">
                    PAYMENT
                  </p>

                  <h2>BenefitPay Settings</h2>

                  <p>
                    Add your BenefitPay IBAN for customers
                    who choose BenefitPay at checkout.
                  </p>
                </div>
              </div>
            </div>

            <div className="benefitpay-builder-card">

              <div className="benefitpay-icon">
                B
              </div>

              <div className="benefitpay-field">

                <label className="builder-field">

                  <span>BenefitPay IBAN</span>

                  <input
                    type="text"
                    name="benefitpay_iban"
                    value={settings.benefitpay_iban}
                    onChange={handleSettingChange}
                    placeholder="Enter BenefitPay IBAN"
                  />

                </label>

                <p>
                  Customers will see this information when
                  choosing BenefitPay as their payment method.
                </p>

              </div>

            </div>

          </section>

          {/* SAVE */}
          <div className="builder-save-area">

            <div>
              <h3>Ready to update your store?</h3>

              <p>
                Save your changes before publishing your
                storefront.
              </p>
            </div>

            <button
              type="submit"
              className="save-builder-button"
              disabled={saving}
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </button>

          </div>

        </form>

      </main>

    </div>
  );
};

export default StoreDetails;