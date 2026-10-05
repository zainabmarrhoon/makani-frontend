import { useContext, useState } from 'react';
import { useNavigate } from 'react-router';

import * as authService from '../../services/authService';
import { UserContext } from '../../contexts/UserContext';

const SignUpForm = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const [message, setMessage] = useState('');

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    passwordConf: ''
  });

  const {
    username,
    email,
    password,
    passwordConf
  } = formData;

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

      const payload = {
        username,
        email,
        password
      };

      const user = await authService.signUp(payload);

      setUser(user);
      navigate('/');
    } catch (err) {
      setMessage(err.message);
    }
  };

  const isFormInvalid = () => {
    return !(
      username &&
      email &&
      password &&
      password === passwordConf
    );
  };

  return (
    <main className="auth-page">
      <div className="auth-content">
        <p className="auth-eyebrow">CREATE YOUR ACCOUNT</p>

        <h1>Sign Up</h1>

        <p className="auth-subtitle">
          Create your account and start building your Makani store
        </p>

        <form
          className="auth-form"
          autoComplete="off"
          onSubmit={handleSubmit}
        >
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
              value={username}
              onChange={handleChange}
              autoComplete="username"
              placeholder="Choose a username"
              required
            />
          </div>

          <div className="auth-field">
            <label htmlFor="email">
              Email
            </label>

            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={handleChange}
              autoComplete="email"
              placeholder="Enter your email"
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
              value={password}
              onChange={handleChange}
              autoComplete="new-password"
              placeholder="Create a password"
              required
            />
          </div>

          <div className="auth-field">
            <label htmlFor="passwordConf">
              Confirm Password
            </label>

            <input
              type="password"
              id="passwordConf"
              name="passwordConf"
              value={passwordConf}
              onChange={handleChange}
              autoComplete="new-password"
              placeholder="Confirm your password"
              required
            />
          </div>

          <button
            type="submit"
            className="auth-submit"
            disabled={isFormInvalid()}
          >
            Create Account
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

export default SignUpForm;