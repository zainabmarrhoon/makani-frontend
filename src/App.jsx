
import { useContext } from 'react';
import { Route, Routes } from 'react-router';

import NavBar from './components/NavBar/NavBar';
import SignUpForm from './components/SignUpForm/SignUpForm';
import SignInForm from './components/SignInForm/SignInForm';
import Dashboard from './components/Dashboard/Dashboard';
import Landing from './components/Landing/Landing';
import Stores from './components/Stores/Stores';
import CreateStore from './components/CreateStore/CreateStore';
import Products from './components/Products/Products';
import CreateProduct from './components/CreateProduct/CreateProduct';
import Orders from './components/Orders/Orders';

import { UserContext } from './contexts/UserContext';

const App = () => {
  const { user } = useContext(UserContext);

  return (
    <>
      <NavBar />
      <Routes>
        <Route path='/' element={user ? <Dashboard /> : <Landing />} />
        <Route path='/sign-up' element={<SignUpForm />} />
        <Route path='/sign-in' element={<SignInForm />} />
        <Route path='/stores' element={<Stores />} />
        <Route path='/stores/create' element={<CreateStore />} />
        <Route path='/products' element={<Products />} />
<Route path='/products/create' element={<CreateProduct />} />
<Route path='/orders' element={<Orders />} />
        



      </Routes>
    </>
  );
};

export default App;

