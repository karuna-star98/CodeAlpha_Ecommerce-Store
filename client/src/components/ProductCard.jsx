import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export default function ProductCard({ product, onAdded }) {
  const { addItem } = useCart();
  const { user } = useAuth();
  const outOfStock = product.stock === 0;

  async function handleAdd() {
    if (!user) return;
    await addItem(product._id);
    onAdded?.(product.name);
  }

  return (
    <article className="product-card">
      <Link to={`/products/${product._id}`} className="product-image-wrap">
        <img src={product.imageUrl} alt={product.name} />
        <span className="category-pill">{product.category}</span>
      </Link>
      <div className="product-card-body">
        <Link to={`/products/${product._id}`}><h3>{product.name}</h3></Link>
        <p className="product-description">{product.description}</p>
        <div className="product-meta">
          <span className="price">₹{product.price.toLocaleString('en-IN')}</span>
          <span className={product.stock > 0 ? 'stock good' : 'stock bad'}>{outOfStock ? 'Out of stock' : `${product.stock} left`}</span>
        </div>
        <button className="primary-button full" disabled={outOfStock || !user} onClick={handleAdd}>
          {!user ? 'Login to Add' : outOfStock ? 'Unavailable' : 'Add to Cart'}
        </button>
      </div>
    </article>
  );
}
