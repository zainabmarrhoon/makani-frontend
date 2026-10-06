import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { getStores } from '../../services/storeService';

const Products = () => {
  const navigate = useNavigate();

  const [stores, setStores] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const loadStores = async () => {
      try {
        const data = await getStores();
        setStores(data);
      } catch (err) {
        setMessage(err.message);
      }
    };

    loadStores();
  }, []);

  const handleAddProduct = (storeId) => {
    navigate(`/products/create?storeId=${storeId}`);
  };

  const handleManageProducts = (storeId) => {
    navigate(`/stores/${storeId}/products`);
  };

  return (
    <div className="products-page">
      <div className="products-header">
        <div>
          <h1>Products</h1>
          <p>Manage your store products</p>
        </div>
      </div>

      {message && <p>{message}</p>}

      {stores.length === 0 ? (
        <div className="products-empty">
          <h2>No stores yet</h2>

          <p>
            Create a store before adding products.
          </p>

          <button
            className="add-product-btn"
            type="button"
            onClick={() => navigate('/stores/create')}
          >
            Create Your First Store
          </button>
        </div>
      ) : (
        <div className="products-list">
          {stores.map((store) => (
            <div
              className="product-card"
              key={store.id}
            >
              <h2>{store.name}</h2>

              <p>
                Manage the products for this store.
              </p>

              <button
                type="button"
                onClick={() =>
                  handleAddProduct(store.id)
                }
              >
                Add Product
              </button>

              <button
                type="button"
                onClick={() =>
                  handleManageProducts(store.id)
                }
              >
                Manage Products
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;