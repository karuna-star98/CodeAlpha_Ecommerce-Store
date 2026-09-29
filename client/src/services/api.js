const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {})
    }
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.message || 'Request failed');
  return data;
}

export function getProducts(params = {}) {
  const query = new URLSearchParams();
  if (params.search) query.set('search', params.search);
  if (params.category && params.category !== 'All') query.set('category', params.category);
  const suffix = query.toString() ? `?${query.toString()}` : '';
  return request(`/products${suffix}`);
}

export function getProduct(id) {
  return request(`/products/${id}`);
}

export function registerUser(payload) {
  return request('/auth/register', { method: 'POST', body: JSON.stringify(payload) });
}

export function loginUser(payload) {
  return request('/auth/login', { method: 'POST', body: JSON.stringify(payload) });
}

export function getMe(token) {
  return request('/auth/me', { headers: { Authorization: `Bearer ${token}` } });
}

export function getCart(token) {
  return request('/cart', { headers: { Authorization: `Bearer ${token}` } });
}

export function addCartItem(token, payload) {
  return request('/cart/items', {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: JSON.stringify(payload)
  });
}

export function updateCartItem(token, productId, quantity) {
  return request(`/cart/items/${productId}`, {
    method: 'PATCH',
    headers: { Authorization: `Bearer ${token}` },
    body: JSON.stringify({ quantity })
  });
}

export function removeCartItem(token, productId) {
  return request(`/cart/items/${productId}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` }
  });
}

export function createOrder(token, shippingAddress) {
  return request('/orders', {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: JSON.stringify({ shippingAddress })
  });
}

export function getOrders(token) {
  return request('/orders', { headers: { Authorization: `Bearer ${token}` } });
}

export function getOrder(token, id) {
  return request(`/orders/${id}`, { headers: { Authorization: `Bearer ${token}` } });
}
