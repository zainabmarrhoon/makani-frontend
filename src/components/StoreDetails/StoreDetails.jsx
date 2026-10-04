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

      <h1>Store Details</h1>
      <p>Store ID: {storeId}</p>

      <div>
        <h2>Manage Your Store</h2>

        <button
          type="button"
          onClick={() => navigate(`/stores/${storeId}/products`)}
        >
          Products
        </button>

        <button
          type="button"
          onClick={() => navigate(`/stores/${storeId}/orders`)}
        >
          Orders
        </button>
      </div>
    </div>
  );
};

export default StoreDetails;