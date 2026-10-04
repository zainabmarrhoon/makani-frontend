import { useNavigate, useParams } from 'react-router';

const ProductDetails = () => {
  const navigate = useNavigate();
  const { productId } = useParams();

  const product = null;

  return (
    <div className="product-details-page">
      <button
        type="button"
        onClick={() => navigate(-1)}
      >
        Back
      </button>

      {product === null ? (
        <div className="product-details-empty">
          <h1>Product Details</h1>
          <p>Product ID: {productId}</p>
          <p>Product information will appear here.</p>
        </div>
      ) : (
        <div className="product-details">
          <div className="product-gallery">
            {product.images?.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`${product.name} ${index + 1}`}
              />
            ))}
          </div>

          <div className="product-info">
            <h1>{product.name}</h1>
            <p>{product.description}</p>
            <p>{product.price} BHD</p>

            <button type="button">
              Add to Cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;