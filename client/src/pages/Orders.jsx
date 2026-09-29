import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getOrders } from '../services/api';
import { useAuth } from '../context/AuthContext';
import LoadingState from '../components/LoadingState';
import ErrorMessage from '../components/ErrorMessage';

export default function Orders() {
  const { token } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getOrders(token).then(setOrders).catch((err) => setError(err.message)).finally(() => setLoading(false));
  }, [token]);

  if (loading) return <LoadingState message="Loading your orders..." />;

  return (
    <main className="container page">
      <div className="section-heading"><div><span className="eyebrow">Order history</span><h1>My Orders</h1></div><Link to="/" className="secondary-button">Shop products</Link></div>
      {error && <ErrorMessage message={error} />}
      {!orders.length ? <div className="empty-card"><h2>No orders yet</h2><p>Your completed checkouts will appear here.</p><Link to="/" className="primary-button">Start shopping</Link></div> : (
        <div className="orders-list">
          {orders.map((order) => (
            <Link className="order-card" key={order._id} to={`/orders/${order._id}`}>
              <div><span className="muted">#{order._id.slice(-8)}</span><h3>{order.items.length} item(s)</h3><small>{new Date(order.createdAt).toLocaleString()}</small></div>
              <div className="order-card-right"><span className="status-pill">{order.status}</span><strong>₹{order.totalAmount.toLocaleString('en-IN')}</strong></div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
