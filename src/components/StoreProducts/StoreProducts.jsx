
import { useEffect, useState, useContext } from 'react';
import { useNavigate, useParams } from 'react-router';
import { CartContext } from '../../contexts/CartContext';
import { getPublicStore } from '../../services/storeService';
import {
  getStoreProducts,
  deleteProduct
} from '../../services/productService';

const BASE_URL = import.meta.env.VITE_BACK_END_SERVER_URL;

const StoreProducts = () => {
  const navigate = useNavigate();
  const { slug, storeId } = useParams();

  const { addToCart } = useContext(CartContext);

  const [store, setStore] = useState(null);
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState('');

  const isOwner = Boolean(storeId);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        if (isOwner) {
          const data = await getStoreProducts(storeId);
          setProducts(data);
        } else {
          const data = await getPublicStore(slug);
          setStore(data);
          setProducts(data.products || []);
        }
      } catch (err) {
        setMessage(err.message);
      }
    };

    loadProducts();
  }, [storeId, slug, isOwner]);

  const handleAddProduct = () => {
    navigate(`/products/create?storeId=${storeId}`);
  };

  const handleEditProduct = (productId) => {
    navigate(`/products/${productId}/edit`);
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await deleteProduct(productId);

      setProducts(
        products.filter((product) => product.id !== productId)
      );
    } catch (err) {
      setMessage(err.message);
    }
  };

  const handleAddToCart = (product) => {
    addToCart({
      ...product,
      store_id: product.store_id || store.id
    });

    navigate(`/store/${store.slug}/cart`);
  };

  const handleViewProduct = (productId) => {
    if (isOwner) {
      navigate(`/products/${productId}`);
      return;
    }

    navigate(
      `/store/${store.slug}/products/${productId}`
    );
  };

  if (message) {
    return (
      <div className="store-products-page">
        <p>{message}</p>
      </div>
    );
  }

  return (
    <div className="store-products-page">
      <section className="store-products-header">
        <h1>
          {isOwner ? 'Manage Products' : 'Products'}
        </h1>

        {isOwner && (
          <button
            type="button"
            onClick={handleAddProduct}
          >
            Add Product
          </button>
        )}
      </section>

      {products.length === 0 ? (
        <div className="products-empty">
          <h2>No products yet</h2>

          <p>
            {isOwner
              ? 'Add a product to your store'
              : 'This store has not added any products'}
          </p>

          {isOwner && (
            <button
              type="button"
              onClick={handleAddProduct}
            >
              Add Product
            </button>
          )}
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

              {isOwner ? (
                <>
                  <button
                    type="button"
                    onClick={() =>
                      handleEditProduct(product.id)
                    }
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      handleDeleteProduct(product.id)
                    }
                  >
                    Delete
                  </button>
                </>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={() =>
                      handleViewProduct(product.id)
                    }
                  >
                    View Product
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      handleAddToCart(product)
                    }
                  >
                    Add to Cart
                  </button>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StoreProducts;
