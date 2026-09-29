import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createOrder } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import ErrorMessage from '../components/ErrorMessage';

export default function Checkout() {
  const { token } = useAuth();
  const { cart, refreshCart } = useCart();
  const navigate = useNavigate();
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  async function submit(e) {
    e.preventDefault(); setError(''); setBusy(true);
    try {
      const order = await createOrder(token, address);
      await refreshCart();
      navigate(`/orders/${order._id}`, { replace: true, state: { created: true } });
    } catch (err) { setError(err.message); }
    finally { setBusy(false); }
  }

  if (!cart.items.length) return <main className="container page"><div className="empty-card"><h1>No items to checkout</h1><Link to="/cart" className="primary-button">Go to cart</Link></div></main>;

  return (
    <main className="container page">
      <div className="section-heading"><div><span className="eyebrow">Checkout</span><h1>Confirm your order</h1></div><Link to="/cart" className="back-link">← Edit cart</Link></div>
      <div className="checkout-layout">
        <form className="panel form-stack" onSubmit={submit}>
          <h2>Shipping information</h2>
          {error && <ErrorMessage message={error} />}
          <label>Shipping address<textarea required minLength="10" rows="6" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="House / Street, Area, City, State, PIN" /></label>
          <div className="security-note"><strong>Server-side validation</strong><span>At checkout, the server reloads product prices and stock before creating the order.</span></div>
          <button className="primary-button full" disabled={busy}>{busy ? 'Processing order...' : 'Place order'}</button>
        </form>
        <aside className="summary-card">
          <span className="eyebrow">Your order</span>
          {cart.items.map((item) => <div className="mini-line" key={item.product._id}><span>{item.product.name} × {item.quantity}</span><strong>₹{item.lineTotal.toLocaleString('en-IN')}</strong></div>)}
          <hr /><div className="summary-row total"><span>Total</span><strong>₹{cart.total.toLocaleString('en-IN')}</strong></div>
        </aside>
      </div>
    </main>
  );
}
