import { useNavigate, useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { getPublicStore } from '../../services/storeService';

const BASE_URL = import.meta.env.VITE_BACK_END_SERVER_URL;

const CustomerNavbar = () => {
  const navigate = useNavigate();
  const { slug } = useParams();

  const [store, setStore] = useState(null);

  useEffect(() => {
    const loadStore = async () => {
      try {
        const data = await getPublicStore(slug);
        setStore(data);
      } catch (err) {
        console.log(err);
      }
    };

    loadStore();
  }, [slug]);

  if (!store) {
    return null;
  }

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
            onClick={() => navigate(`/store/${store.slug}`)}
          >
            Home
          </button>
        )}

        {store.show_products && (
          <button
            type="button"
            onClick={() =>
              navigate(`/store/${store.slug}/products`)
            }
          >
            Products
          </button>
        )}

        {store.show_about && (
          <button
            type="button"
            onClick={() =>
              navigate(`/store/${store.slug}#about`)
            }
          >
            About
          </button>
        )}

        {store.show_contact && (
          <button
            type="button"
            onClick={() =>
              navigate(`/store/${store.slug}#contact`)
            }
          >
            Contact
          </button>
        )}

        {store.show_cart && (
          <button
            type="button"
            onClick={() =>
              navigate(`/store/${store.slug}/cart`)
            }
          >
            Cart
          </button>
        )}
      </nav>
    </header>
  );
};

export default CustomerNavbar;