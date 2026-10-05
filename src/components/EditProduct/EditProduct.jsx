
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import {
  getProduct,
  updateProduct
} from '../../services/productService';

const BASE_URL = import.meta.env.VITE_BACK_END_SERVER_URL;

const EditProduct = () => {
  const navigate = useNavigate();
  const { productId } = useParams();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    image: null
  });

  const [currentImage, setCurrentImage] = useState('');
  const [storeId, setStoreId] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const product = await getProduct(productId);

        setFormData({
          name: product.name || '',
          description: product.description || '',
          price: product.price || '',
          image: null
        });

        setCurrentImage(product.image || '');
        setStoreId(product.store_id);
      } catch (err) {
        setMessage(err.message);
      }
    };

    loadProduct();
  }, [productId]);

  const handleChange = (event) => {
    const { name, value, files } = event.target;

    setFormData({
      ...formData,
      [name]: files ? files[0] : value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setMessage('');

      await updateProduct(productId, formData);

      if (storeId) {
        navigate(`/stores/${storeId}/products`);
      } else {
        navigate(-1);
      }
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <div className="edit-product-page">
      <button
        type="button"
        onClick={() => navigate(-1)}
      >
        Back
      </button>

      <h1>Edit Product</h1>

      {message && <p>{message}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Product Name</label>

          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Description</label>

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Price</label>

          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            step="0.01"
            min="0"
            required
          />
        </div>

        {currentImage && (
          <div>
            <label>Current Image</label>

            <img
              src={`${BASE_URL}/${currentImage}`}
              alt={formData.name}
              width="150"
            />
          </div>
        )}

        <div>
          <label>Change Product Image</label>

          <input
            type="file"
            name="image"
            onChange={handleChange}
            accept="image/jpeg,image/png,image/webp"
          />
        </div>

        <button type="submit">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditProduct;

