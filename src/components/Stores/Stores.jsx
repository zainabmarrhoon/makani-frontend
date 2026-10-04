
import { useNavigate } from 'react-router';

const Stores = () => {
  const navigate = useNavigate();
  const stores = [];

  return (
    <div className="stores-page">
      <div className="stores-header">
        <div>
          <h1>My Stores</h1>
          <p>Manage your online stores.</p>
        </div>

        {stores.length > 0 && (
          <button
            className="create-store-btn"
            onClick={() => navigate('/stores/create')}
          >
            Create New Store
          </button>
        )}
      </div>

      {stores.length === 0 ? (
        <div className="stores-empty">
          <h2>No stores yet</h2>
          <p>Start building your online store with Makani.</p>

          <button
            className="create-store-btn"
            onClick={() => navigate('/stores/create')}
          >
            Create Your First Store
          </button>
        </div>
      ) : (
        <div className="stores-list">
          {stores.map((store) => (
            <div className="store-card" key={store.id}>
              <h2>{store.name}</h2>
              <p>{store.description}</p>

              <button
                className="manage-store-btn"
                onClick={() => navigate(`/stores/${store.id}`)}
              >
                Manage Store
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Stores;

