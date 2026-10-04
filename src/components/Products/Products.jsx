import { useNavigate } from 'react-router';

const Products = () => {
  const navigate = useNavigate();

  const products = [];

  return (
    <div className="products-page">
      <div className="products-header">
        <div>
          <h1>Products</h1>
          <p>Manage your store products.</p>
        </div>

        {products.length > 0 && (
          <button
            className="add-product-btn"
            type="button"
            onClick={() => navigate('/products/create')}
          >
            Add New Product
          </button>
        )}
      </div>

      {products.length === 0 ? (
        <div className="products-empty">
          <h2>No products yet</h2>

          <p>
            Add your first product to start selling.
          </p>

          <button
            className="add-product-btn"
            type="button"
            onClick={() => navigate('/products/create')}
          >
            Add Your First Product
          </button>
        </div>
      ) : (
        <div className="products-list">
          {products.map((product) => (
            <div
              className="product-card"
              key={product.id}
            >
              <h2>{product.name}</h2>

              <p>{product.description}</p>

              <p>
                {Number(product.price).toFixed(2)} BHD
              </p>

              <button
                type="button"
                onClick={() =>
                  navigate(`/products/${product.id}`)
                }
              >
                Manage Product
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;