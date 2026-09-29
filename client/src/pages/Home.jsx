import { useEffect, useMemo, useState } from 'react';
import { getProducts } from '../services/api';
import ProductCard from '../components/ProductCard';
import LoadingState from '../components/LoadingState';
import ErrorMessage from '../components/ErrorMessage';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');

  useEffect(() => {
    setLoading(true);
    getProducts({ search, category })
      .then(setProducts)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [search, category]);

  const categories = useMemo(() => ['All', ...new Set(products.map((p) => p.category))], [products]);

  return (
    <main>
      <section className="hero">
        <div className="container hero-inner">
          <div>
            <span className="eyebrow">CodeAlpha • Full Stack Development</span>
            <h1>Everything you need, in one simple store.</h1>
            <p>Browse products, manage your persistent cart, checkout securely, and keep your order history in one place.</p>
            <a href="#catalogue" className="primary-button">Explore products</a>
          </div>
          <div className="hero-card">
            <span>Built end-to-end</span>
            <strong>React → REST API → MongoDB</strong>
            <small>Authentication • Cart • Orders • Validation</small>
          </div>
        </div>
      </section>

      <section className="container catalogue" id="catalogue">
        <div className="section-heading">
          <div>
            <span className="eyebrow">Catalogue</span>
            <h2>Featured products</h2>
          </div>
          <span className="result-count">{products.length} products</span>
        </div>
        <div className="toolbar">
          <input aria-label="Search products" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by product name..." />
          <select value={category} onChange={(e) => setCategory(e.target.value)} aria-label="Filter category">
            {categories.map((item) => <option key={item}>{item}</option>)}
          </select>
        </div>
        {notice && <div className="success-banner">{notice}</div>}
        {error && <ErrorMessage message={error} />}
        {loading ? <LoadingState message="Loading products..." /> : products.length === 0 ? <div className="state-card"><h3>No products found</h3><p>Try another search or category.</p></div> : (
          <div className="product-grid">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} onAdded={(name) => setNotice(`${name} added to your cart.`)} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
