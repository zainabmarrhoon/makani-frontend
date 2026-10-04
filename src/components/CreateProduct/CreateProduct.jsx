import { useNavigate } from 'react-router';
import { useState } from 'react';

const CreateProduct = () => {
  const navigate = useNavigate();

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
    const imageUrls = event.target.value
      .split(',')
      .map((image) => image.trim())
      .filter((image) => image !== '');

    setFormData({
      ...formData,
      images: imageUrls
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log(formData);
  };

  return (
    <div className="create-product-page">
      <button
        type="button"
        onClick={() => navigate('/products')}
      >
        Back to Products
      </button>

      <h1>Add New Product</h1>
      <p>Add the details of your product.</p>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Product Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter product name"
          />
        </div>

        <div>
          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe your product"
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
            min="0"
            step="0.01"
          />
        </div>

        <div>
          <label>Product Images</label>
          <input
            type="text"
            onChange={handleImagesChange}
            placeholder="image1 URL, image2 URL, image3 URL"
          />
          <p>Add multiple image URLs separated by commas.</p>
        </div>

        <button type="submit">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default CreateProduct;