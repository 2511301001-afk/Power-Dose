const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

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

export const loginUser = async (email, password) => {
  try {
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.detail || 'Login failed');
    return data;
  } catch (err) {
    console.warn('Backend offline or auth error, falling back to local session:', err.message);
    // Local fallback for smooth UI testing
    const username = email.split('@')[0].replace(/[^a-zA-Z0-9]/g, ' ');
    const formattedName = username.charAt(0).toUpperCase() + username.slice(1);
    return {
      message: 'Logged in (Local Mode)',
      token: `local_token_${Date.now()}`,
      user: {
        id: `PD-${Math.floor(1000 + Math.random() * 9000)}-ATHLETE`,
        name: formattedName || 'Jack Hammer',
        email: email,
        rank: 'ELITE ATHLETE',
        memberSince: 'OCT 2026',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
        monthlyIntensity: 94,
        stats: {
          totalOrders: 14,
          stackPoints: 3600,
          workoutsCompleted: 98,
          intensityScore: '9.5 / 10'
        },
        activeMission: {
          orderId: '#PD-9901-X',
          status: 'PREPARING DISPATCH VIA SPEED EXPRESS',
          estDelivery: 'OCT 8, 4:00 PM',
          itemsCount: 2,
          totalAmount: 112.50
        },
        subscriptions: [
          { name: 'Titanium Whey Isolate (Double Chocolate)', frequency: 'Every 30 Days', price: 67.49, status: 'Active' }
        ]
      }
    };
  }
};

export const signupUser = async (name, email, password, rank = 'PRO ATHLETE') => {
  try {
    const res = await fetch(`${API_BASE_URL}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password, rank })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.detail || 'Signup failed');
    return data;
  } catch (err) {
    console.warn('Backend offline or auth error, creating local session:', err.message);
    return {
      message: 'Account created (Local Mode)',
      token: `local_token_${Date.now()}`,
      user: {
        id: `PD-${Math.floor(1000 + Math.random() * 9000)}-PRO`,
        name: name || 'PowerDose Athlete',
        email: email,
        rank: rank || 'PRO ATHLETE',
        memberSince: 'OCT 2026',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
        monthlyIntensity: 80,
        stats: {
          totalOrders: 1,
          stackPoints: 500,
          workoutsCompleted: 5,
          intensityScore: '8.0 / 10'
        },
        activeMission: {
          orderId: '#PD-WELCOME-1',
          status: 'WELCOME PACK DISPATCHED',
          estDelivery: '3 DAYS VIA SPEED EXPRESS',
          itemsCount: 1,
          totalAmount: 0.00
        },
        subscriptions: []
      }
    };
  }
};

