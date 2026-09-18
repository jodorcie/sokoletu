import { useState, useEffect } from 'react';
import { CartProvider, useCart } from './context';
import { products, categories, smartBasket, banners, formatPrice, type Product } from './data';
import {
  Home,
  ShoppingCart,
  Package,
  User,
  Search,
  MapPin,
  ChevronRight,
  Plus,
  Minus,
  Trash2,
  X,
  Tag,
  Clock,
  Star,
  Bell,
  Check,
  Truck,
  Shield,
  Zap,
  type LucideIcon,
} from 'lucide-react';

// ============ TYPES ============
type Page = 'home' | 'categories' | 'orders' | 'cart' | 'account';

// ============ APP COMPONENT ============
function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}

function AppContent() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [location, setLocation] = useState('Mikocheni, DSM');
  const [searchQuery, setSearchQuery] = useState('');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage searchQuery={searchQuery} onCategorySelect={(cat: string) => { setSelectedCategory(cat); setCurrentPage('categories'); }} />;
      case 'categories':
        return <CategoriesPage selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />;
      case 'orders':
        return <OrdersPage />;
      case 'cart':
        return <CartPage />;
      case 'account':
        return <AccountPage location={location} setLocation={setLocation} />;
      default:
        return <HomePage searchQuery={searchQuery} onCategorySelect={(cat: string) => { setSelectedCategory(cat); setCurrentPage('categories'); }} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
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
                <button
                  onClick={() => setShowLocationModal(true)}
                  className="flex items-center gap-1 text-xs text-gray-500 hover:text-[#1b4d3e] transition-colors"
                >
                  <MapPin size={12} />
                  <span>{location}</span>
                  <ChevronRight size={10} />
                </button>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="relative p-2 text-gray-600 hover:text-[#1b4d3e] transition-colors">
                <Bell size={20} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <button className="p-2 text-gray-600 hover:text-[#1b4d3e] transition-colors">
                <Star size={20} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-lg mx-auto pb-20">
        {renderPage()}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 z-50 shadow-lg">
        <div className="max-w-lg mx-auto flex justify-around items-center py-2">
          <NavButton active={currentPage === 'home'} onClick={() => setCurrentPage('home')} icon={Home} label="Home" />
          <NavButton active={currentPage === 'categories'} onClick={() => setCurrentPage('categories')} icon={Tag} label="Categories" />
          <NavButton active={currentPage === 'orders'} onClick={() => setCurrentPage('orders')} icon={Package} label="Orders" />
          <NavButton active={currentPage === 'cart'} onClick={() => setCurrentPage('cart')} icon={ShoppingCart} label="Cart" />
          <NavButton active={currentPage === 'account'} onClick={() => setCurrentPage('account')} icon={User} label="Account" />
        </div>
      </nav>

      {/* Location Modal */}
      {showLocationModal && (
        <LocationModal
          currentLocation={location}
          onClose={() => setShowLocationModal(false)}
          onSave={(loc: string) => { setLocation(loc); setShowLocationModal(false); }}
        />
      )}
    </div>
  );
}

// ============ NAV BUTTON ============
function NavButton({ active, onClick, icon: Icon, label }: { active: boolean; onClick: () => void; icon: LucideIcon; label: string }) {
  const { totalItems } = useCart();
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all ${
        active ? 'text-[#1b4d3e]' : 'text-gray-400 hover:text-gray-600'
      }`}
    >
      <div className="relative">
        <Icon size={22} strokeWidth={active ? 2.5 : 1.5} />
        {label === 'Cart' && totalItems > 0 && (
          <span className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
            {totalItems}
          </span>
        )}
      </div>
      <span className={`text-[10px] ${active ? 'font-semibold' : ''}`}>{label}</span>
    </button>
  );
}

// ============ LOCATION MODAL ============
function LocationModal({ currentLocation, onClose, onSave }: { currentLocation: string; onClose: () => void; onSave: (loc: string) => void }) {
  const [newLocation, setNewLocation] = useState(currentLocation);
  const suggestions = ['Mikocheni, DSM', 'Masaki, DSM', 'Kinondoni, DSM', 'Mbezi Beach, DSM', 'Kariakoo, DSM', 'Upanga, DSM'];

  return (
    <div className="fixed inset-0 z-[100] bg-black/50 flex items-end justify-center">
      <div className="bg-white w-full max-w-lg rounded-t-3xl p-6 animate-slide-up">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-900">Delivery Location</h3>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full"><X size={20} /></button>
        </div>
        <div className="relative mb-4">
          <MapPin size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={newLocation}
            onChange={(e) => setNewLocation(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#1b4d3e] focus:ring-1 focus:ring-[#1b4d3e]"
            placeholder="Enter your location"
          />
        </div>
        <p className="text-sm text-gray-500 mb-3">Suggested locations</p>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {suggestions.map((s) => (
            <button
              key={s}
              onClick={() => setNewLocation(s)}
              className={`w-full text-left px-4 py-3 rounded-xl transition-colors ${
                newLocation === s ? 'bg-green-50 text-[#1b4d3e] border border-green-200' : 'hover:bg-gray-50 text-gray-700'
              }`}
            >
              <div className="flex items-center gap-2">
                <MapPin size={14} />
                <span className="text-sm">{s}</span>
                {newLocation === s && <Check size={14} className="ml-auto text-green-600" />}
              </div>
            </button>
          ))}
        </div>
        <button
          onClick={() => onSave(newLocation)}
          className="w-full mt-4 py-3 bg-[#1b4d3e] text-white font-semibold rounded-xl hover:bg-[#153d31] transition-colors"
        >
          Save Location
        </button>
      </div>
    </div>
  );
}

// ============ HOME PAGE ============
function HomePage({ searchQuery, onCategorySelect }: { searchQuery: string; onCategorySelect: (cat: string) => void }) {
  const [bannerIndex, setBannerIndex] = useState(0);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const timer = setInterval(() => setBannerIndex(i => (i + 1) % banners.length), 4000);
    return () => clearInterval(timer);
  }, []);

  const freshProducts = products.filter(p => p.fresh).slice(0, 6);
  const dealProducts = products.filter(p => p.discount);

  return (
    <div className="px-4 py-4 space-y-6">
      {/* Search Bar */}
      <div className="relative">
        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search vegetables, fruits, groceries..."
          className="w-full pl-11 pr-4 py-3 bg-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#1b4d3e]/20 focus:bg-white transition-all text-sm"
        />
      </div>

      {/* Hero Banner Carousel */}
      <div className="relative overflow-hidden rounded-2xl">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${bannerIndex * 100}%)` }}
        >
          {banners.map((banner) => (
            <div
              key={banner.id}
              className={`min-w-full bg-gradient-to-r ${banner.gradient} p-6 rounded-2xl text-white relative overflow-hidden`}
            >
              <div className="relative z-10">
                <p className="text-xs font-medium opacity-80 mb-1">🔥 Today's Deal</p>
                <h2 className="text-xl font-bold mb-1">{banner.title}</h2>
                <p className="text-sm opacity-90">{banner.subtitle}</p>
                <button className="mt-3 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg text-sm font-medium hover:bg-white/30 transition-colors">
                  Shop Now →
                </button>
              </div>
              <div className="absolute right-4 bottom-4 text-6xl opacity-30">{banner.emoji}</div>
            </div>
          ))}
        </div>
        <div className="absolute bottom-3 right-3 flex gap-1.5">
          {banners.map((_, i) => (
            <div key={i} className={`w-2 h-2 rounded-full transition-all ${i === bannerIndex ? 'bg-white w-5' : 'bg-white/50'}`} />
          ))}
        </div>
      </div>

      {/* Category Grid */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-gray-900">Categories</h3>
          <button className="text-xs text-[#1b4d3e] font-medium">See All</button>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onCategorySelect(cat.id)}
              className="flex flex-col items-center p-3 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5 border border-gray-100"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${cat.color} flex items-center justify-center text-2xl mb-2 shadow-sm`}>
                {cat.emoji}
              </div>
              <span className="text-xs font-medium text-gray-700">{cat.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Smart Basket Feature */}
      <div className="bg-gradient-to-br from-[#1b4d3e] to-[#2d7a5f] rounded-2xl p-5 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <Zap size={18} className="text-yellow-300" />
            <span className="text-xs font-medium text-green-200">Smart Recommendation</span>
          </div>
          <h3 className="text-lg font-bold mb-1">{smartBasket.name}</h3>
          <p className="text-sm text-green-100 mb-3">
            {smartBasket.items.slice(0, 5).join(', ')} & more for {smartBasket.meals} meals
          </p>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xl font-bold">TZS {smartBasket.estimatedTotal.toLocaleString()}</p>
              <p className="text-xs text-green-200">You save TZS {smartBasket.savings.toLocaleString()} 💰</p>
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
          {freshProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      {/* Promotional Deals */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-gray-900">Hot Deals 🔥</h3>
          </div>
          <button className="text-xs text-[#1b4d3e] font-medium">See All</button>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {dealProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      {/* Trust Badges */}
      <div className="grid grid-cols-3 gap-3 pt-2">
        <div className="flex flex-col items-center text-center p-3 bg-white rounded-xl border border-gray-100">
          <Truck size={20} className="text-[#1b4d3e] mb-1" />
          <span className="text-[10px] text-gray-600 font-medium">Fast Delivery</span>
        </div>
        <div className="flex flex-col items-center text-center p-3 bg-white rounded-xl border border-gray-100">
          <Shield size={20} className="text-[#1b4d3e] mb-1" />
          <span className="text-[10px] text-gray-600 font-medium">Quality Assured</span>
        </div>
        <div className="flex flex-col items-center text-center p-3 bg-white rounded-xl border border-gray-100">
          <Clock size={20} className="text-[#1b4d3e] mb-1" />
          <span className="text-[10px] text-gray-600 font-medium">Same Day</span>
        </div>
      </div>
    </div>
  );
}

// ============ PRODUCT CARD ============
function ProductCard({ product }: { product: Product }) {
  const { addItem, items, updateQuantity } = useCart();
  const cartItem = items.find(i => i.id === product.id);

  return (
    <div className="bg-white rounded-2xl p-3 shadow-sm border border-gray-100 hover:shadow-md transition-all group">
      <div className="relative">
        <div className="w-full h-24 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl flex items-center justify-center text-4xl mb-2 group-hover:scale-105 transition-transform">
          {product.emoji}
        </div>
        {product.discount && (
          <span className="absolute top-1 left-1 px-2 py-0.5 bg-red-500 text-white text-[10px] font-bold rounded-lg">
            {product.discount}% OFF
          </span>
        )}
        {product.fresh && !product.discount && (
          <span className="absolute top-1 left-1 px-2 py-0.5 bg-green-500 text-white text-[10px] font-bold rounded-lg">
            Fresh
          </span>
        )}
      </div>
      <h4 className="text-sm font-semibold text-gray-900 truncate">{product.name}</h4>
      <p className="text-[10px] text-gray-400 mb-1">{product.unit} • {product.vendor}</p>
      <div className="flex items-center justify-between mt-1">
        <div>
          <span className="text-sm font-bold text-[#1b4d3e]">{formatPrice(product.price)}</span>
          {product.originalPrice && (
            <span className="text-[10px] text-gray-400 line-through ml-1">{formatPrice(product.originalPrice)}</span>
          )}
        </div>
        {cartItem ? (
          <div className="flex items-center gap-1">
            <button
              onClick={() => updateQuantity(product.id, cartItem.quantity - 1)}
              className="w-7 h-7 flex items-center justify-center bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <Minus size={12} />
            </button>
            <span className="text-xs font-bold w-5 text-center">{cartItem.quantity}</span>
            <button
              onClick={() => updateQuantity(product.id, cartItem.quantity + 1)}
              className="w-7 h-7 flex items-center justify-center bg-[#1b4d3e] text-white rounded-lg hover:bg-[#153d31] transition-colors"
            >
              <Plus size={12} />
            </button>
          </div>
        ) : (
          <button
            onClick={() => addItem(product)}
            className="w-7 h-7 flex items-center justify-center bg-[#1b4d3e] text-white rounded-lg hover:bg-[#153d31] transition-colors shadow-sm"
          >
            <Plus size={14} />
          </button>
        )}
      </div>
    </div>
  );
}

// ============ CATEGORIES PAGE ============
function CategoriesPage({ selectedCategory, setSelectedCategory }: { selectedCategory: string | null; setSelectedCategory: (cat: string | null) => void }) {
  const filteredProducts = selectedCategory
    ? products.filter(p => p.category === selectedCategory)
    : products;

  return (
    <div className="px-4 py-4">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Categories</h2>

      {/* Category Pills */}
      <div className="flex gap-2 overflow-x-auto pb-3 mb-4 scrollbar-hide">
        <button
          onClick={() => setSelectedCategory(null)}
          className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
            !selectedCategory ? 'bg-[#1b4d3e] text-white shadow-md' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all flex items-center gap-1.5 ${
              selectedCategory === cat.id ? 'bg-[#1b4d3e] text-white shadow-md' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <span>{cat.emoji}</span>
            <span>{cat.name}</span>
          </button>
        ))}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 gap-3">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

// ============ CART PAGE ============
function CartPage() {
  const { items, updateQuantity, removeItem, subtotal, deliveryFee, total, clearCart } = useCart();
  const [showCheckout, setShowCheckout] = useState(false);

  if (items.length === 0) {
    return (
      <div className="px-4 py-16 text-center">
        <div className="text-6xl mb-4">🛒</div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
        <p className="text-gray-500 text-sm mb-6">Add fresh items from our local markets!</p>
        <div className="text-4xl animate-bounce">🥬🍎🥕</div>
      </div>
    );
  }

  return (
    <div className="px-4 py-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-900">My Cart ({items.length})</h2>
        <button onClick={clearCart} className="text-xs text-red-500 font-medium hover:text-red-700">
          Clear All
        </button>
      </div>

      {/* Cart Items */}
      <div className="space-y-3 mb-6">
        {items.map((item) => (
          <div key={item.id} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-center gap-3">
            <div className="w-14 h-14 bg-gray-50 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
              {item.emoji}
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-semibold text-gray-900 truncate">{item.name}</h4>
              <p className="text-xs text-gray-400">{item.unit}</p>
              <p className="text-sm font-bold text-[#1b4d3e]">{formatPrice(item.price * item.quantity)}</p>
            </div>
            <div className="flex flex-col items-end gap-2">
              <button onClick={() => removeItem(item.id)} className="p-1 text-red-400 hover:text-red-600">
                <Trash2 size={14} />
              </button>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="w-7 h-7 flex items-center justify-center bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <Minus size={12} />
                </button>
                <span className="text-sm font-bold w-5 text-center">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="w-7 h-7 flex items-center justify-center bg-[#1b4d3e] text-white rounded-lg hover:bg-[#153d31] transition-colors"
                >
                  <Plus size={12} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Order Summary */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 mb-4">
        <h3 className="font-bold text-gray-900 mb-3">Order Summary</h3>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Subtotal</span>
            <span className="font-medium">{formatPrice(subtotal)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Delivery Fee</span>
            <span className={`font-medium ${deliveryFee === 0 ? 'text-green-600' : ''}`}>
              {deliveryFee === 0 ? 'FREE' : formatPrice(deliveryFee)}
            </span>
          </div>
          {subtotal < 15000 && (
            <p className="text-[10px] text-green-600 bg-green-50 px-2 py-1 rounded-lg">
              💡 Add {formatPrice(15000 - subtotal)} more for free delivery!
            </p>
          )}
          <div className="border-t border-gray-100 pt-2 mt-2">
            <div className="flex justify-between">
              <span className="font-bold text-gray-900">Total</span>
              <span className="font-bold text-lg text-[#1b4d3e]">{formatPrice(total)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Checkout Button */}
      <button
        onClick={() => setShowCheckout(true)}
        className="w-full py-4 bg-[#1b4d3e] text-white font-bold rounded-2xl hover:bg-[#153d31] transition-colors shadow-lg shadow-green-900/20 text-sm"
      >
        Proceed to Checkout — {formatPrice(total)}
      </button>

      {/* Checkout Modal */}
      {showCheckout && (
        <div className="fixed inset-0 z-[100] bg-black/50 flex items-end justify-center">
          <div className="bg-white w-full max-w-lg rounded-t-3xl p-6 animate-slide-up">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold">Order Confirmed! 🎉</h3>
              <button onClick={() => setShowCheckout(false)} className="p-2 hover:bg-gray-100 rounded-full"><X size={20} /></button>
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
            <button
              onClick={() => { setShowCheckout(false); clearCart(); }}
              className="w-full py-3 bg-[#1b4d3e] text-white font-semibold rounded-xl hover:bg-[#153d31] transition-colors"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ============ ORDERS PAGE ============
function OrdersPage() {
  const mockOrders = [
    { id: 'SKL-4521', date: 'Today, 2:30 PM', status: 'Delivered', items: 5, total: 18500, emoji: '✅' },
    { id: 'SKL-4498', date: 'Yesterday, 10:15 AM', status: 'Delivered', items: 3, total: 12000, emoji: '✅' },
    { id: 'SKL-4467', date: 'Dec 18, 4:00 PM', status: 'Delivered', items: 8, total: 25000, emoji: '✅' },
  ];

  return (
    <div className="px-4 py-4">
      <h2 className="text-xl font-bold text-gray-900 mb-4">My Orders</h2>

      {mockOrders.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">📦</div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">No orders yet</h3>
          <p className="text-gray-500 text-sm">Your order history will appear here</p>
        </div>
      ) : (
        <div className="space-y-3">
          {mockOrders.map((order) => (
            <div key={order.id} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{order.emoji}</span>
                  <div>
                    <p className="text-sm font-bold text-gray-900">#{order.id}</p>
                    <p className="text-[10px] text-gray-400">{order.date}</p>
                  </div>
                </div>
                <span className="px-2.5 py-1 bg-green-100 text-green-700 text-[10px] font-bold rounded-full">
                  {order.status}
                </span>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-gray-50">
                <span className="text-xs text-gray-500">{order.items} items</span>
                <span className="text-sm font-bold text-[#1b4d3e]">{formatPrice(order.total)}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ============ ACCOUNT PAGE ============
function AccountPage({ location }: { location: string; setLocation: (loc: string) => void }) {
  const menuItems = [
    { icon: User, label: 'Edit Profile', desc: 'Name, phone, email' },
    { icon: MapPin, label: 'Delivery Addresses', desc: location },
    { icon: Tag, label: 'Payment Methods', desc: 'M-Pesa, Card' },
    { icon: Bell, label: 'Notifications', desc: 'Manage alerts' },
    { icon: Star, label: 'Rate & Review', desc: 'Your feedback matters' },
    { icon: Shield, label: 'Privacy & Security', desc: 'Data & permissions' },
  ];

  return (
    <div className="px-4 py-4">
      {/* Profile Header */}
      <div className="bg-gradient-to-br from-[#1b4d3e] to-[#2d7a5f] rounded-2xl p-5 text-white mb-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-2xl backdrop-blur-sm">
            👤
          </div>
          <div>
            <h2 className="text-lg font-bold">Amina Hassan</h2>
            <p className="text-sm text-green-200">+255 712 345 678</p>
            <p className="text-xs text-green-300 mt-1">Member since 2024</p>
          </div>
        </div>
        <div className="flex gap-3 mt-4">
          <div className="flex-1 bg-white/10 rounded-xl p-3 text-center backdrop-blur-sm">
            <p className="text-lg font-bold">12</p>
            <p className="text-[10px] text-green-200">Orders</p>
          </div>
          <div className="flex-1 bg-white/10 rounded-xl p-3 text-center backdrop-blur-sm">
            <p className="text-lg font-bold">TZS 4.5K</p>
            <p className="text-[10px] text-green-200">Saved</p>
          </div>
          <div className="flex-1 bg-white/10 rounded-xl p-3 text-center backdrop-blur-sm">
            <p className="text-lg font-bold">⭐ 4.8</p>
            <p className="text-[10px] text-green-200">Rating</p>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="space-y-2">
        {menuItems.map((item, i) => (
          <button key={i} className="w-full flex items-center gap-3 p-4 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all text-left">
            <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center">
              <item.icon size={18} className="text-[#1b4d3e]" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-gray-900">{item.label}</p>
              <p className="text-[10px] text-gray-400">{item.desc}</p>
            </div>
            <ChevronRight size={16} className="text-gray-300" />
          </button>
        ))}
      </div>

      {/* Logout */}
      <button className="w-full mt-6 py-3 border-2 border-red-200 text-red-500 font-semibold rounded-2xl hover:bg-red-50 transition-colors text-sm">
        Log Out
      </button>

      <p className="text-center text-[10px] text-gray-300 mt-4">SOKOLETU v1.0.0</p>
    </div>
  );
}

export default App;
