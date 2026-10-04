import { useNavigate, useParams } from 'react-router';

const StoreProducts = () => {
  const navigate = useNavigate();
  const { storeId } = useParams();

  const products = [];

  const createProduct = () => {
    navigate(`/products/create?storeId=${storeId}`);
  };

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
          onClick={createProduct}
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
            onClick={createProduct}
          >
            Add Your First Product
          </button>
        </div>
      ) : (
        <div className="store-products-list">
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

export default StoreProducts;