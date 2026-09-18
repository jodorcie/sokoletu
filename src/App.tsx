// @ts-nocheck
import { useState, useEffect, createContext, useContext, useCallback } from 'react';

/* ============================================
   DATA & CONSTANTS
   ============================================ */

var categories = [
  { id: 'vegetables', name: 'Vegetables', emoji: '🥬', color: 'from-green-400 to-green-600' },
  { id: 'fruits', name: 'Fruits', emoji: '🍎', color: 'from-red-400 to-red-600' },
  { id: 'groceries', name: 'Groceries', emoji: '🌾', color: 'from-amber-400 to-amber-600' },
  { id: 'dairy', name: 'Dairy', emoji: '🥛', color: 'from-blue-200 to-blue-400' },
  { id: 'meat', name: 'Meat & Fish', emoji: '🥩', color: 'from-rose-400 to-rose-600' },
  { id: 'household', name: 'Household', emoji: '🏠', color: 'from-purple-400 to-purple-600' },
];

var products = [
  { id: 'v1', name: 'Fresh Tomatoes', price: 2500, unit: '1 kg', category: 'vegetables', emoji: '🍅', fresh: true, vendor: 'Kariakoo Market' },
  { id: 'v2', name: 'Green Spinach', price: 1500, unit: '1 bunch', category: 'vegetables', emoji: '🥬', fresh: true, vendor: 'Mzizima Market' },
  { id: 'v3', name: 'Onions', price: 3000, unit: '1 kg', category: 'vegetables', emoji: '🧅', fresh: true, vendor: 'Kariakoo Market' },
  { id: 'v4', name: 'Carrots', price: 2000, unit: '1 kg', category: 'vegetables', emoji: '🥕', fresh: true, vendor: 'Mzizima Market' },
  { id: 'v5', name: 'Bell Peppers', price: 4500, originalPrice: 5600, unit: '500g', category: 'vegetables', emoji: '🫑', discount: 20, vendor: 'Kariakoo Market' },
  { id: 'v6', name: 'Cabbage', price: 1800, unit: '1 head', category: 'vegetables', emoji: '🥬', fresh: true, vendor: 'Mzizima Market' },
  { id: 'v7', name: 'Eggplant', price: 2200, unit: '500g', category: 'vegetables', emoji: '🍆', fresh: true, vendor: 'Kariakoo Market' },
  { id: 'v8', name: 'Green Beans', price: 3500, originalPrice: 4100, unit: '500g', category: 'vegetables', emoji: '🫘', discount: 15, vendor: 'Mzizima Market' },
  { id: 'f1', name: 'Bananas', price: 2000, unit: '1 bunch', category: 'fruits', emoji: '🍌', fresh: true, vendor: 'Mzizima Market' },
  { id: 'f2', name: 'Mangoes', price: 5000, unit: '1 kg', category: 'fruits', emoji: '🥭', fresh: true, vendor: 'Kariakoo Market' },
  { id: 'f3', name: 'Pineapple', price: 3500, originalPrice: 4400, unit: '1 piece', category: 'fruits', emoji: '🍍', discount: 20, vendor: 'Mzizima Market' },
  { id: 'f4', name: 'Oranges', price: 4000, unit: '1 kg', category: 'fruits', emoji: '🍊', fresh: true, vendor: 'Kariakoo Market' },
  { id: 'f5', name: 'Avocados', price: 3000, unit: '3 pcs', category: 'fruits', emoji: '🥑', fresh: true, vendor: 'Mzizima Market' },
  { id: 'f6', name: 'Watermelon', price: 6000, originalPrice: 7000, unit: '1 piece', category: 'fruits', emoji: '🍉', discount: 15, vendor: 'Kariakoo Market' },
  { id: 'g1', name: 'Rice (Sambaa)', price: 8000, unit: '2 kg', category: 'groceries', emoji: '🍚', fresh: true, vendor: 'Kariakoo Market' },
  { id: 'g2', name: 'Maize Flour', price: 5500, unit: '2 kg', category: 'groceries', emoji: '🌽', vendor: 'Mzizima Market' },
  { id: 'g3', name: 'Cooking Oil', price: 12000, originalPrice: 13300, unit: '2 L', category: 'groceries', emoji: '🫗', discount: 10, vendor: 'Kariakoo Market' },
  { id: 'g4', name: 'Sugar', price: 4500, unit: '1 kg', category: 'groceries', emoji: '🍬', vendor: 'Mzizima Market' },
  { id: 'g5', name: 'Wheat Flour', price: 6000, unit: '2 kg', category: 'groceries', emoji: '🌾', vendor: 'Kariakoo Market' },
  { id: 'd1', name: 'Fresh Milk', price: 3500, unit: '1 L', category: 'dairy', emoji: '🥛', fresh: true, vendor: 'Mzizima Market' },
  { id: 'd2', name: 'Yoghurt', price: 2500, unit: '500ml', category: 'dairy', emoji: '🫙', vendor: 'Kariakoo Market' },
  { id: 'd3', name: 'Eggs', price: 8000, unit: '30 pcs', category: 'dairy', emoji: '🥚', fresh: true, vendor: 'Mzizima Market' },
  { id: 'd4', name: 'Cheese', price: 15000, originalPrice: 17600, unit: '250g', category: 'dairy', emoji: '🧀', discount: 15, vendor: 'Kariakoo Market' },
  { id: 'm1', name: 'Chicken', price: 18000, unit: '1 kg', category: 'meat', emoji: '🍗', fresh: true, vendor: 'Kariakoo Market' },
  { id: 'm2', name: 'Beef', price: 22000, unit: '1 kg', category: 'meat', emoji: '🥩', fresh: true, vendor: 'Mzizima Market' },
  { id: 'm3', name: 'Tilapia Fish', price: 12000, originalPrice: 15000, unit: '1 kg', category: 'meat', emoji: '🐟', discount: 20, vendor: 'Kariakoo Market' },
  { id: 'm4', name: 'Goat Meat', price: 25000, unit: '1 kg', category: 'meat', emoji: '🍖', vendor: 'Mzizima Market' },
  { id: 'm5', name: 'Prawns', price: 35000, originalPrice: 38900, unit: '500g', category: 'meat', emoji: '🦐', discount: 10, vendor: 'Kariakoo Market' },
  { id: 'h1', name: 'Dish Soap', price: 3500, unit: '750ml', category: 'household', emoji: '🧴', vendor: 'Mzizima Market' },
  { id: 'h2', name: 'Toilet Paper', price: 8000, unit: '12 rolls', category: 'household', emoji: '🧻', vendor: 'Kariakoo Market' },
  { id: 'h3', name: 'Laundry Detergent', price: 6500, originalPrice: 7600, unit: '1 kg', category: 'household', emoji: '🫧', discount: 15, vendor: 'Mzizima Market' },
  { id: 'h4', name: 'Garbage Bags', price: 4000, unit: '30 pcs', category: 'household', emoji: '🗑️', vendor: 'Kariakoo Market' },
];

var smartBasketData = {
  name: 'Your Weekly Smart Basket',
  items: ['Rice', 'Tomatoes', 'Onions', 'Chicken', 'Spinach', 'Cooking Oil', 'Milk', 'Eggs', 'Bananas'],
  estimatedTotal: 12500,
  savings: 1500,
  meals: 4,
};

var banners = [
  { id: 1, title: 'Fresh From the Farm', subtitle: 'Up to 20% off on vegetables today!', gradient: 'from-green-600 to-emerald-500', emoji: '🌿' },
  { id: 2, title: 'Weekend Special', subtitle: 'Free delivery on orders above TZS 15,000', gradient: 'from-teal-600 to-green-500', emoji: '🚚' },
  { id: 3, title: 'New Arrivals', subtitle: 'Fresh mangoes & pineapples in season', gradient: 'from-amber-500 to-orange-500', emoji: '🥭' },
];

function formatPrice(price) {
  return 'TZS ' + price.toLocaleString();
}

/* ============================================
   AUTH CONTEXT
   ============================================ */

var AuthContext = createContext(null);

function AuthProvider(props) {
  var _s = useState(null);
  var user = _s[0];
  var setUser = _s[1];

  useEffect(function() {
    // Seed default user account if not exists
    var users = JSON.parse(localStorage.getItem('sokoletu_users') || '[]');
    var joelExists = users.find(function(u) { return u.email === 'joel@gmail.com'; });
    if (!joelExists) {
      users.push({
        name: 'Joel',
        email: 'joel@gmail.com',
        phone: '+255 712 000 000',
        password: 'ngushwai'
      });
      localStorage.setItem('sokoletu_users', JSON.stringify(users));
    }

    var savedUser = localStorage.getItem('sokoletu_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        localStorage.removeItem('sokoletu_user');
      }
    }
  }, []);

  function login(email, password) {
    var users = JSON.parse(localStorage.getItem('sokoletu_users') || '[]');
    var foundUser = users.find(function(u) { return u.email === email && u.password === password; });
    if (foundUser) {
      var userData = { name: foundUser.name, email: foundUser.email, phone: foundUser.phone };
      setUser(userData);
      localStorage.setItem('sokoletu_user', JSON.stringify(userData));
      return { success: true };
    }
    return { success: false, error: 'Invalid email or password' };
  }

  function loginWithGoogle() {
    var googleUser = {
      name: 'Google User',
      email: 'user@gmail.com',
      phone: '+255 700 000 000',
      isGoogle: true
    };
    setUser(googleUser);
    localStorage.setItem('sokoletu_user', JSON.stringify(googleUser));
    return { success: true };
  }

  function signup(name, email, phone, password) {
    var users = JSON.parse(localStorage.getItem('sokoletu_users') || '[]');
    var exists = users.find(function(u) { return u.email === email; });
    if (exists) {
      return { success: false, error: 'Email already registered' };
    }
    var newUser = { name: name, email: email, phone: phone, password: password };
    users.push(newUser);
    localStorage.setItem('sokoletu_users', JSON.stringify(users));
    var userData = { name: name, email: email, phone: phone };
    setUser(userData);
    localStorage.setItem('sokoletu_user', JSON.stringify(userData));
    return { success: true };
  }

  function logout() {
    setUser(null);
    localStorage.removeItem('sokoletu_user');
  }

  function updateProfile(data) {
    var updatedUser = Object.assign({}, user, data);
    setUser(updatedUser);
    localStorage.setItem('sokoletu_user', JSON.stringify(updatedUser));
    // Also update in users list
    var users = JSON.parse(localStorage.getItem('sokoletu_users') || '[]');
    var idx = users.findIndex(function(u) { return u.email === user.email; });
    if (idx >= 0) {
      users[idx] = Object.assign({}, users[idx], data);
      localStorage.setItem('sokoletu_users', JSON.stringify(users));
    }
    return { success: true };
  }

  var value = {
    user: user,
    login: login,
    loginWithGoogle: loginWithGoogle,
    signup: signup,
    logout: logout,
    updateProfile: updateProfile
  };

  return <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>;
}

function useAuth() {
  var context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}

/* ============================================
   LOGIN PAGE
   ============================================ */

function LoginPage(props) {
  var auth = useAuth();
  var _s = useState({ email: '', password: '' });
  var form = _s[0];
  var setForm = _s[1];
  var _s2 = useState('');
  var error = _s2[0];
  var setError = _s2[1];
  var _s3 = useState(false);
  var loading = _s3[0];
  var setLoading = _s3[1];

  function handleSubmit(e) {
    e.preventDefault();
    setError('');
    if (!form.email || !form.password) {
      setError('Please fill in all fields');
      return;
    }
    setLoading(true);
    setTimeout(function() {
      var result = auth.login(form.email, form.password);
      setLoading(false);
      if (!result.success) {
        setError(result.error);
      }
    }, 800);
  }

  function handleGoogleLogin() {
    setLoading(true);
    setTimeout(function() {
      auth.loginWithGoogle();
      setLoading(false);
    }, 800);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1b4d3e] to-[#2d7a5f] flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-[#1b4d3e] to-[#2d7a5f] rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-2xl">S</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome to SOKOLETU</h1>
          <p className="text-gray-500 text-sm">Fresh local delivery at your doorstep</p>
        </div>

        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full flex items-center justify-center gap-3 px-4 py-3 border-2 border-gray-200 rounded-xl hover:bg-gray-50 transition-colors mb-4 disabled:opacity-50"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          <span className="font-medium text-gray-700">Continue with Google</span>
        </button>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-white text-gray-500">Or continue with email</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={form.email}
              onChange={function(e) { setForm(Object.assign({}, form, { email: e.target.value })); }}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#1b4d3e] focus:ring-1 focus:ring-[#1b4d3e]"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              value={form.password}
              onChange={function(e) { setForm(Object.assign({}, form, { password: e.target.value })); }}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#1b4d3e] focus:ring-1 focus:ring-[#1b4d3e]"
              placeholder="••••••••"
            />
          </div>

          {error ? (
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
              {error}
            </div>
          ) : null}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#1b4d3e] text-white font-semibold rounded-xl hover:bg-[#153d31] transition-colors disabled:opacity-50"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        {/* Demo Credentials Hint */}
        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-xl">
          <p className="text-xs font-semibold text-blue-800 mb-1">🔑 Demo Account</p>
          <p className="text-xs text-blue-700">Email: <span className="font-mono font-bold">joel@gmail.com</span></p>
          <p className="text-xs text-blue-700">Password: <span className="font-mono font-bold">ngushwai</span></p>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <button onClick={props.onSwitch} className="text-[#1b4d3e] font-semibold hover:underline">
              Sign Up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

/* ============================================
   SIGNUP PAGE
   ============================================ */

function SignupPage(props) {
  var auth = useAuth();
  var _s = useState({ name: '', email: '', phone: '', password: '', confirmPassword: '' });
  var form = _s[0];
  var setForm = _s[1];
  var _s2 = useState('');
  var error = _s2[0];
  var setError = _s2[1];
  var _s3 = useState(false);
  var loading = _s3[0];
  var setLoading = _s3[1];

  function handleSubmit(e) {
    e.preventDefault();
    setError('');
    
    if (!form.name || !form.email || !form.phone || !form.password || !form.confirmPassword) {
      setError('Please fill in all fields');
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    setTimeout(function() {
      var result = auth.signup(form.name, form.email, form.phone, form.password);
      setLoading(false);
      if (!result.success) {
        setError(result.error);
      }
    }, 800);
  }

  function handleGoogleSignup() {
    setLoading(true);
    setTimeout(function() {
      auth.loginWithGoogle();
      setLoading(false);
    }, 800);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1b4d3e] to-[#2d7a5f] flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-[#1b4d3e] to-[#2d7a5f] rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-2xl">S</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Create Account</h1>
          <p className="text-gray-500 text-sm">Join SOKOLETU for fresh local delivery</p>
        </div>

        <button
          onClick={handleGoogleSignup}
          disabled={loading}
          className="w-full flex items-center justify-center gap-3 px-4 py-3 border-2 border-gray-200 rounded-xl hover:bg-gray-50 transition-colors mb-4 disabled:opacity-50"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          <span className="font-medium text-gray-700">Sign up with Google</span>
        </button>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-white text-gray-500">Or sign up with email</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              value={form.name}
              onChange={function(e) { setForm(Object.assign({}, form, { name: e.target.value })); }}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#1b4d3e] focus:ring-1 focus:ring-[#1b4d3e]"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={form.email}
              onChange={function(e) { setForm(Object.assign({}, form, { email: e.target.value })); }}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#1b4d3e] focus:ring-1 focus:ring-[#1b4d3e]"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
            <input
              type="tel"
              value={form.phone}
              onChange={function(e) { setForm(Object.assign({}, form, { phone: e.target.value })); }}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#1b4d3e] focus:ring-1 focus:ring-[#1b4d3e]"
              placeholder="+255 712 345 678"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              value={form.password}
              onChange={function(e) { setForm(Object.assign({}, form, { password: e.target.value })); }}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#1b4d3e] focus:ring-1 focus:ring-[#1b4d3e]"
              placeholder="••••••••"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
            <input
              type="password"
              value={form.confirmPassword}
              onChange={function(e) { setForm(Object.assign({}, form, { confirmPassword: e.target.value })); }}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#1b4d3e] focus:ring-1 focus:ring-[#1b4d3e]"
              placeholder="••••••••"
            />
          </div>

          {error ? (
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
              {error}
            </div>
          ) : null}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#1b4d3e] text-white font-semibold rounded-xl hover:bg-[#153d31] transition-colors disabled:opacity-50"
          >
            {loading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <button onClick={props.onSwitch} className="text-[#1b4d3e] font-semibold hover:underline">
              Sign In
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

/* ============================================
   CART CONTEXT
   ============================================ */

var CartContext = createContext(null);

function CartProvider(props) {
  var _s = useState([]);
  var items = _s[0];
  var setItems = _s[1];

  function addItem(product) {
    setItems(function(prev) {
      var existing = null;
      for (var i = 0; i < prev.length; i++) {
        if (prev[i].id === product.id) { existing = prev[i]; break; }
      }
      if (existing) {
        return prev.map(function(item) {
          return item.id === product.id ? Object.assign({}, item, { quantity: item.quantity + 1 }) : item;
        });
      }
      return prev.concat([Object.assign({}, product, { quantity: 1 })]);
    });
  }

  function removeItem(productId) {
    setItems(function(prev) {
      return prev.filter(function(item) { return item.id !== productId; });
    });
  }

  function updateQuantity(productId, quantity) {
    if (quantity <= 0) {
      setItems(function(prev) { return prev.filter(function(item) { return item.id !== productId; }); });
      return;
    }
    setItems(function(prev) {
      return prev.map(function(item) {
        return item.id === productId ? Object.assign({}, item, { quantity: quantity }) : item;
      });
    });
  }

  function clearCart() { setItems([]); }

  var totalItems = 0;
  var subtotal = 0;
  for (var i = 0; i < items.length; i++) {
    totalItems += items[i].quantity;
    subtotal += items[i].price * items[i].quantity;
  }
  var deliveryFee = subtotal > 15000 ? 0 : 1500;
  var total = subtotal + deliveryFee;

  var value = {
    items: items, addItem: addItem, removeItem: removeItem,
    updateQuantity: updateQuantity, clearCart: clearCart,
    totalItems: totalItems, subtotal: subtotal, deliveryFee: deliveryFee, total: total
  };

  return <CartContext.Provider value={value}>{props.children}</CartContext.Provider>;
}

function useCart() {
  var context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
}

/* ============================================
   PRODUCT CARD
   ============================================ */

function ProductCard(props) {
  var cart = useCart();
  var product = props.product;
  var cartItem = null;
  for (var i = 0; i < cart.items.length; i++) {
    if (cart.items[i].id === product.id) { cartItem = cart.items[i]; break; }
  }

  return (
    <div className="bg-white rounded-2xl p-3 shadow-sm border border-gray-100 hover:shadow-md transition-all">
      <div className="relative">
        <div className="w-full h-24 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl flex items-center justify-center text-4xl mb-2">
          {product.emoji}
        </div>
        {product.discount ? (
          <span className="absolute top-1 left-1 px-2 py-0.5 bg-red-500 text-white text-[10px] font-bold rounded-lg">
            {product.discount}% OFF
          </span>
        ) : product.fresh ? (
          <span className="absolute top-1 left-1 px-2 py-0.5 bg-green-500 text-white text-[10px] font-bold rounded-lg">
            Fresh
          </span>
        ) : null}
      </div>
      <h4 className="text-sm font-semibold text-gray-900 truncate">{product.name}</h4>
      <p className="text-[10px] text-gray-400 mb-1">{product.unit} · {product.vendor}</p>
      <div className="flex items-center justify-between mt-1">
        <div>
          <span className="text-sm font-bold text-[#1b4d3e]">{formatPrice(product.price)}</span>
          {product.originalPrice ? (
            <span className="text-[10px] text-gray-400 line-through ml-1">{formatPrice(product.originalPrice)}</span>
          ) : null}
        </div>
        {cartItem ? (
          <div className="flex items-center gap-1">
            <button onClick={function() { cart.updateQuantity(product.id, cartItem.quantity - 1); }} className="w-7 h-7 flex items-center justify-center bg-gray-100 rounded-lg hover:bg-gray-200 text-sm font-bold">−</button>
            <span className="text-xs font-bold w-5 text-center">{cartItem.quantity}</span>
            <button onClick={function() { cart.updateQuantity(product.id, cartItem.quantity + 1); }} className="w-7 h-7 flex items-center justify-center bg-[#1b4d3e] text-white rounded-lg hover:bg-[#153d31] text-sm font-bold">+</button>
          </div>
        ) : (
          <button onClick={function() { cart.addItem(product); }} className="w-7 h-7 flex items-center justify-center bg-[#1b4d3e] text-white rounded-lg hover:bg-[#153d31] text-sm font-bold shadow-sm">+</button>
        )}
      </div>
    </div>
  );
}

/* ============================================
   NAV BUTTON
   ============================================ */

function NavButton(props) {
  var cart = useCart();
  var cls = 'flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all ' + (props.active ? 'text-[#1b4d3e]' : 'text-gray-400');
  return (
    <button onClick={props.onClick} className={cls}>
      <div className="relative">
        <span className="text-xl">{props.icon}</span>
        {props.label === 'Cart' && cart.totalItems > 0 ? (
          <span className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
            {cart.totalItems}
          </span>
        ) : null}
      </div>
      <span className={'text-[10px] ' + (props.active ? 'font-semibold' : '')}>{props.label}</span>
    </button>
  );
}

/* ============================================
   LOCATION MODAL
   ============================================ */

function LocationModal(props) {
  var _s = useState(props.currentLocation);
  var newLocation = _s[0];
  var setNewLocation = _s[1];
  var suggestions = ['Mikocheni, DSM', 'Masaki, DSM', 'Kinondoni, DSM', 'Mbezi Beach, DSM', 'Kariakoo, DSM', 'Upanga, DSM'];

  return (
    <div className="fixed inset-0 z-[100] bg-black/50 flex items-end justify-center" onClick={props.onClose}>
      <div className="bg-white w-full max-w-lg rounded-t-3xl p-6 animate-slide-up" onClick={function(e) { e.stopPropagation(); }}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-900">📍 Delivery Location</h3>
          <button onClick={props.onClose} className="p-2 hover:bg-gray-100 rounded-full text-lg">✕</button>
        </div>
        <input
          type="text"
          value={newLocation}
          onChange={function(e) { setNewLocation(e.target.value); }}
          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#1b4d3e] focus:ring-1 focus:ring-[#1b4d3e] mb-4"
          placeholder="Enter your location"
        />
        <p className="text-sm text-gray-500 mb-3">Suggested locations</p>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {suggestions.map(function(s) {
            return (
              <button key={s} onClick={function() { setNewLocation(s); }}
                className={'w-full text-left px-4 py-3 rounded-xl transition-colors ' + (newLocation === s ? 'bg-green-50 text-[#1b4d3e] border border-green-200' : 'hover:bg-gray-50 text-gray-700')}>
                📍 {s} {newLocation === s ? '✓' : ''}
              </button>
            );
          })}
        </div>
        <button onClick={function() { props.onSave(newLocation); }} className="w-full mt-4 py-3 bg-[#1b4d3e] text-white font-semibold rounded-xl hover:bg-[#153d31] transition-colors">
          Save Location
        </button>
      </div>
    </div>
  );
}

/* ============================================
   HOME PAGE
   ============================================ */

function HomePage(props) {
  var _s = useState(0);
  var bannerIndex = _s[0];
  var setBannerIndex = _s[1];
  var _s2 = useState('');
  var search = _s2[0];
  var setSearch = _s2[1];

  useEffect(function() {
    var timer = setInterval(function() {
      setBannerIndex(function(i) { return (i + 1) % banners.length; });
    }, 4000);
    return function() { clearInterval(timer); };
  }, []);

  var freshProducts = products.filter(function(p) { return p.fresh; }).slice(0, 6);
  var dealProducts = products.filter(function(p) { return p.discount; });

  return (
    <div className="px-4 py-4 space-y-6">
      <div className="relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
        <input type="text" value={search} onChange={function(e) { setSearch(e.target.value); }}
          placeholder="Search vegetables, fruits, groceries..."
          className="w-full pl-11 pr-4 py-3 bg-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#1b4d3e]/20 focus:bg-white transition-all text-sm" />
      </div>

      <div className="relative overflow-hidden rounded-2xl">
        <div className="flex transition-transform duration-500 ease-out" style={{ transform: 'translateX(-' + (bannerIndex * 100) + '%)' }}>
          {banners.map(function(banner) {
            return (
              <div key={banner.id} className={'min-w-full bg-gradient-to-r ' + banner.gradient + ' p-6 rounded-2xl text-white relative overflow-hidden'}>
                <div className="relative z-10">
                  <p className="text-xs font-medium opacity-80 mb-1">🔥 Today's Deal</p>
                  <h2 className="text-xl font-bold mb-1">{banner.title}</h2>
                  <p className="text-sm opacity-90">{banner.subtitle}</p>
                  <button className="mt-3 px-4 py-2 bg-white/20 rounded-lg text-sm font-medium hover:bg-white/30 transition-colors">Shop Now →</button>
                </div>
                <div className="absolute right-4 bottom-4 text-6xl opacity-30">{banner.emoji}</div>
              </div>
            );
          })}
        </div>
        <div className="absolute bottom-3 right-3 flex gap-1.5">
          {banners.map(function(_, i) {
            return <div key={i} className={'h-2 rounded-full transition-all ' + (i === bannerIndex ? 'bg-white w-5' : 'bg-white/50 w-2')} />;
          })}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-gray-900">Categories</h3>
          <button className="text-xs text-[#1b4d3e] font-medium">See All</button>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {categories.map(function(cat) {
            return (
              <button key={cat.id} onClick={function() { props.onCategorySelect(cat.id); }}
                className="flex flex-col items-center p-3 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all border border-gray-100">
                <div className={'w-12 h-12 rounded-xl bg-gradient-to-br ' + cat.color + ' flex items-center justify-center text-2xl mb-2 shadow-sm'}>
                  {cat.emoji}
                </div>
                <span className="text-xs font-medium text-gray-700">{cat.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="bg-gradient-to-br from-[#1b4d3e] to-[#2d7a5f] rounded-2xl p-5 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-yellow-300">⚡</span>
            <span className="text-xs font-medium text-green-200">Smart Recommendation</span>
          </div>
          <h3 className="text-lg font-bold mb-1">{smartBasketData.name}</h3>
          <p className="text-sm text-green-100 mb-3">
            {smartBasketData.items.slice(0, 5).join(', ')} & more for {smartBasketData.meals} meals
          </p>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xl font-bold">TZS {smartBasketData.estimatedTotal.toLocaleString()}</p>
              <p className="text-xs text-green-200">You save TZS {smartBasketData.savings.toLocaleString()} 💰</p>
            </div>
            <button className="px-4 py-2.5 bg-white text-[#1b4d3e] font-semibold rounded-xl text-sm hover:bg-green-50 transition-colors shadow-lg">
              View Basket
            </button>
          </div>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-gray-900">Fresh Today</h3>
            <span className="px-2 py-0.5 bg-green-100 text-green-700 text-[10px] font-bold rounded-full">LIVE</span>
          </div>
          <button className="text-xs text-[#1b4d3e] font-medium">See All</button>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {freshProducts.map(function(product) { return <ProductCard key={product.id} product={product} />; })}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-gray-900">Hot Deals 🔥</h3>
          <button className="text-xs text-[#1b4d3e] font-medium">See All</button>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {dealProducts.map(function(product) { return <ProductCard key={product.id} product={product} />; })}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 pt-2">
        <div className="flex flex-col items-center text-center p-3 bg-white rounded-xl border border-gray-100">
          <span className="text-xl mb-1">🚚</span>
          <span className="text-[10px] text-gray-600 font-medium">Fast Delivery</span>
        </div>
        <div className="flex flex-col items-center text-center p-3 bg-white rounded-xl border border-gray-100">
          <span className="text-xl mb-1">🛡️</span>
          <span className="text-[10px] text-gray-600 font-medium">Quality Assured</span>
        </div>
        <div className="flex flex-col items-center text-center p-3 bg-white rounded-xl border border-gray-100">
          <span className="text-xl mb-1">⏰</span>
          <span className="text-[10px] text-gray-600 font-medium">Same Day</span>
        </div>
      </div>
    </div>
  );
}

/* ============================================
   CATEGORIES PAGE
   ============================================ */

function CategoriesPage(props) {
  var filteredProducts = props.selectedCategory
    ? products.filter(function(p) { return p.category === props.selectedCategory; })
    : products;

  return (
    <div className="px-4 py-4">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Categories</h2>
      <div className="flex gap-2 overflow-x-auto pb-3 mb-4" style={{ scrollbarWidth: 'none' }}>
        <button onClick={function() { props.setSelectedCategory(null); }}
          className={'px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ' + (!props.selectedCategory ? 'bg-[#1b4d3e] text-white shadow-md' : 'bg-gray-100 text-gray-600')}>
          All
        </button>
        {categories.map(function(cat) {
          return (
            <button key={cat.id} onClick={function() { props.setSelectedCategory(cat.id); }}
              className={'px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all flex items-center gap-1.5 ' + (props.selectedCategory === cat.id ? 'bg-[#1b4d3e] text-white shadow-md' : 'bg-gray-100 text-gray-600')}>
              <span>{cat.emoji}</span><span>{cat.name}</span>
            </button>
          );
        })}
      </div>
      <div className="grid grid-cols-2 gap-3">
        {filteredProducts.map(function(product) { return <ProductCard key={product.id} product={product} />; })}
      </div>
    </div>
  );
}

/* ============================================
   CART PAGE
   ============================================ */

function CartPage() {
  var cart = useCart();
  var _s = useState(false);
  var showCheckout = _s[0];
  var setShowCheckout = _s[1];

  if (cart.items.length === 0) {
    return (
      <div className="px-4 py-16 text-center">
        <div className="text-6xl mb-4">🛒</div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
        <p className="text-gray-500 text-sm mb-6">Add fresh items from our local markets!</p>
        <div className="text-4xl">🥬 🍎 🥕</div>
      </div>
    );
  }

  return (
    <div className="px-4 py-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-900">My Cart ({cart.items.length})</h2>
        <button onClick={cart.clearCart} className="text-xs text-red-500 font-medium">Clear All</button>
      </div>

      <div className="space-y-3 mb-6">
        {cart.items.map(function(item) {
          return (
            <div key={item.id} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-center gap-3">
              <div className="w-14 h-14 bg-gray-50 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">{item.emoji}</div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-semibold text-gray-900 truncate">{item.name}</h4>
                <p className="text-xs text-gray-400">{item.unit}</p>
                <p className="text-sm font-bold text-[#1b4d3e]">{formatPrice(item.price * item.quantity)}</p>
              </div>
              <div className="flex flex-col items-end gap-2">
                <button onClick={function() { cart.removeItem(item.id); }} className="p-1 text-red-400 text-sm">🗑️</button>
                <div className="flex items-center gap-1.5">
                  <button onClick={function() { cart.updateQuantity(item.id, item.quantity - 1); }} className="w-7 h-7 flex items-center justify-center bg-gray-100 rounded-lg text-sm font-bold">−</button>
                  <span className="text-sm font-bold w-5 text-center">{item.quantity}</span>
                  <button onClick={function() { cart.updateQuantity(item.id, item.quantity + 1); }} className="w-7 h-7 flex items-center justify-center bg-[#1b4d3e] text-white rounded-lg text-sm font-bold">+</button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 mb-4">
        <h3 className="font-bold text-gray-900 mb-3">Order Summary</h3>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Subtotal</span>
            <span className="font-medium">{formatPrice(cart.subtotal)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Delivery Fee</span>
            <span className={'font-medium ' + (cart.deliveryFee === 0 ? 'text-green-600' : '')}>
              {cart.deliveryFee === 0 ? 'FREE' : formatPrice(cart.deliveryFee)}
            </span>
          </div>
          {cart.subtotal < 15000 ? (
            <p className="text-[10px] text-green-600 bg-green-50 px-2 py-1 rounded-lg">
              💡 Add {formatPrice(15000 - cart.subtotal)} more for free delivery!
            </p>
          ) : null}
          <div className="border-t border-gray-100 pt-2 mt-2">
            <div className="flex justify-between">
              <span className="font-bold text-gray-900">Total</span>
              <span className="font-bold text-lg text-[#1b4d3e]">{formatPrice(cart.total)}</span>
            </div>
          </div>
        </div>
      </div>

      <button onClick={function() { setShowCheckout(true); }}
        className="w-full py-4 bg-[#1b4d3e] text-white font-bold rounded-2xl hover:bg-[#153d31] transition-colors shadow-lg text-sm">
        Proceed to Checkout — {formatPrice(cart.total)}
      </button>

      {showCheckout ? (
        <div className="fixed inset-0 z-[100] bg-black/50 flex items-end justify-center">
          <div className="bg-white w-full max-w-lg rounded-t-3xl p-6 animate-slide-up">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold">Order Confirmed! 🎉</h3>
              <button onClick={function() { setShowCheckout(false); }} className="p-2 hover:bg-gray-100 rounded-full text-lg">✕</button>
            </div>
            <div className="text-center py-6">
              <div className="text-5xl mb-3">✅</div>
              <p className="text-gray-600 text-sm mb-2">Your order has been placed successfully!</p>
              <p className="text-gray-500 text-xs">Estimated delivery: 30-45 minutes</p>
              <div className="mt-4 p-4 bg-green-50 rounded-xl">
                <p className="text-sm font-medium text-green-800">Order #SKL-{Math.floor(Math.random() * 9000 + 1000)}</p>
                <p className="text-xs text-green-600 mt-1">Track your order in the Orders tab</p>
              </div>
            </div>
            <button onClick={function() { setShowCheckout(false); cart.clearCart(); }}
              className="w-full py-3 bg-[#1b4d3e] text-white font-semibold rounded-xl hover:bg-[#153d31] transition-colors">
              Done
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

/* ============================================
   ORDERS PAGE
   ============================================ */

function OrdersPage() {
  var mockOrders = [
    { id: 'SKL-4521', date: 'Today, 2:30 PM', status: 'Delivered', count: 5, total: 18500 },
    { id: 'SKL-4498', date: 'Yesterday, 10:15 AM', status: 'Delivered', count: 3, total: 12000 },
    { id: 'SKL-4467', date: 'Dec 18, 4:00 PM', status: 'Delivered', count: 8, total: 25000 },
  ];

  return (
    <div className="px-4 py-4">
      <h2 className="text-xl font-bold text-gray-900 mb-4">My Orders</h2>
      <div className="space-y-3">
        {mockOrders.map(function(order) {
          return (
            <div key={order.id} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-lg">✅</span>
                  <div>
                    <p className="text-sm font-bold text-gray-900">#{order.id}</p>
                    <p className="text-[10px] text-gray-400">{order.date}</p>
                  </div>
                </div>
                <span className="px-2.5 py-1 bg-green-100 text-green-700 text-[10px] font-bold rounded-full">{order.status}</span>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-gray-50">
                <span className="text-xs text-gray-500">{order.count} items</span>
                <span className="text-sm font-bold text-[#1b4d3e]">{formatPrice(order.total)}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ============================================
   EDIT PROFILE MODAL
   ============================================ */

function EditProfileModal(props) {
  var auth = useAuth();
  var user = auth.user;
  var _s = useState({
    name: user.name || '',
    email: user.email || '',
    phone: user.phone || ''
  });
  var form = _s[0];
  var setForm = _s[1];
  var _s2 = useState('');
  var error = _s2[0];
  var setError = _s2[1];

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone) {
      setError('Please fill in all fields');
      return;
    }
    var result = auth.updateProfile({
      name: form.name,
      email: form.email,
      phone: form.phone
    });
    if (result.success) {
      props.onClose();
    } else {
      setError(result.error || 'Failed to update profile');
    }
  }

  return (
    <div className="fixed inset-0 z-[100] bg-black/50 flex items-end justify-center" onClick={props.onClose}>
      <div className="bg-white w-full max-w-lg rounded-t-3xl p-6 animate-slide-up" onClick={function(e) { e.stopPropagation(); }}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-900">👤 Edit Profile</h3>
          <button onClick={props.onClose} className="p-2 hover:bg-gray-100 rounded-full text-lg">✕</button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              value={form.name}
              onChange={function(e) { setForm(Object.assign({}, form, { name: e.target.value })); }}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#1b4d3e] focus:ring-1 focus:ring-[#1b4d3e]"
              placeholder="Your full name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={form.email}
              onChange={function(e) { setForm(Object.assign({}, form, { email: e.target.value })); }}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#1b4d3e] focus:ring-1 focus:ring-[#1b4d3e]"
              placeholder="your@email.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
            <input
              type="tel"
              value={form.phone}
              onChange={function(e) { setForm(Object.assign({}, form, { phone: e.target.value })); }}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#1b4d3e] focus:ring-1 focus:ring-[#1b4d3e]"
              placeholder="+255 712 345 678"
            />
          </div>
          {error ? (
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">{error}</div>
          ) : null}
          <button type="submit" className="w-full py-3 bg-[#1b4d3e] text-white font-semibold rounded-xl hover:bg-[#153d31] transition-colors">
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}

/* ============================================
   ADDRESSES MODAL
   ============================================ */

function AddressesModal(props) {
  var _s = useState(function() {
    var saved = localStorage.getItem('sokoletu_addresses');
    return saved ? JSON.parse(saved) : [];
  });
  var addresses = _s[0];
  var setAddresses = _s[1];
  var _s2 = useState(false);
  var showAddForm = _s2[0];
  var setShowAddForm = _s2[1];
  var _s3 = useState({ label: '', street: '', city: '', region: '' });
  var form = _s3[0];
  var setForm = _s3[1];
  var _s4 = useState('');
  var error = _s4[0];
  var setError = _s4[1];

  function handleAdd(e) {
    e.preventDefault();
    if (!form.label || !form.street || !form.city) {
      setError('Please fill in all required fields');
      return;
    }
    var newAddress = Object.assign({}, form, { id: Date.now(), isDefault: addresses.length === 0 });
    var updated = addresses.concat([newAddress]);
    setAddresses(updated);
    localStorage.setItem('sokoletu_addresses', JSON.stringify(updated));
    setForm({ label: '', street: '', city: '', region: '' });
    setShowAddForm(false);
    setError('');
  }

  function handleDelete(id) {
    var updated = addresses.filter(function(a) { return a.id !== id; });
    setAddresses(updated);
    localStorage.setItem('sokoletu_addresses', JSON.stringify(updated));
  }

  function setDefault(id) {
    var updated = addresses.map(function(a) {
      return Object.assign({}, a, { isDefault: a.id === id });
    });
    setAddresses(updated);
    localStorage.setItem('sokoletu_addresses', JSON.stringify(updated));
  }

  return (
    <div className="fixed inset-0 z-[100] bg-black/50 flex items-end justify-center" onClick={props.onClose}>
      <div className="bg-white w-full max-w-lg rounded-t-3xl p-6 animate-slide-up max-h-[80vh] overflow-y-auto" onClick={function(e) { e.stopPropagation(); }}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-900">📍 Delivery Addresses</h3>
          <button onClick={props.onClose} className="p-2 hover:bg-gray-100 rounded-full text-lg">✕</button>
        </div>

        {addresses.length === 0 && !showAddForm ? (
          <div className="text-center py-8">
            <div className="text-5xl mb-3">📍</div>
            <p className="text-gray-500 text-sm mb-4">No addresses saved yet</p>
          </div>
        ) : null}

        <div className="space-y-3 mb-4">
          {addresses.map(function(addr) {
            return (
              <div key={addr.id} className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-sm text-gray-900">{addr.label}</span>
                      {addr.isDefault ? (
                        <span className="px-2 py-0.5 bg-green-100 text-green-700 text-[10px] font-bold rounded-full">Default</span>
                      ) : null}
                    </div>
                    <p className="text-xs text-gray-600">{addr.street}</p>
                    <p className="text-xs text-gray-500">{addr.city}{addr.region ? ', ' + addr.region : ''}</p>
                  </div>
                  <div className="flex gap-2">
                    {!addr.isDefault ? (
                      <button onClick={function() { setDefault(addr.id); }} className="text-xs text-[#1b4d3e] font-medium">Set Default</button>
                    ) : null}
                    <button onClick={function() { handleDelete(addr.id); }} className="text-xs text-red-500 font-medium">Delete</button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {showAddForm ? (
          <form onSubmit={handleAdd} className="space-y-3 p-4 bg-gray-50 rounded-xl border border-gray-200">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Label (e.g., Home, Work)</label>
              <input
                type="text"
                value={form.label}
                onChange={function(e) { setForm(Object.assign({}, form, { label: e.target.value })); }}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#1b4d3e]"
                placeholder="Home"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Street Address *</label>
              <input
                type="text"
                value={form.street}
                onChange={function(e) { setForm(Object.assign({}, form, { street: e.target.value })); }}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#1b4d3e]"
                placeholder="123 Ali Hassan Mwinyi Road"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">City *</label>
              <input
                type="text"
                value={form.city}
                onChange={function(e) { setForm(Object.assign({}, form, { city: e.target.value })); }}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#1b4d3e]"
                placeholder="Dar es Salaam"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Region</label>
              <input
                type="text"
                value={form.region}
                onChange={function(e) { setForm(Object.assign({}, form, { region: e.target.value })); }}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#1b4d3e]"
                placeholder="Kinondoni"
              />
            </div>
            {error ? (
              <div className="p-2 bg-red-50 border border-red-200 rounded-lg text-red-600 text-xs">{error}</div>
            ) : null}
            <div className="flex gap-2">
              <button type="button" onClick={function() { setShowAddForm(false); setError(''); }} className="flex-1 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg text-sm hover:bg-gray-50">
                Cancel
              </button>
              <button type="submit" className="flex-1 py-2 bg-[#1b4d3e] text-white font-medium rounded-lg text-sm hover:bg-[#153d31]">
                Add Address
              </button>
            </div>
          </form>
        ) : (
          <button onClick={function() { setShowAddForm(true); }} className="w-full py-3 border-2 border-dashed border-[#1b4d3e] text-[#1b4d3e] font-semibold rounded-xl hover:bg-green-50 transition-colors text-sm">
            + Add New Address
          </button>
        )}
      </div>
    </div>
  );
}

/* ============================================
   PAYMENT METHODS MODAL
   ============================================ */

function PaymentMethodsModal(props) {
  var _s = useState(function() {
    var saved = localStorage.getItem('sokoletu_payments');
    return saved ? JSON.parse(saved) : { mpesa: null, cards: [] };
  });
  var payments = _s[0];
  var setPayments = _s[1];
  var _s2 = useState('');
  var activeTab = _s2[0];
  var setActiveTab = _s2[1];
  var _s3 = useState(false);
  var showMpesaForm = _s3[0];
  var setShowMpesaForm = _s3[1];
  var _s4 = useState(false);
  var showCardForm = _s4[0];
  var setShowCardForm = _s4[1];

  return (
    <div className="fixed inset-0 z-[100] bg-black/50 flex items-end justify-center" onClick={props.onClose}>
      <div className="bg-white w-full max-w-lg rounded-t-3xl p-6 animate-slide-up max-h-[85vh] overflow-y-auto" onClick={function(e) { e.stopPropagation(); }}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-900">💳 Payment Methods</h3>
          <button onClick={props.onClose} className="p-2 hover:bg-gray-100 rounded-full text-lg">✕</button>
        </div>

        <div className="flex gap-2 mb-4">
          <button
            onClick={function() { setActiveTab('mpesa'); }}
            className={'flex-1 py-2 rounded-xl text-sm font-medium transition-all ' + (activeTab !== 'card' ? 'bg-[#1b4d3e] text-white' : 'bg-gray-100 text-gray-600')}
          >
            📱 M-Pesa
          </button>
          <button
            onClick={function() { setActiveTab('card'); }}
            className={'flex-1 py-2 rounded-xl text-sm font-medium transition-all ' + (activeTab === 'card' ? 'bg-[#1b4d3e] text-white' : 'bg-gray-100 text-gray-600')}
          >
            💳 Card
          </button>
        </div>

        {activeTab !== 'card' ? (
          <MpesaSection payments={payments} setPayments={setPayments} showForm={showMpesaForm} setShowForm={setShowMpesaForm} />
        ) : (
          <CardSection payments={payments} setPayments={setPayments} showForm={showCardForm} setShowForm={setShowCardForm} />
        )}
      </div>
    </div>
  );
}

function MpesaSection(props) {
  var _s = useState({ phone: '', pin: '' });
  var form = _s[0];
  var setForm = _s[1];
  var _s2 = useState('');
  var error = _s2[0];
  var setError = _s2[1];
  var _s3 = useState(false);
  var showPinEntry = _s3[0];
  var setShowPinEntry = _s3[1];
  var _s4 = useState(false);
  var loading = _s4[0];
  var setLoading = _s4[1];

  function handlePhoneSubmit(e) {
    e.preventDefault();
    if (!form.phone) {
      setError('Please enter your M-Pesa number');
      return;
    }
    if (!/^\+?255\d{9}$/.test(form.phone.replace(/\s/g, ''))) {
      setError('Please enter a valid Tanzanian phone number');
      return;
    }
    setError('');
    setShowPinEntry(true);
  }

  function handlePinSubmit(e) {
    e.preventDefault();
    if (!form.pin || form.pin.length !== 4) {
      setError('Please enter your 4-digit M-Pesa PIN');
      return;
    }
    setLoading(true);
    setTimeout(function() {
      var updated = Object.assign({}, props.payments, {
        mpesa: { phone: form.phone, last4: form.phone.slice(-4) }
      });
      props.setPayments(updated);
      localStorage.setItem('sokoletu_payments', JSON.stringify(updated));
      setLoading(false);
      props.setShowForm(false);
      setShowPinEntry(false);
      setForm({ phone: '', pin: '' });
    }, 1500);
  }

  function handleRemove() {
    var updated = Object.assign({}, props.payments, { mpesa: null });
    props.setPayments(updated);
    localStorage.setItem('sokoletu_payments', JSON.stringify(updated));
  }

  if (props.payments.mpesa && !props.showForm) {
    return (
      <div className="space-y-3">
        <div className="p-4 bg-green-50 rounded-xl border border-green-200">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center text-white font-bold text-sm">M</div>
              <div>
                <p className="font-semibold text-gray-900">M-Pesa</p>
                <p className="text-sm text-gray-600">+255 *** *** {props.payments.mpesa.last4}</p>
              </div>
            </div>
            <span className="px-2 py-1 bg-green-100 text-green-700 text-[10px] font-bold rounded-full">Active</span>
          </div>
          <button onClick={handleRemove} className="text-xs text-red-500 font-medium mt-2">Remove</button>
        </div>
        <button onClick={function() { props.setShowForm(true); }} className="w-full py-3 border-2 border-dashed border-[#1b4d3e] text-[#1b4d3e] font-semibold rounded-xl hover:bg-green-50 transition-colors text-sm">
          + Add Another M-Pesa Number
        </button>
      </div>
    );
  }

  if (!props.showForm) {
    return (
      <div className="text-center py-8">
        <div className="text-5xl mb-3">📱</div>
        <p className="text-gray-500 text-sm mb-4">No M-Pesa number added</p>
        <button onClick={function() { props.setShowForm(true); }} className="px-6 py-3 bg-[#1b4d3e] text-white font-semibold rounded-xl hover:bg-[#153d31] transition-colors text-sm">
          Add M-Pesa Number
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {!showPinEntry ? (
        <form onSubmit={handlePhoneSubmit} className="space-y-3">
          <div className="p-4 bg-green-50 rounded-xl border border-green-200">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center text-white font-bold text-xs">M</div>
              <div>
                <p className="font-semibold text-sm text-gray-900">M-Pesa Lipa Namba</p>
                <p className="text-xs text-gray-600">Enter your M-Pesa phone number</p>
              </div>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
            <input
              type="tel"
              value={form.phone}
              onChange={function(e) { setForm(Object.assign({}, form, { phone: e.target.value })); }}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#1b4d3e] focus:ring-1 focus:ring-[#1b4d3e]"
              placeholder="+255 712 345 678"
            />
          </div>
          {error ? (
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">{error}</div>
          ) : null}
          <button type="submit" className="w-full py-3 bg-[#1b4d3e] text-white font-semibold rounded-xl hover:bg-[#153d31] transition-colors">
            Continue
          </button>
          <button type="button" onClick={function() { props.setShowForm(false); setError(''); }} className="w-full py-3 border border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50">
            Cancel
          </button>
        </form>
      ) : (
        <form onSubmit={handlePinSubmit} className="space-y-3">
          <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
            <p className="text-sm text-gray-700 mb-1">Enter M-Pesa PIN for:</p>
            <p className="font-semibold text-gray-900">{form.phone}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">M-Pesa PIN (4 digits)</label>
            <input
              type="password"
              value={form.pin}
              onChange={function(e) { setForm(Object.assign({}, form, { pin: e.target.value.replace(/\D/g, '').slice(0, 4) })); }}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#1b4d3e] focus:ring-1 focus:ring-[#1b4d3e] text-center text-2xl tracking-widest"
              placeholder="••••"
              maxLength={4}
            />
          </div>
          {error ? (
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">{error}</div>
          ) : null}
          <button type="submit" disabled={loading} className="w-full py-3 bg-[#1b4d3e] text-white font-semibold rounded-xl hover:bg-[#153d31] transition-colors disabled:opacity-50">
            {loading ? 'Verifying...' : 'Confirm & Save'}
          </button>
          <button type="button" onClick={function() { setShowPinEntry(false); setError(''); setForm(Object.assign({}, form, { pin: '' })); }} className="w-full py-3 border border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50">
            Back
          </button>
        </form>
      )}
    </div>
  );
}

function CardSection(props) {
  var _s = useState({ number: '', expiry: '', cvv: '', name: '' });
  var form = _s[0];
  var setForm = _s[1];
  var _s2 = useState('');
  var error = _s2[0];
  var setError = _s2[1];

  function handleAdd(e) {
    e.preventDefault();
    if (!form.number || !form.expiry || !form.cvv || !form.name) {
      setError('Please fill in all fields');
      return;
    }
    if (form.number.replace(/\s/g, '').length !== 16) {
      setError('Card number must be 16 digits');
      return;
    }
    if (!/^\d{2}\/\d{2}$/.test(form.expiry)) {
      setError('Expiry must be in MM/YY format');
      return;
    }
    if (form.cvv.length !== 3) {
      setError('CVV must be 3 digits');
      return;
    }
    var newCard = {
      id: Date.now(),
      last4: form.number.slice(-4),
      expiry: form.expiry,
      name: form.name,
      type: form.number.startsWith('4') ? 'Visa' : form.number.startsWith('5') ? 'Mastercard' : 'Card'
    };
    var updated = Object.assign({}, props.payments, { cards: props.payments.cards.concat([newCard]) });
    props.setPayments(updated);
    localStorage.setItem('sokoletu_payments', JSON.stringify(updated));
    setForm({ number: '', expiry: '', cvv: '', name: '' });
    props.setShowForm(false);
    setError('');
  }

  function handleRemove(id) {
    var updated = Object.assign({}, props.payments, {
      cards: props.payments.cards.filter(function(c) { return c.id !== id; })
    });
    props.setPayments(updated);
    localStorage.setItem('sokoletu_payments', JSON.stringify(updated));
  }

  function formatCardNumber(value) {
    var v = value.replace(/\s/g, '').replace(/\D/g, '').slice(0, 16);
    var parts = [];
    for (var i = 0; i < v.length; i += 4) {
      parts.push(v.slice(i, i + 4));
    }
    return parts.join(' ');
  }

  function formatExpiry(value) {
    var v = value.replace(/\D/g, '').slice(0, 4);
    if (v.length >= 2) {
      return v.slice(0, 2) + '/' + v.slice(2);
    }
    return v;
  }

  return (
    <div className="space-y-3">
      {props.payments.cards.length === 0 && !props.showForm ? (
        <div className="text-center py-8">
          <div className="text-5xl mb-3">💳</div>
          <p className="text-gray-500 text-sm mb-4">No cards added</p>
          <button onClick={function() { props.setShowForm(true); }} className="px-6 py-3 bg-[#1b4d3e] text-white font-semibold rounded-xl hover:bg-[#153d31] transition-colors text-sm">
            Add Card
          </button>
        </div>
      ) : null}

      {props.payments.cards.map(function(card) {
        return (
          <div key={card.id} className="p-4 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl text-white">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium opacity-80">{card.type}</span>
              <button onClick={function() { handleRemove(card.id); }} className="text-xs text-red-300 hover:text-red-200">Remove</button>
            </div>
            <p className="text-lg font-mono mb-2">•••• •••• •••• {card.last4}</p>
            <div className="flex items-center justify-between text-xs">
              <div>
                <p className="opacity-60">Cardholder</p>
                <p className="font-medium">{card.name}</p>
              </div>
              <div>
                <p className="opacity-60">Expires</p>
                <p className="font-medium">{card.expiry}</p>
              </div>
            </div>
          </div>
        );
      })}

      {props.showForm ? (
        <form onSubmit={handleAdd} className="space-y-3 p-4 bg-gray-50 rounded-xl border border-gray-200">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Card Number</label>
            <input
              type="text"
              value={form.number}
              onChange={function(e) { setForm(Object.assign({}, form, { number: formatCardNumber(e.target.value) })); }}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm font-mono focus:outline-none focus:border-[#1b4d3e]"
              placeholder="1234 5678 9012 3456"
              maxLength={19}
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Expiry Date</label>
              <input
                type="text"
                value={form.expiry}
                onChange={function(e) { setForm(Object.assign({}, form, { expiry: formatExpiry(e.target.value) })); }}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm font-mono focus:outline-none focus:border-[#1b4d3e]"
                placeholder="MM/YY"
                maxLength={5}
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">CVV</label>
              <input
                type="password"
                value={form.cvv}
                onChange={function(e) { setForm(Object.assign({}, form, { cvv: e.target.value.replace(/\D/g, '').slice(0, 3) })); }}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm font-mono focus:outline-none focus:border-[#1b4d3e]"
                placeholder="123"
                maxLength={3}
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Cardholder Name</label>
            <input
              type="text"
              value={form.name}
              onChange={function(e) { setForm(Object.assign({}, form, { name: e.target.value })); }}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#1b4d3e]"
              placeholder="JOEL DOE"
            />
          </div>
          {error ? (
            <div className="p-2 bg-red-50 border border-red-200 rounded-lg text-red-600 text-xs">{error}</div>
          ) : null}
          <div className="flex gap-2">
            <button type="button" onClick={function() { props.setShowForm(false); setError(''); }} className="flex-1 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg text-sm hover:bg-gray-50">
              Cancel
            </button>
            <button type="submit" className="flex-1 py-2 bg-[#1b4d3e] text-white font-medium rounded-lg text-sm hover:bg-[#153d31]">
              Add Card
            </button>
          </div>
        </form>
      ) : props.payments.cards.length > 0 ? (
        <button onClick={function() { props.setShowForm(true); }} className="w-full py-3 border-2 border-dashed border-[#1b4d3e] text-[#1b4d3e] font-semibold rounded-xl hover:bg-green-50 transition-colors text-sm">
          + Add Another Card
        </button>
      ) : null}
    </div>
  );
}

/* ============================================
   ACCOUNT PAGE
   ============================================ */

function AccountPage(props) {
  var auth = useAuth();
  var user = auth.user;
  var _s = useState(null);
  var activeModal = _s[0];
  var setActiveModal = _s[1];

  var menuItems = [
    { icon: '👤', label: 'Edit Profile', desc: 'Name, phone, email', action: 'profile' },
    { icon: '📍', label: 'Delivery Addresses', desc: 'Manage your addresses', action: 'addresses' },
    { icon: '💳', label: 'Payment Methods', desc: 'M-Pesa, Card', action: 'payments' },
    { icon: '🔔', label: 'Notifications', desc: 'Manage alerts' },
    { icon: '⭐', label: 'Rate & Review', desc: 'Your feedback matters' },
    { icon: '🔒', label: 'Privacy & Security', desc: 'Data & permissions' },
  ];

  return (
    <div className="px-4 py-4">
      <div className="bg-gradient-to-br from-[#1b4d3e] to-[#2d7a5f] rounded-2xl p-5 text-white mb-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-2xl">👤</div>
          <div>
            <h2 className="text-lg font-bold">{user.name}</h2>
            <p className="text-sm text-green-200">{user.phone}</p>
            <p className="text-xs text-green-300 mt-1">{user.email}</p>
          </div>
        </div>
        <div className="flex gap-3 mt-4">
          <div className="flex-1 bg-white/10 rounded-xl p-3 text-center">
            <p className="text-lg font-bold">12</p>
            <p className="text-[10px] text-green-200">Orders</p>
          </div>
          <div className="flex-1 bg-white/10 rounded-xl p-3 text-center">
            <p className="text-lg font-bold">TZS 4.5K</p>
            <p className="text-[10px] text-green-200">Saved</p>
          </div>
          <div className="flex-1 bg-white/10 rounded-xl p-3 text-center">
            <p className="text-lg font-bold">⭐ 4.8</p>
            <p className="text-[10px] text-green-200">Rating</p>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        {menuItems.map(function(item, i) {
          return (
            <button key={i} onClick={function() { if (item.action) setActiveModal(item.action); }} className="w-full flex items-center gap-3 p-4 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all text-left">
              <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center text-lg">{item.icon}</div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-900">{item.label}</p>
                <p className="text-[10px] text-gray-400">{item.desc}</p>
              </div>
              <span className="text-gray-300">›</span>
            </button>
          );
        })}
      </div>

      <button onClick={auth.logout} className="w-full mt-6 py-3 border-2 border-red-200 text-red-500 font-semibold rounded-2xl hover:bg-red-50 transition-colors text-sm">
        Log Out
      </button>
      <p className="text-center text-[10px] text-gray-300 mt-4">SOKOLETU v1.0.0</p>

      {activeModal === 'profile' ? (
        <EditProfileModal onClose={function() { setActiveModal(null); }} />
      ) : null}
      {activeModal === 'addresses' ? (
        <AddressesModal onClose={function() { setActiveModal(null); }} />
      ) : null}
      {activeModal === 'payments' ? (
        <PaymentMethodsModal onClose={function() { setActiveModal(null); }} />
      ) : null}
    </div>
  );
}

/* ============================================
   APP CONTENT
   ============================================ */

function AppContent() {
  var _s = useState('home');
  var currentPage = _s[0];
  var setCurrentPage = _s[1];
  var _s2 = useState(null);
  var selectedCategory = _s2[0];
  var setSelectedCategory = _s2[1];
  var _s3 = useState(false);
  var showLocationModal = _s3[0];
  var setShowLocationModal = _s3[1];
  var _s4 = useState('Mikocheni, DSM');
  var location = _s4[0];
  var setLocation = _s4[1];

  function renderPage() {
    if (currentPage === 'categories') return <CategoriesPage selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />;
    if (currentPage === 'orders') return <OrdersPage />;
    if (currentPage === 'cart') return <CartPage />;
    if (currentPage === 'account') return <AccountPage location={location} />;
    return <HomePage onCategorySelect={function(cat) { setSelectedCategory(cat); setCurrentPage('categories'); }} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white sticky top-0 z-40 shadow-sm">
        <div className="max-w-lg mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 bg-gradient-to-br from-[#1b4d3e] to-[#2d7a5f] rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-sm">S</span>
              </div>
              <div>
                <h1 className="text-lg font-bold text-[#1b4d3e] leading-none">SOKOLETU</h1>
                <button onClick={function() { setShowLocationModal(true); }} className="flex items-center gap-1 text-xs text-gray-500">
                  📍 <span>{location}</span> <span>›</span>
                </button>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="relative p-2 text-gray-600">
                <span className="text-lg">🔔</span>
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <button className="p-2 text-gray-600"><span className="text-lg">⭐</span></button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-lg mx-auto pb-20">{renderPage()}</main>

      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 z-50 shadow-lg">
        <div className="max-w-lg mx-auto flex justify-around items-center py-2">
          <NavButton active={currentPage === 'home'} onClick={function() { setCurrentPage('home'); }} icon="🏠" label="Home" />
          <NavButton active={currentPage === 'categories'} onClick={function() { setCurrentPage('categories'); }} icon="🏷️" label="Categories" />
          <NavButton active={currentPage === 'orders'} onClick={function() { setCurrentPage('orders'); }} icon="📦" label="Orders" />
          <NavButton active={currentPage === 'cart'} onClick={function() { setCurrentPage('cart'); }} icon="🛒" label="Cart" />
          <NavButton active={currentPage === 'account'} onClick={function() { setCurrentPage('account'); }} icon="👤" label="Account" />
        </div>
      </nav>

      {showLocationModal ? (
        <LocationModal
          currentLocation={location}
          onClose={function() { setShowLocationModal(false); }}
          onSave={function(loc) { setLocation(loc); setShowLocationModal(false); }}
        />
      ) : null}
    </div>
  );
}

/* ============================================
   AUTH WRAPPER
   ============================================ */

function AuthWrapper() {
  var auth = useAuth();
  var _s = useState('login');
  var authPage = _s[0];
  var setAuthPage = _s[1];

  if (!auth.user) {
    if (authPage === 'signup') {
      return <SignupPage onSwitch={function() { setAuthPage('login'); }} />;
    }
    return <LoginPage onSwitch={function() { setAuthPage('signup'); }} />;
  }

  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}

/* ============================================
   APP ROOT
   ============================================ */

function App() {
  return (
    <AuthProvider>
      <AuthWrapper />
    </AuthProvider>
  );
}

export default App;
