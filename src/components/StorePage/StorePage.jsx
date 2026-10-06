import { useEffect, useState } from 'react';
import {
  useNavigate,
  useParams,
  useLocation,
  useSearchParams
} from 'react-router';
import {
  getPublicStore,
  getPreviewStore
} from '../../services/storeService';

const BASE_URL = import.meta.env.VITE_BACK_END_SERVER_URL;

const StorePage = () => {
  const navigate = useNavigate();
  const { slug } = useParams();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const [store, setStore] = useState(null);
  const [message, setMessage] = useState('');

  const isPreview = searchParams.get('preview') === 'true';
  const previewStoreId = searchParams.get('storeId');

  useEffect(() => {
    const loadStore = async () => {
      try {
        const data = isPreview && previewStoreId
          ? await getPreviewStore(previewStoreId)
          : await getPublicStore(slug);

        setStore(data);
      } catch (err) {
        setMessage(err.message);
      }
    };

    loadStore();
  }, [slug, isPreview, previewStoreId]);

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

  if (location.pathname.endsWith('/about')) {
    return (
      <div className="store-page">
        <section className="store-about">
          <h1>{store.about_title}</h1>
          <p>{store.about_description}</p>
        </section>
      </div>
    );
  }

  if (location.pathname.endsWith('/contact')) {
    return (
      <div className="store-page">
        <section className="store-contact">
          <h1>Contact</h1>

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
      </div>
    );
  }

  const handleShopNow = () => {
    const previewQuery = isPreview
      ? `?preview=true&storeId=${previewStoreId}`
      : '';

    navigate(
      `/store/${store.slug}/products${previewQuery}`
    );
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
        <section className="store-home">
          <h1>{store.hero_title}</h1>

          <button
            type="button"
            onClick={handleShopNow}
          >
            {store.hero_button_text || 'Shop Now'}
          </button>
        </section>
      )}
    </div>
  );
};

export default StorePage;