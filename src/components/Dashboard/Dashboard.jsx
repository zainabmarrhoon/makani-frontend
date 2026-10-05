import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router';

import { UserContext } from '../../contexts/UserContext';
import { getStores } from '../../services/storeService';

const Dashboard = () => {
  const { user } = useContext(UserContext);

  const [stores, setStores] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadStores = async () => {
      try {
        const data = await getStores();

        const storesData = Array.isArray(data)
          ? data
          : data.stores || [];

        setStores(storesData);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    loadStores();
  }, []);

  return (
    <main className="dashboard-page">
      <section className="dashboard-hero">
        <div>
          <p className="dashboard-eyebrow">
            MAKANI DASHBOARD
          </p>

          <h1>
            Welcome back,
            <br />
            <span>{user?.username}</span>
          </h1>

          <p className="dashboard-intro">
            Manage your stores, products, and orders all in one place.
          </p>
        </div>
      </section>

      <section className="dashboard-stats">
        <article className="dashboard-stat-card">
          <span className="dashboard-stat-number">
            {isLoading ? '...' : stores.length}
          </span>

          <span className="dashboard-stat-label">
            My Stores
          </span>
        </article>

        <article className="dashboard-stat-card">
          <span className="dashboard-stat-number">—</span>

          <span className="dashboard-stat-label">
            Products
          </span>
        </article>

        <article className="dashboard-stat-card">
          <span className="dashboard-stat-number">—</span>

          <span className="dashboard-stat-label">
            Orders
          </span>
        </article>

        <article className="dashboard-stat-card">
          <span className="dashboard-stat-number">—</span>

          <span className="dashboard-stat-label">
            Notifications
          </span>
        </article>
      </section>

      <section className="dashboard-section">
        <div className="dashboard-section-heading">
          <div>
            <p className="dashboard-section-eyebrow">
              GET STARTED
            </p>

            <h2>
              What would you like to do?
            </h2>
          </div>
        </div>

        <div className="dashboard-actions">
          <Link
            to="/stores/create"
            className="dashboard-action dashboard-action-primary"
          >
            <span className="dashboard-action-icon">
              +
            </span>

            <div>
              <h3>Create a Store</h3>

              <p>
                Set up your online store and start selling.
              </p>
            </div>

            <span className="dashboard-action-arrow">
              →
            </span>
          </Link>

          <Link
            to="/stores"
            className="dashboard-action"
          >
            <span className="dashboard-action-icon">
              01
            </span>

            <div>
              <h3>My Stores</h3>

              <p>
                View and manage your existing stores.
              </p>
            </div>

            <span className="dashboard-action-arrow">
              →
            </span>
          </Link>

          <Link
            to="/products"
            className="dashboard-action"
          >
            <span className="dashboard-action-icon">
              02
            </span>

            <div>
              <h3>Products</h3>

              <p>
                Manage the products available in your stores.
              </p>
            </div>

            <span className="dashboard-action-arrow">
              →
            </span>
          </Link>
        </div>
      </section>

      <section className="dashboard-bottom">
        <div className="dashboard-info-card">
          <p className="dashboard-section-eyebrow">
            YOUR SPACE
          </p>

          <h2>
            Everything your business needs,
            <br />
            in one place.
          </h2>

          <p>
            Makani gives you a simple space to manage your online
            business without having to build a store from scratch.
          </p>
        </div>

        <div className="dashboard-number">
          <span>01</span>

          <p>CREATE</p>
          <p>MANAGE</p>
          <p>GROW</p>
        </div>
      </section>
    </main>
  );
};

export default Dashboard;