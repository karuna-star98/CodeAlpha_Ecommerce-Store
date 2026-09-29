import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import ErrorMessage from '../components/ErrorMessage';
import { useState } from 'react';

export default function Cart() {
  const { cart, updateItem, removeItem, loading } = useCart();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  async function change(productId, quantity) {
    setError('');
    try { await updateItem(productId, quantity); }
    catch (err) { setError(err.message); }
  }

  async function remove(productId) {
    setError('');
    try { await removeItem(productId); }
    catch (err) { setError(err.message); }
  }

  if (!cart.items.length) {
    return <main className="container page"><div className="empty-card"><span className="empty-icon">🛒</span><h1>Your cart is empty</h1><p>Add a few products and they will stay saved to your account.</p><Link to="/" className="primary-button">Continue shopping</Link></div></main>;
  }

  return (
    <main className="container page">
      <div className="section-heading"><div><span className="eyebrow">Shopping cart</span><h1>Your items</h1></div><span className="muted">{cart.items.length} line item(s)</span></div>
      {error && <ErrorMessage message={error} />}
      <div className="cart-layout">
        <div className="cart-list">
          {cart.items.map((item) => (
            <div className="cart-item" key={item.product._id}>
              <img src={item.product.imageUrl} alt={item.product.name} />
              <div className="cart-item-main"><Link to={`/products/${item.product._id}`}><h3>{item.product.name}</h3></Link><p>₹{item.product.price.toLocaleString('en-IN')} each</p></div>
              <div className="qty-control"><button onClick={() => change(item.product._id, item.quantity - 1)} disabled={item.quantity <= 1 || loading}>−</button><span>{item.quantity}</span><button onClick={() => change(item.product._id, item.quantity + 1)} disabled={item.quantity >= item.product.stock || loading}>+</button></div>
              <strong className="line-total">₹{item.lineTotal.toLocaleString('en-IN')}</strong>
              <button className="remove-button" onClick={() => remove(item.product._id)}>Remove</button>
            </div>
          ))}
        </div>
        <aside className="summary-card">
          <span className="eyebrow">Order summary</span>
          <div className="summary-row"><span>Subtotal</span><strong>₹{cart.total.toLocaleString('en-IN')}</strong></div>
          <div className="summary-row"><span>Shipping</span><span>Calculated at checkout</span></div>
          <hr />
          <div className="summary-row total"><span>Total</span><strong>₹{cart.total.toLocaleString('en-IN')}</strong></div>
          <button className="primary-button full" onClick={() => navigate('/checkout')}>Proceed to checkout</button>
        </aside>
      </div>
    </main>
  );
}
