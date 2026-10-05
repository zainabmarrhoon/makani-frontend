import { useContext, useState } from 'react';
import { useNavigate } from 'react-router';

import { signIn } from '../../services/authService';
import { UserContext } from '../../contexts/UserContext';

const SignInForm = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const handleChange = (event) => {
    setMessage('');

    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setMessage('');

      const signedInUser = await signIn(formData);

      setUser(signedInUser);
      navigate('/');
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <main className="auth-page">
      <div className="auth-content">
        <p className="auth-eyebrow">WELCOME BACK</p>

        <h1>Sign In</h1>

        <p className="auth-subtitle">
          Sign in to manage your Makani store.
        </p>

        <form className="auth-form" autoComplete="off" onSubmit={handleSubmit}>
          {message && (
            <p className="auth-message" role="alert">
              {message}
            </p>
          )}

          <div className="auth-field">
            <label htmlFor="username">
              Username
            </label>

            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              autoComplete="username"
              placeholder="Enter your username"
              required
            />
          </div>

          <div className="auth-field">
            <label htmlFor="password">
              Password
            </label>

            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              autoComplete="current-password"
              placeholder="Enter your password"
              required
            />
          </div>

          <button type="submit" className="auth-submit">
            Sign In
          </button>

          <button
            type="button"
            className="auth-secondary"
            onClick={() => navigate('/')}
          >
            Back to Home
          </button>
        </form>
      </div>
    </main>
  );
};

export default SignInForm;