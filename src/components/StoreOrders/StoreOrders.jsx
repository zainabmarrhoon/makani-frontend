
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import {
  getStoreOrders,
  updateOrderStatus,
  updatePaymentStatus
} from '../../services/orderService';

const BASE_URL = import.meta.env.VITE_BACK_END_SERVER_URL;

const StoreOrders = () => {
  const navigate = useNavigate();
  const { storeId } = useParams();

  const [orders, setOrders] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const data = await getStoreOrders(storeId);
        setOrders(data);
      } catch (err) {
        setMessage(err.message);
      }
    };

    loadOrders();
  }, [storeId]);

  const handleOrderStatusChange = async (
    orderId,
    status
  ) => {
    try {
      setMessage('');

      const updatedOrder =
        await updateOrderStatus(orderId, status);

      setOrders((currentOrders) =>
        currentOrders.map((order) =>
          order.id === updatedOrder.id
            ? updatedOrder
            : order
        )
      );
    } catch (err) {
      setMessage(err.message);
    }
  };

  const handlePaymentStatusChange = async (
    orderId,
    paymentStatus
  ) => {
    try {
      setMessage('');

      const updatedOrder =
        await updatePaymentStatus(
          orderId,
          paymentStatus
        );

      setOrders((currentOrders) =>
        currentOrders.map((order) =>
          order.id === updatedOrder.id
            ? updatedOrder
            : order
        )
      );
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <div className="store-orders-page">

      <button
        type="button"
        onClick={() =>
          navigate(`/stores/${storeId}`)
        }
      >
        Back to Store
      </button>

      <div className="store-orders-header">
        <h1>Store Orders</h1>

        <p>
          View and manage orders for this store
        </p>
      </div>

      {message && <p>{message}</p>}

      {orders.length === 0 ? (
        <div className="orders-empty">
          <h2>No orders yet</h2>

          <p>
            Orders for this store will appear here
          </p>
        </div>
      ) : (
        <div className="store-orders-list">

          {orders.map((order) => (
            <div
              className="order-card"
              key={order.id}
            >

              <h2>
                Order #{order.id}
              </h2>

              <p>
                Customer: {order.customer_name}
              </p>

              <p>
                Phone: {order.customer_phone}
              </p>

              <p>
                Address: {order.customer_address}
              </p>

              <p>
                Payment Method: {order.payment_method}
              </p>

              <p>
                Total:{' '}
                {Number(
                  order.total_amount
                ).toFixed(2)} BHD
              </p>

              {order.payment_method === 'benefitpay' &&
                order.payment_proof && (
                  <div className="payment-proof">

                    <h3>
                      Payment Proof
                    </h3>

                    <img
                      src={`${BASE_URL}/${order.payment_proof}`}
                      alt="Payment proof"
                    />

                    <p>
                      Payment Status:{' '}
                      {order.payment_status}
                    </p>

                    {order.payment_status === 'pending' && (
                      <div>
                        <button
                          type="button"
                          onClick={() =>
                            handlePaymentStatusChange(
                              order.id,
                              'verified'
                            )
                          }
                        >
                          Verify Payment
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            handlePaymentStatusChange(
                              order.id,
                              'rejected'
                            )
                          }
                        >
                          Reject Payment
                        </button>
                      </div>
                    )}

                  </div>
                )}

              <div className="order-status-row">

                <span className="order-status-label">
                  Order Status
                </span>

                <span
                  className={`order-status-badge status-${order.status}`}
                >
                  {order.status}
                </span>

              </div>

              <div className="order-status-actions">

                <button
                  type="button"
                  onClick={() =>
                    handleOrderStatusChange(
                      order.id,
                      'confirmed'
                    )
                  }
                >
                  Confirm
                </button>

                <button
                  type="button"
                  onClick={() =>
                    handleOrderStatusChange(
                      order.id,
                      'preparing'
                    )
                  }
                >
                  Preparing
                </button>

                <button
                  type="button"
                  onClick={() =>
                    handleOrderStatusChange(
                      order.id,
                      'ready'
                    )
                  }
                >
                  Ready
                </button>

                <button
                  type="button"
                  onClick={() =>
                    handleOrderStatusChange(
                      order.id,
                      'delivered'
                    )
                  }
                >
                  Delivered
                </button>

              </div>

            </div>
          ))}

        </div>
      )}

    </div>
  );
};

export default StoreOrders;

