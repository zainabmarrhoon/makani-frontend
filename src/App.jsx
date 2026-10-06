
import { useContext } from 'react';
import { Route, Routes, useLocation, Outlet } from 'react-router';

import NavBar from './components/NavBar/NavBar';
import CustomerNavbar from './components/CustomerNavbar/CustomerNavbar';
import CustomerFooter from './components/CustomerFooter/CustomerFooter';

import Landing from './components/Landing/Landing';
import Dashboard from './components/Dashboard/Dashboard';

import SignUpForm from './components/SignUpForm/SignUpForm';
import SignInForm from './components/SignInForm/SignInForm';

import Stores from './components/Stores/Stores';
import CreateStore from './components/CreateStore/CreateStore';
import StoreDetails from './components/StoreDetails/StoreDetails';
import StoreProducts from './components/StoreProducts/StoreProducts';
import StoreOrders from './components/StoreOrders/StoreOrders';

import Products from './components/Products/Products';
import CreateProduct from './components/CreateProduct/CreateProduct';
import EditProduct from './components/EditProduct/EditProduct';
import ProductDetails from './components/ProductDetails/ProductDetails';

import StorePage from './components/StorePage/StorePage';

import Cart from './components/Cart/Cart';
import Checkout from './components/Checkout/Checkout';

import Orders from './components/Orders/Orders';
import OrderSuccess from './components/OrderSuccess/OrderSuccess';
import OrderTracking from './components/OrderTracking/OrderTracking';

import Notifications from './components/Notifications/Notifications';

import { UserContext } from './contexts/UserContext';

const CustomerLayout = () => {
  return (
    <>
      <CustomerNavbar />
      <Outlet />
      <CustomerFooter />
    </>
  );
};

const App = () => {
  const { user } = useContext(UserContext);
  const location = useLocation();

  const isStorePage = location.pathname.startsWith('/store/');

  return (
    <>
      {!isStorePage && <NavBar />}

      <Routes>
        <Route
          path="/"
          element={user ? <Dashboard /> : <Landing />}
        />

        <Route
          path="/sign-up"
          element={<SignUpForm />}
        />

        <Route
          path="/sign-in"
          element={<SignInForm />}
        />

        <Route
          path="/stores"
          element={<Stores />}
        />

        <Route
          path="/stores/create"
          element={<CreateStore />}
        />

        <Route
          path="/stores/:storeId"
          element={<StoreDetails />}
        />

        <Route
          path="/stores/:storeId/products"
          element={<StoreProducts />}
        />

        <Route
          path="/stores/:storeId/orders"
          element={<StoreOrders />}
        />

        <Route
          path="/stores/:storeId/notifications"
          element={<Notifications />}
        />

        <Route
          path="/products"
          element={<Products />}
        />

        <Route
          path="/products/create"
          element={<CreateProduct />}
        />

        <Route
          path="/products/:productId"
          element={<ProductDetails />}
        />

        <Route
          path="/products/:productId/edit"
          element={<EditProduct />}
        />

        <Route
          path="/store/:slug"
          element={<CustomerLayout />}
        >
          <Route
            index
            element={<StorePage />}
          />

          <Route
            path="products"
            element={<StoreProducts />}
          />

          <Route
            path="products/:productId"
            element={<ProductDetails />}
          />

          <Route
            path="about"
            element={<StorePage />}
          />

          <Route
            path="contact"
            element={<StorePage />}
          />

          <Route
            path="cart"
            element={<Cart />}
          />

          <Route
            path="checkout"
            element={<Checkout />}
          />

          <Route
            path="orders"
            element={<Orders />}
          />

          <Route
            path="order-success"
            element={<OrderSuccess />}
          />

          <Route
            path="orders/:orderId/track"
            element={<OrderTracking />}
          />
        </Route>
      </Routes>
    </>
  );
};

export default App;

