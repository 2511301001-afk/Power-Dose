const API_BASE_URL = 'http://localhost:8000/api';

export const fetchProducts = async (category = null, search = null, sortBy = null) => {
  try {
    const params = new URLSearchParams();
    if (category) params.append('category', category);
    if (search) params.append('search', search);
    if (sortBy) params.append('sort_by', sortBy);

    const res = await fetch(`${API_BASE_URL}/products?${params.toString()}`);
    if (!res.ok) throw new Error('Failed to fetch products');
    return await res.json();
  } catch (err) {
    console.warn('Backend offline or error, using local fallback:', err);
    return null;
  }
};

export const fetchProductById = async (id) => {
  try {
    const res = await fetch(`${API_BASE_URL}/products/${id}`);
    if (!res.ok) throw new Error('Product not found');
    return await res.json();
  } catch (err) {
    console.warn('Backend offline or error:', err);
    return null;
  }
};

export const fetchCategories = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/categories`);
    if (!res.ok) throw new Error('Failed to fetch categories');
    return await res.json();
  } catch (err) {
    console.warn('Backend offline or error:', err);
    return null;
  }
};

export const fetchArticles = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/articles`);
    if (!res.ok) throw new Error('Failed to fetch articles');
    return await res.json();
  } catch (err) {
    console.warn('Backend offline or error:', err);
    return null;
  }
};

export const fetchOffers = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/offers`);
    if (!res.ok) throw new Error('Failed to fetch offers');
    return await res.json();
  } catch (err) {
    console.warn('Backend offline or error:', err);
    return null;
  }
};

export const createOrder = async (orderData) => {
  try {
    const res = await fetch(`${API_BASE_URL}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderData)
    });
    if (!res.ok) throw new Error('Failed to place order');
    return await res.json();
  } catch (err) {
    console.error('Order creation error:', err);
    throw err;
  }
};
