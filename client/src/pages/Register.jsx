import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ErrorMessage from '../components/ErrorMessage';

export default function Register() {
  const { register, login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  async function submit(e) {
    e.preventDefault(); setError(''); setBusy(true);
    try {
      await register(form);
      await login({ email: form.email, password: form.password });
      navigate('/');
    } catch (err) { setError(err.message); }
    finally { setBusy(false); }
  }

  return (
    <main className="container auth-page">
      <div className="auth-card">
        <span className="eyebrow">Create your account</span>
        <h1>Join ShopSphere</h1>
        <p className="muted">Registration uses bcrypt hashing on the backend; your password is never stored as plain text.</p>
        {error && <ErrorMessage message={error} />}
        <form onSubmit={submit} className="form-stack">
          <label>Name<input required minLength="2" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your name" /></label>
          <label>Email<input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@example.com" /></label>
          <label>Password<input type="password" required minLength="6" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder="At least 6 characters" /></label>
          <button className="primary-button full" disabled={busy}>{busy ? 'Creating account...' : 'Create account'}</button>
        </form>
        <p className="auth-footer">Already registered? <Link to="/login">Login</Link></p>
      </div>
    </main>
  );
}
