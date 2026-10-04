
import { useNavigate } from 'react-router';
import { useState } from 'react';
import { createStore } from '../../services/storeService';

const CreateStore = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    phone: '',
    email: '',
    address: '',
    logo: '',
    slug: ''
  });

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
      await createStore(formData);
      navigate('/stores');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="create-store-page">
      <button
        type="button"
        onClick={() => navigate('/stores')}
      >
        Back to My Stores
      </button>

      <h1>Create Your Store</h1>
      <p>Set up your store information to get started.</p>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Store Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your store name"
            required
          />
        </div>

        <div>
          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Tell customers about your store"
            required
          />
        </div>

        <div>
          <label>Phone</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter your phone number"
            required
          />
        </div>

        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your store email"
            required
          />
        </div>

        <div>
          <label>Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Enter your store address"
            required
          />
        </div>

        <div>
          <label>Store Logo</label>
          <input
            type="text"
            name="logo"
            value={formData.logo}
            onChange={handleChange}
            placeholder="Enter your logo URL"
          />
        </div>

        <div>
          <label>Store URL</label>
          <input
            type="text"
            name="slug"
            value={formData.slug}
            onChange={handleChange}
            placeholder="your-store-name"
            required
          />
        </div>

        <button type="submit">
          Create Store
        </button>
      </form>
    </div>
  );
};

export default CreateStore;
