import { useNavigate, useParams } from 'react-router';

const StoreProducts = () => {
  const navigate = useNavigate();
  const { storeId } = useParams();
  const products = [];

  return (
    <div className="store-products-page">
      <button
        type="button"
        onClick={() => navigate(`/stores/${storeId}`)}
      >
        Back to Store
      </button>

      <div className="store-products-header">
        <div>
          <h1>Store Products</h1>
          <p>Manage the products in your store.</p>
        </div>

        <button
          type="button"
          onClick={() => navigate('/products/create')}
        >
          Add Product
        </button>
      </div>

      {products.length === 0 ? (
        <div className="store-products-empty">
          <h2>No products yet</h2>
          <p>Add your first product to start selling.</p>

          <button
            type="button"
            onClick={() => navigate('/products/create')}
          >
            Add Your First Product
          </button>
        </div>
      ) : (
        <div className="store-products-list">
          {products.map((product) => (
            <div className="product-card" key={product.id}>
              <h2>{product.name}</h2>
              <p>{product.description}</p>
              <p>{product.price} BHD</p>

              <button type="button">
                Manage Product
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StoreProducts;