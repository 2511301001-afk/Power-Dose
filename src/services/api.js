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
    console.warn('Backend offline or auth fallback:', err.message);
    const cleanEmail = email.trim().toLowerCase();

    // Check if user account was created locally
    try {
      const storedUsers = JSON.parse(localStorage.getItem('powerdose_saved_users') || '{}');
      if (storedUsers[cleanEmail]) {
        return {
          message: 'Login successful',
          token: `local_token_${Date.now()}`,
          user: storedUsers[cleanEmail]
        };
      }
    } catch (e) {
      console.warn('LocalStorage read error:', e);
    }

    // Default Jack Hammer account or generate unique user account from email
    if (cleanEmail.includes('jack')) {
      return {
        message: 'Login successful',
        token: `local_token_${Date.now()}`,
        user: {
          id: 'PD-7719-ELITE',
          name: 'Jack Hammer',
          email: cleanEmail,
          rank: 'ELITE ATHLETE',
          memberSince: 'JAN 2024',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
          monthlyIntensity: 92,
          activeMission: {
            orderId: '#PD-8842-X',
            status: 'IN TRANSIT - DISPATCHED VIA SPEED EXPRESS',
            estDelivery: 'TOMORROW, 2:00 PM',
            itemsCount: 3,
            totalAmount: 124.98
          },
          stats: {
            totalOrders: 18,
            stackPoints: 4850,
            workoutsCompleted: 142,
            intensityScore: '9.8 / 10'
          },
          subscriptions: [
            { name: 'Titanium Whey Isolate (Double Chocolate)', frequency: 'Every 30 Days', price: 67.49, status: 'Active' },
            { name: 'Nuclear Pre-Workout (Atomic Sour Apple)', frequency: 'Every 45 Days', price: 44.99, status: 'Active' }
          ]
        }
      };
    }

    const username = cleanEmail.split('@')[0].replace(/[^a-zA-Z0-9]/g, ' ');
    const formattedName = username.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

    const newAccount = {
      id: `PD-${Math.floor(1000 + Math.random() * 9000)}-ATHLETE`,
      name: formattedName || 'Athlete',
      email: cleanEmail,
      rank: 'PRO ATHLETE',
      memberSince: 'OCT 2026',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
      monthlyIntensity: 85,
      stats: {
        totalOrders: 4,
        stackPoints: 1200,
        workoutsCompleted: 34,
        intensityScore: '8.8 / 10'
      },
      activeMission: {
        orderId: `#PD-${Math.floor(1000 + Math.random() * 9000)}-X`,
        status: 'ORDER CONFIRMED - READY FOR DISPATCH',
        estDelivery: '2 DAYS VIA SPEED EXPRESS',
        itemsCount: 2,
        totalAmount: 89.98
      },
      subscriptions: [
        { name: 'Nuclear Pre-Workout Igniter (Atomic Sour Apple)', frequency: 'Every 30 Days', price: 49.99, status: 'Active' }
      ]
    };

    return {
      message: 'Login successful',
      token: `local_token_${Date.now()}`,
      user: newAccount
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
    console.warn('Backend offline or auth fallback:', err.message);
    const cleanEmail = email.trim().toLowerCase();

    const newUser = {
      id: `PD-${Math.floor(1000 + Math.random() * 9000)}-NEW`,
      name: name.trim() || 'New Athlete',
      email: cleanEmail,
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
        orderId: `#PD-WELCOME-${Math.floor(100 + Math.random() * 900)}`,
        status: 'WELCOME PACK PREPARED FOR SPEED EXPRESS',
        estDelivery: '3 DAYS VIA SPEED EXPRESS',
        itemsCount: 1,
        totalAmount: 0.00
      },
      subscriptions: []
    };

    // Store in localStorage for persistent logins under distinct account
    try {
      const storedUsers = JSON.parse(localStorage.getItem('powerdose_saved_users') || '{}');
      storedUsers[cleanEmail] = newUser;
      localStorage.setItem('powerdose_saved_users', JSON.stringify(storedUsers));
    } catch (e) {
      console.warn('LocalStorage write error:', e);
    }

    return {
      message: 'Account created successfully',
      token: `local_token_${Date.now()}`,
      user: newUser
    };
  }
};

