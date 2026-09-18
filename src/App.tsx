// @ts-nocheck
import { useState, useEffect, createContext, useContext, useCallback } from 'react';

/* ============================================
   DATA & CONSTANTS
   ============================================ */

/* ============================================
   DATA
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
      {/* Search */}
      <div className="relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
        <input type="text" value={search} onChange={function(e) { setSearch(e.target.value); }}
          placeholder="Search vegetables, fruits, groceries..."
          className="w-full pl-11 pr-4 py-3 bg-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#1b4d3e]/20 focus:bg-white transition-all text-sm" />
      </div>

      {/* Banner Carousel */}
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

      {/* Categories */}
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

      {/* Smart Basket */}
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

      {/* Fresh Today */}
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

      {/* Hot Deals */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-gray-900">Hot Deals 🔥</h3>
          <button className="text-xs text-[#1b4d3e] font-medium">See All</button>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {dealProducts.map(function(product) { return <ProductCard key={product.id} product={product} />; })}
        </div>
      </div>

      {/* Trust Badges */}
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
   ACCOUNT PAGE
   ============================================ */

function AccountPage(props) {
  var menuItems = [
    { icon: '👤', label: 'Edit Profile', desc: 'Name, phone, email' },
    { icon: '📍', label: 'Delivery Addresses', desc: props.location },
    { icon: '💳', label: 'Payment Methods', desc: 'M-Pesa, Card' },
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
            <h2 className="text-lg font-bold">Amina Hassan</h2>
            <p className="text-sm text-green-200">+255 712 345 678</p>
            <p className="text-xs text-green-300 mt-1">Member since 2024</p>
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
            <button key={i} className="w-full flex items-center gap-3 p-4 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all text-left">
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

      <button className="w-full mt-6 py-3 border-2 border-red-200 text-red-500 font-semibold rounded-2xl hover:bg-red-50 transition-colors text-sm">
        Log Out
      </button>
      <p className="text-center text-[10px] text-gray-300 mt-4">SOKOLETU v1.0.0</p>
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
      {/* Header */}
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

      {/* Main */}
      <main className="max-w-lg mx-auto pb-20">{renderPage()}</main>

      {/* Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 z-50 shadow-lg">
        <div className="max-w-lg mx-auto flex justify-around items-center py-2">
          <NavButton active={currentPage === 'home'} onClick={function() { setCurrentPage('home'); }} icon="🏠" label="Home" />
          <NavButton active={currentPage === 'categories'} onClick={function() { setCurrentPage('categories'); }} icon="🏷️" label="Categories" />
          <NavButton active={currentPage === 'orders'} onClick={function() { setCurrentPage('orders'); }} icon="📦" label="Orders" />
          <NavButton active={currentPage === 'cart'} onClick={function() { setCurrentPage('cart'); }} icon="🛒" label="Cart" />
          <NavButton active={currentPage === 'account'} onClick={function() { setCurrentPage('account'); }} icon="👤" label="Account" />
        </div>
      </nav>

      {/* Location Modal */}
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
   APP ROOT
   ============================================ */

function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}

export default App;
