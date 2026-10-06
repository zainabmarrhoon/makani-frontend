import { useEffect, useState } from 'react';
import {
  useNavigate,
  useParams,
  useSearchParams
} from 'react-router';
import {
  getPublicStore,
  getPreviewStore
} from '../../services/storeService';

const BASE_URL = import.meta.env.VITE_BACK_END_SERVER_URL;

const CustomerNavbar = () => {
  const navigate = useNavigate();
  const { slug } = useParams();
  const [searchParams] = useSearchParams();

  const [store, setStore] = useState(null);

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
        console.log(err);
      }
    };

    loadStore();
  }, [slug, isPreview, previewStoreId]);

  if (!store) {
    return null;
  }

  const previewQuery = isPreview
    ? `?preview=true&storeId=${previewStoreId}`
    : '';

  const storeUrl = `/store/${store.slug}`;

  return (
    <header className="customer-navbar">
      <div className="customer-navbar-logo">
        {store.logo && (
          <img
            src={`${BASE_URL}/${store.logo}`}
            alt={store.name}
          />
        )}
      </div>

      <nav className="customer-navbar-links">

        {store.show_home && (
          <button
            type="button"
            onClick={() =>
              navigate(`${storeUrl}${previewQuery}`)
            }
          >
            Home
          </button>
        )}

        {store.show_products && (
          <button
            type="button"
            onClick={() =>
              navigate(
                `${storeUrl}/products${previewQuery}`
              )
            }
          >
            Products
          </button>
        )}

        {store.show_about && (
          <button
            type="button"
            onClick={() =>
              navigate(
                `${storeUrl}/about${previewQuery}`
              )
            }
          >
            About
          </button>
        )}

        {store.show_contact && (
          <button
            type="button"
            onClick={() =>
              navigate(
                `${storeUrl}/contact${previewQuery}`
              )
            }
          >
            Contact
          </button>
        )}

        {store.show_cart && (
          <button
            type="button"
            onClick={() =>
              navigate(
                `${storeUrl}/cart${previewQuery}`
              )
            }
          >
            Cart
          </button>
        )}

        {store.show_orders && (
          <button
            type="button"
            onClick={() =>
              navigate(
                `${storeUrl}/orders${previewQuery}`
              )
            }
          >
            My Orders
          </button>
        )}

        {isPreview && (
          <button
            type="button"
            onClick={() =>
              navigate(`/stores/${previewStoreId}`)
            }
          >
            Back to Builder
          </button>
        )}

      </nav>
    </header>
  );
};

export default CustomerNavbar;