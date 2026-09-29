import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ErrorMessage from '../components/ErrorMessage';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  async function submit(e) {
    e.preventDefault(); setError(''); setBusy(true);
    try { await login(form); navigate(location.state?.from || '/'); }
    catch (err) { setError(err.message); }
    finally { setBusy(false); }
  }

  return (
    <main className="container auth-page">
      <div className="auth-card">
        <span className="eyebrow">Welcome back</span>
        <h1>Login to ShopSphere</h1>
        <p className="muted">Use your account to keep your cart and orders in MongoDB.</p>
        {error && <ErrorMessage message={error} />}
        <form onSubmit={submit} className="form-stack">
          <label>Email<input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@example.com" /></label>
          <label>Password<input type="password" required minLength="6" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder="••••••••" /></label>
          <button className="primary-button full" disabled={busy}>{busy ? 'Logging in...' : 'Login'}</button>
        </form>
        <p className="auth-footer">New here? <Link to="/register">Create an account</Link></p>
      </div>
    </main>
  );
}
