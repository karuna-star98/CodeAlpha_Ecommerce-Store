import { Link, useLocation, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getOrder } from '../services/api';
import { useAuth } from '../context/AuthContext';
import LoadingState from '../components/LoadingState';
import ErrorMessage from '../components/ErrorMessage';

export default function OrderConfirmation() {
  const { id } = useParams();
  const { token } = useAuth();
  const location = useLocation();
  const [order, setOrder] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    getOrder(token, id).then(setOrder).catch((err) => setError(err.message));
  }, [id, token]);

  if (error) return <main className="container page"><ErrorMessage message={error} /></main>;
  if (!order) return <LoadingState message="Loading order..." />;

  return (
    <main className="container page">
      <div className="confirmation-card">
        <div className="success-icon">✓</div>
        <span className="eyebrow">{location.state?.created ? 'Order placed successfully' : 'Order details'}</span>
        <h1>Thank you for your order.</h1>
        <p className="muted">Order ID: <strong>{order._id}</strong></p>
        <div className="order-status"><span>Status</span><strong>{order.status}</strong></div>
        <div className="order-lines">
          {order.items.map((item) => <div className="mini-line" key={`${item.productId}-${item.name}`}><span>{item.name} × {item.quantity}</span><strong>₹{(item.price * item.quantity).toLocaleString('en-IN')}</strong></div>)}
        </div>
        <div className="summary-row total"><span>Total</span><strong>₹{order.totalAmount.toLocaleString('en-IN')}</strong></div>
        <div className="address-box"><span>Shipping address</span><p>{order.shippingAddress}</p></div>
        <div className="button-row"><Link to="/orders" className="primary-button">View my orders</Link><Link to="/" className="secondary-button">Continue shopping</Link></div>
      </div>
    </main>
  );
}
