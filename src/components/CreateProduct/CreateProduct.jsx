import { useNavigate, useSearchParams } from 'react-router';
import { useState } from 'react';

const CreateProduct = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const storeId = searchParams.get('storeId');

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    images: []
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleImagesChange = (event) => {
    const images = event.target.value
      .split(',')
      .map((image) => image.trim())
      .filter(Boolean);

    setFormData({
      ...formData,
      images
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log({
      ...formData,
      storeId
    });

    navigate(`/stores/${storeId}/products`);
  };

  return (
    <div className="create-product-page">
      <button
        type="button"
        onClick={() =>
          navigate(
            storeId
              ? `/stores/${storeId}/products`
              : '/stores'
          )
        }
      >
        Back
      </button>

      <h1>Create Product</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Product Name</label>

          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter product name"
            required
          />
        </div>

        <div>
          <label htmlFor="description">Description</label>

          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter product description"
            required
          />
        </div>

        <div>
          <label htmlFor="price">Price</label>

          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Enter price"
            min="0"
            step="0.01"
            required
          />
        </div>

        <div>
          <label htmlFor="images">
            Product Images
          </label>

          <input
            type="text"
            id="images"
            name="images"
            onChange={handleImagesChange}
            placeholder="Paste image URLs separated by commas"
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