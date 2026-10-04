const CreateStore = () => {
  return (
    <div className="create-store-page">
      <h1>Create Your Store</h1>
      <p>Set up your store information to get started.</p>

      <form>
        <div>
          <label>Store Name</label>
          <input
            type="text"
            placeholder="Enter your store name"
          />
        </div>

        <div>
          <label>Description</label>
          <textarea
            placeholder="Tell customers about your store"
          />
        </div>

        <div>
          <label>Phone</label>
          <input
            type="text"
            placeholder="Enter your phone number"
          />
        </div>

        <div>
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your store email"
          />
        </div>

        <div>
          <label>Address</label>
          <input
            type="text"
            placeholder="Enter your store address"
          />
        </div>

        <div>
          <label>Store URL</label>
          <input
            type="text"
            placeholder="your-store-name"
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