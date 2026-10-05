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
    image: ''
  });

  const [message, setMessage] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setMessage('');

      await createProduct(storeId, {
        name: formData.name,
        description: formData.description,
        price: formData.price,
        image: formData.image
      });

      navigate(`/stores/${storeId}/products`);
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <div className="create-product-page">
      <button
        type="button"
        onClick={() =>
          navigate(`/stores/${storeId}/products`)
        }
      >
        Back to Products
      </button>

      <h1>Create Product</h1>

      <p>
        Add a new product to your store
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
          <label>Image URL</label>

          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="Enter image URL"
          />
        </div>

        <button type="submit">
          Create Product
        </button>
      </form>
    </div>
  );
};

export default CreateProduct;