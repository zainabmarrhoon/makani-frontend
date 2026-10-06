
import { useNavigate, useSearchParams } from 'react-router';
import { useState } from 'react';
import { createProduct } from '../../services/productService';

const CreateProduct = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const storeId = searchParams.get('storeId');

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    image: null
  });

  const [message, setMessage] = useState('');

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

      await createProduct(storeId, formData);

      navigate(`/stores/${storeId}`);
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <div className="create-product-page">
      <button
        type="button"
        className="back-page-button"
        onClick={() => navigate(`/stores/${storeId}`)}
      >
        Back to Store
      </button>

      <h1>Add Product</h1>

      <p>
        Add a product to your store
      </p>

      {message && <p>{message}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Product Name</label>

          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter product name"
            required
          />
        </div>

        <div>
          <label>Description</label>

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe your product"
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
            placeholder="Enter product price"
            step="0.01"
            min="0"
            required
          />
        </div>

        <div>
          <label>Product Image</label>

          <input
            type="file"
            name="image"
            onChange={handleChange}
            accept="image/jpeg,image/png,image/webp"
          />
        </div>

        <button type="submit">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default CreateProduct;
