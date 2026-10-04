import { useNavigate, useParams } from 'react-router';

const StorePage = () => {
  const navigate = useNavigate();
  const { slug } = useParams();

  const products = [];

  return (
    <div className="store-page">
      <div className="store-page-header">
        <h1>{slug}</h1>
        <p>Welcome to our store.</p>
      </div>

      {products.length === 0 ? (
        <div className="store-products-empty">
          <h2>No products available</h2>
          <p>This store has not added any products yet.</p>
        </div>
      ) : (
        <div className="store-products-grid">
          {products.map((product) => (
            <div className="store-product-card" key={product.id}>
              <img
                src={product.images?.[0]}
                alt={product.name}
              />

              <h2>{product.name}</h2>
              <p>{product.description}</p>
              <p>{product.price} BHD</p>

              <button
                type="button"
                onClick={() => navigate(`/products/${product.id}`)}
              >
                View Product
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StorePage;