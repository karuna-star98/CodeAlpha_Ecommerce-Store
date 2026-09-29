import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { addCartItem, getCart, removeCartItem, updateCartItem } from '../services/api';
import { useAuth } from './AuthContext';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const { token } = useAuth();
  const [cart, setCart] = useState({ items: [], total: 0 });
  const [loading, setLoading] = useState(false);

  async function refreshCart() {
    if (!token) {
      setCart({ items: [], total: 0 });
      return;
    }
    setLoading(true);
    try { setCart(await getCart(token)); }
    finally { setLoading(false); }
  }

  useEffect(() => { refreshCart().catch(() => setCart({ items: [], total: 0 })); }, [token]);

  async function addItem(productId, quantity = 1) {
    await addCartItem(token, { productId, quantity });
    await refreshCart();
  }

  async function updateItem(productId, quantity) {
    await updateCartItem(token, productId, quantity);
    await refreshCart();
  }

  async function removeItem(productId) {
    await removeCartItem(token, productId);
    await refreshCart();
  }

  const count = cart.items.reduce((sum, item) => sum + item.quantity, 0);
  const value = useMemo(() => ({ cart, count, loading, refreshCart, addItem, updateItem, removeItem }), [cart, count, loading, token]);
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  return useContext(CartContext);
}
