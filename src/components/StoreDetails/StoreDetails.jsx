import { useNavigate, useParams } from 'react-router';

const StoreDetails = () => {
  const navigate = useNavigate();
  const { storeId } = useParams();

  return (
    <div className="store-details-page">
      <button
        type="button"
        onClick={() => navigate('/stores')}
      >
        Back to My Stores
      </button>

      <div className="store-details-header">
        <h1>Store Details</h1>
        <p>Manage your store</p>
      </div>

      <div className="store-details-actions">
        <button
          type="button"
          onClick={() =>
            navigate(`/stores/${storeId}/products`)
          }
        >
          Manage Products
        </button>

        <button
          type="button"
          onClick={() =>
            navigate(`/stores/${storeId}/orders`)
          }
        >
          View Orders
        </button>

        <button
          type="button"
          onClick={() =>
            navigate(
              `/stores/${storeId}/notifications`
            )
          }
        >
          Notifications
        </button>
      </div>
    </div>
  );
};

export default StoreDetails;