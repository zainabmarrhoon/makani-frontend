
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import {
  getStoreProducts,
  deleteProduct
} from '../../services/productService';

const BASE_URL = import.meta.env.VITE_BACK_END_SERVER_URL;

const StoreProducts = () => {
  const navigate = useNavigate();
  const { storeId } = useParams();

  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await getStoreProducts(storeId);
        setProducts(data);
      } catch (err) {
        setMessage(err.message);
      }
    };

    loadProducts();
  }, [storeId]);

  const handleDelete = async (productId) => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this product?'
    );

    if (!confirmed) {
      return;
    }

    try {
      setMessage('');

      await deleteProduct(productId);

      setProducts((currentProducts) =>
        currentProducts.filter(
          (product) => product.id !== productId
        )
      );
    } catch (err) {
      setMessage(err.message);
    }
  };

  const handleCreateProduct = () => {
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
        <h1>Store Products</h1>

        <p>
          Manage the products in your store
        </p>

        <button
          type="button"
          onClick={handleCreateProduct}
        >
          Create Product
        </button>
      </div>

      {message && <p>{message}</p>}

      {products.length === 0 ? (
        <div className="products-empty">
          <h2>No products yet</h2>

          <p>
            Create your first product to start
            selling
          </p>

          <button
            type="button"
            onClick={handleCreateProduct}
          >
            Create Your First Product
          </button>
        </div>
      ) : (
        <div className="store-products-list">
          {products.map((product) => (
            <div
              className="product-card"
              key={product.id}
            >
              {product.image && (
                <img
                  src={`${BASE_URL}/${product.image}`}
                  alt={product.name}
                />
              )}

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
                View Product
              </button>

              <button
                type="button"
                onClick={() =>
                  navigate(
                    `/products/${product.id}/edit`
                  )
                }
              >
                Edit Product
              </button>

              <button
                type="button"
                onClick={() =>
                  handleDelete(product.id)
                }
              >
                Delete Product
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StoreProducts;

