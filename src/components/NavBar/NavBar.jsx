import { useContext } from 'react';
import { Link } from 'react-router';

import { UserContext } from '../../contexts/UserContext';
import { removeToken } from '../../lib/helpers/jwt-helpers';

import logo from '../../assets/logoMAKANI1.png';

const NavBar = () => {
  const { user, setUser } = useContext(UserContext);

  const handleSignOut = () => {
    removeToken();
    setUser(null);
  };

  return (
    <nav>
      <div className="navbar-inner">
        <Link to="/" className="navbar-logo">
          <img
            src={logo}
            alt="Makani"
          />
        </Link>

        <ul>
          {user ? (
            <>
              <li>
                <Link to="/">
                  Dashboard
                </Link>
              </li>

              <li>
                <Link to="/stores">
                  My Stores
                </Link>
              </li>

              <li>
                <Link to="/products">
                  Products
                </Link>
              </li>

              <li>
                <Link
                  to="/"
                  onClick={handleSignOut}
                >
                  Sign Out
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/sign-up">
                  Sign Up
                </Link>
              </li>

              <li>
                <Link to="/sign-in">
                  Sign In
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;