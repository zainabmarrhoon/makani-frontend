import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { getPublicStore } from '../../services/storeService';

const BASE_URL = import.meta.env.VITE_BACK_END_SERVER_URL;

const StorePage = () => {
  const navigate = useNavigate();
  const { slug } = useParams();

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

  const handleShopNow = () => {
    navigate(`/store/${store.slug}/products`);
  };

  return (
    <div className="store-page">

      {store.hero_image && (
        <section className="store-hero">
          <img
            className="store-hero-image"
            src={`${BASE_URL}/${store.hero_image}`}
            alt={`${store.name} hero`}
          />
        </section>
      )}

      {store.show_home && (
        <section
          id="home"
          className="store-home"
        >
          <button
            type="button"
            onClick={handleShopNow}
          >
            {store.hero_button_text || 'Shop Now'}
          </button>
        </section>
      )}

      {store.show_about && (
        <section
          id="about"
          className="store-about"
        >
          <h2>{store.about_title}</h2>

          <p>
            {store.about_description}
          </p>
        </section>
      )}

      {store.show_contact && (
        <section
          id="contact"
          className="store-contact"
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
      )}

    </div>
  );
};

export default StorePage;