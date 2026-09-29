import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getProduct } from '../services/api';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import LoadingState from '../components/LoadingState';
import ErrorMessage from '../components/ErrorMessage';

export default function ProductDetails() {
  const { id } = useParams();
  const { addItem } = useCart();
  const { user } = useAuth();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');

  useEffect(() => {
    getProduct(id).then(setProduct).catch((err) => setError(err.message)).finally(() => setLoading(false));
  }, [id]);

  if (loading) return <LoadingState message="Loading product details..." />;
  if (error) return <main className="container page"><ErrorMessage message={error} /></main>;
  if (!product) return null;

  async function handleAdd() {
    await addItem(product._id, quantity);
    setNotice(`${quantity} × ${product.name} added to your cart.`);
  }

  return (
    <main className="container page">
      <Link to="/" className="back-link">← Back to store</Link>
      <div className="details-card">
        <div className="details-image"><img src={product.imageUrl} alt={product.name} /></div>
        <div className="details-copy">
          <span className="category-label">{product.category}</span>
          <h1>{product.name}</h1>
          <p className="details-description">{product.description}</p>
          <div className="details-price">₹{product.price.toLocaleString('en-IN')}</div>
          <p className="stock-line">{product.stock > 0 ? `${product.stock} items available` : 'Currently out of stock'}</p>
          <div className="quantity-row">
            <label htmlFor="qty">Quantity</label>
            <input id="qty" type="number" min="1" max={product.stock} value={quantity} onChange={(e) => setQuantity(Math.max(1, Math.min(product.stock || 1, Number(e.target.value))))} />
          </div>
          {!user && <div className="hint">Please <Link to="/login">login</Link> before adding items to a persistent cart.</div>}
          {notice && <div className="success-banner">{notice}</div>}
          <button className="primary-button" disabled={product.stock === 0 || !user} onClick={handleAdd}>Add to Cart</button>
        </div>
      </div>
    </main>
  );
}
