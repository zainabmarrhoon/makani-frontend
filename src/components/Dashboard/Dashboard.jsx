import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router';

import { UserContext } from '../../contexts/UserContext';
import { getStores } from '../../services/storeService';
import { getStoreProducts } from '../../services/productService';
import { getStoreOrders } from '../../services/orderService';
import {
  getStoreNotifications
} from '../../services/notificationService';

const Dashboard = () => {
  const { user } = useContext(UserContext);

  const [stores, setStores] = useState([]);
  const [productsCount, setProductsCount] = useState(0);
  const [ordersCount, setOrdersCount] = useState(0);
  const [notificationsCount, setNotificationsCount] = useState(0);

  const [isLoading, setIsLoading] = useState(true);
  const [isProductsLoading, setIsProductsLoading] = useState(true);
  const [isOrdersLoading, setIsOrdersLoading] = useState(true);
  const [isNotificationsLoading, setIsNotificationsLoading] =
    useState(true);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const storesDataResponse = await getStores();

        const storesData = Array.isArray(storesDataResponse)
          ? storesDataResponse
          : storesDataResponse.stores || [];

        setStores(storesData);

        if (storesData.length === 0) {
          setProductsCount(0);
          setOrdersCount(0);
          setNotificationsCount(0);
          return;
        }

        const [
          productsResponses,
          ordersResponses,
          notificationsResponses
        ] = await Promise.all([
          Promise.all(
            storesData.map((store) =>
              getStoreProducts(store.id)
            )
          ),

          Promise.all(
            storesData.map((store) =>
              getStoreOrders(store.id)
            )
          ),

          Promise.all(
            storesData.map((store) =>
              getStoreNotifications(store.id)
            )
          )
        ]);

        const totalProducts = productsResponses.reduce(
          (total, productsResponse) => {
            const products = Array.isArray(productsResponse)
              ? productsResponse
              : productsResponse.products || [];

            return total + products.length;
          },
          0
        );

        const totalOrders = ordersResponses.reduce(
          (total, ordersResponse) => {
            const orders = Array.isArray(ordersResponse)
              ? ordersResponse
              : ordersResponse.orders || [];

            return total + orders.length;
          },
          0
        );

        const totalNotifications =
          notificationsResponses.reduce(
            (total, notificationsResponse) => {
              const notifications = Array.isArray(
                notificationsResponse
              )
                ? notificationsResponse
                : notificationsResponse.notifications || [];

              return total + notifications.length;
            },
            0
          );

        setProductsCount(totalProducts);
        setOrdersCount(totalOrders);
        setNotificationsCount(totalNotifications);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
        setIsProductsLoading(false);
        setIsOrdersLoading(false);
        setIsNotificationsLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  return (
    <main className="dashboard-page">
      <section className="dashboard-hero">
        <div>
          <p className="dashboard-eyebrow">
            MAKANI DASHBOARD
          </p>

          <h1>
            Welcome back
            <br />
            <span>{user?.username}</span>
          </h1>

          <p className="dashboard-intro">
            Manage your stores, products, and orders all in one place.
          </p>
        </div>
      </section>

      <section className="dashboard-stats">
        <Link
          to="/stores"
          className="dashboard-stat-card"
        >
          <span className="dashboard-stat-number">
            {isLoading ? '...' : stores.length}
          </span>

          <span className="dashboard-stat-label">
            My Stores
          </span>
        </Link>

        <Link
          to="/products"
          className="dashboard-stat-card"
        >
          <span className="dashboard-stat-number">
            {isProductsLoading ? '...' : productsCount}
          </span>

          <span className="dashboard-stat-label">
            Products
          </span>
        </Link>

        <Link
          to="/stores/orders"
          className="dashboard-stat-card"
        >
          <span className="dashboard-stat-number">
            {isOrdersLoading ? '...' : ordersCount}
          </span>

          <span className="dashboard-stat-label">
            Orders
          </span>
        </Link>

        <Link
          to="/stores/notifications"
          className="dashboard-stat-card"
        >
          <span className="dashboard-stat-number">
            {isNotificationsLoading
              ? '...'
              : notificationsCount}
          </span>

          <span className="dashboard-stat-label">
            Notifications
          </span>
        </Link>
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
            <span>+</span>
            Create a Store
          </Link>

          <Link
            to="/stores"
            className="dashboard-action"
          >
            <span>01</span>
            My Stores
          </Link>

          <Link
            to="/products"
            className="dashboard-action"
          >
            <span>02</span>
            Products
          </Link>
        </div>
      </section>

      <section className="dashboard-bottom">
        <div>
          <p className="dashboard-section-eyebrow">
            YOUR SPACE
          </p>

          <h2>
            Create. Manage. Grow.
          </h2>
        </div>

        <p>
          Makani gives you one place to manage your online
          store and keep everything organized
        </p>
      </section>
    </main>
  );
};

export default Dashboard;