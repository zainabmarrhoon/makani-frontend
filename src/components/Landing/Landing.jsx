import { useNavigate } from 'react-router';

const Landing = () => {
  const navigate = useNavigate();

  return (
    <main className="landing-page">
      <section className="landing-hero">
        <div className="landing-hero-content">
          <p className="landing-label">YOUR STORE. YOUR WAY.</p>

          <h1>Build Your Online Store with Makani</h1>

          <p className="landing-hero-text">
            Create, manage, and grow your online store without
            building a website from scratch.
          </p>

          <div className="landing-hero-actions">
            <button
              type="button"
              onClick={() => navigate('/sign-up')}
            >
              Get Started
            </button>

            <button
              type="button"
              onClick={() => navigate('/sign-in')}
            >
              Sign In
            </button>
          </div>
        </div>
      </section>

      <section className="landing-how-it-works">
        <div className="section-heading">
          <p className="landing-label">HOW IT WORKS</p>

          <h2>Start Selling in Three Simple Steps</h2>

          <p>
            Everything you need to create and manage your online
            store in one place.
          </p>
        </div>

        <div className="steps">
          <div className="step">
            <span>01</span>

            <h3>Create Your Store</h3>

            <p>
              Set up your store with your business information and
              create your unique store URL.
            </p>
          </div>

          <div className="step">
            <span>02</span>

            <h3>Add Your Products</h3>

            <p>
              Add your products, descriptions, prices, and images
              to your online store.
            </p>
          </div>

          <div className="step">
            <span>03</span>

            <h3>Share & Sell</h3>

            <p>
              Share your unique store link with customers and start
              receiving orders.
            </p>
          </div>
        </div>
      </section>

      <section className="landing-features">
        <div className="section-heading">
          <p className="landing-label">FEATURES</p>

          <h2>Everything You Need to Run Your Store</h2>

          <p>
            Makani gives business owners the tools they need to
            manage their online store in one place.
          </p>
        </div>

        <div className="features-grid">
          <div className="feature">
            <h3>Store Customization</h3>

            <p>
              Create a store that represents your business with
              your own store information and branding.
            </p>
          </div>

          <div className="feature">
            <h3>Product Management</h3>

            <p>
              Easily add, update, and manage the products available
              in your store.
            </p>
          </div>

          <div className="feature">
            <h3>Order Management</h3>

            <p>
              View customer orders and manage their status from
              one place.
            </p>
          </div>

          <div className="feature">
            <h3>Order Tracking</h3>

            <p>
              Give customers a simple way to follow the progress
              of their orders.
            </p>
          </div>

          <div className="feature">
            <h3>BenefitPay Support</h3>

            <p>
              Allow customers to submit their BenefitPay payment
              proof when placing an order.
            </p>
          </div>

          <div className="feature">
            <h3>Unique Store URL</h3>

            <p>
              Give your business a direct link that customers can
              use to visit your online store.
            </p>
          </div>
        </div>
      </section>

      <section className="landing-cta">
        <div className="landing-cta-content">
          <p className="landing-label">READY TO START?</p>

          <h2>Your Business Deserves Its Own Place Online.</h2>

          <p>
            Create your store, add your products, and start building
            your online presence with Makani.
          </p>

          <button
            type="button"
            onClick={() => navigate('/sign-up')}
          >
            Create Your Store
          </button>
        </div>
      </section>
    </main>
  );
};

export default Landing;