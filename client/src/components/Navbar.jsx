import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { count } = useCart();

  return (
    <header className="site-header">
      <div className="container nav-wrap">
        <Link className="brand" to="/">
          <span className="brand-mark">S</span>
          <span>ShopSphere</span>
        </Link>
        <nav className="nav-links">
          <NavLink to="/" end>Shop</NavLink>
          {user && <NavLink to="/orders">My Orders</NavLink>}
          <NavLink to="/cart">Cart <span className="cart-count">{count}</span></NavLink>
          {user ? (
            <button className="link-button" onClick={logout}>Logout</button>
          ) : (
            <NavLink to="/login">Login</NavLink>
          )}
        </nav>
      </div>
    </header>
  );
}
