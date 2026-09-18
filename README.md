# SOKOLETU - Fresh Local Delivery Platform

A modern e-commerce platform connecting urban consumers with local markets, farmers, and trusted grocery vendors for fresh, on-time food delivery in Tanzania.

## 🚀 Features

### Authentication System
- **Email/Password Login**: Traditional authentication with email and password
- **Google Sign-In**: Quick one-click login with Google account
- **Account Creation**: Sign up with full name, email, phone number, and password
- **Session Persistence**: Users stay logged in across browser sessions using localStorage
- **Form Validation**: Real-time validation for all authentication forms

### Shopping Experience
- **Home Dashboard**: Browse fresh products, categories, and daily deals
- **Smart Basket**: AI-powered weekly meal recommendations with savings
- **Product Catalog**: 30+ products across 6 categories (Vegetables, Fruits, Groceries, Dairy, Meat & Fish, Household)
- **Search & Filter**: Find products quickly with search and category filters
- **Shopping Cart**: Add/remove items, adjust quantities, view totals
- **Checkout Flow**: Complete order with delivery fee calculation
- **Order History**: Track past orders and delivery status

### User Interface
- **Mobile-First Design**: Optimized for mobile devices with responsive layout
- **Green Theme**: Forest green (#1b4d3e) color scheme reflecting freshness
- **Bottom Navigation**: Easy access to Home, Categories, Orders, Cart, and Account
- **Location Selector**: Choose delivery location from suggested areas
- **Promotional Banners**: Auto-rotating carousel with daily deals
- **Trust Badges**: Fast Delivery, Quality Assured, Same Day delivery indicators

## 🛠️ Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety (with @ts-nocheck for compatibility)
- **Tailwind CSS** - Utility-first styling
- **Vite** - Fast build tool
- **Context API** - State management for Auth and Cart
- **localStorage** - Persistent user sessions and data

## 📦 Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🔐 Authentication Flow

### Login
1. User enters email and password
2. System validates credentials against stored users
3. On success, user data is saved to localStorage
4. User is redirected to the main app

### Sign Up
1. User fills in: Full Name, Email, Phone Number, Password, Confirm Password
2. System validates:
   - All fields are filled
   - Passwords match
   - Password is at least 6 characters
   - Email is not already registered
3. New user is stored in localStorage
4. User is automatically logged in

### Google Sign-In
1. User clicks "Continue with Google" button
2. System creates a Google user profile
3. User is logged in immediately
4. Profile shows "Google User" with default data

### Logout
1. User clicks "Log Out" button in Account page
2. User session is cleared from localStorage
3. User is redirected to login screen

## 🎨 Design System

### Colors
- **Primary**: Forest Green `#1b4d3e`
- **Secondary**: Light Green `#2d7a5f`
- **Accent**: Various category colors (gradients)
- **Background**: Light Gray `#f8faf9`
- **Cards**: White with subtle shadows

### Typography
- **Headings**: Bold, dark gray
- **Body**: Regular, medium gray
- **Small**: 10px-12px for metadata

### Components
- **Buttons**: Rounded corners (xl), hover effects
- **Cards**: Rounded (2xl), shadow, border
- **Inputs**: Rounded (xl), focus states
- **Modals**: Slide-up animation, backdrop blur

## 📱 Pages

### 1. Login Page
- Email/password form
- Google sign-in button
- Link to sign up
- Error messages for invalid credentials

### 2. Sign Up Page
- Full name, email, phone, password fields
- Password confirmation
- Google sign-up option
- Form validation
- Link to login

### 3. Home Page
- Search bar
- Promotional banner carousel
- Category grid (6 categories)
- Smart Basket recommendation
- Fresh Today section
- Hot Deals section
- Trust badges

### 4. Categories Page
- Horizontal scrollable category pills
- Filtered product grid
- All products view

### 5. Cart Page
- Item list with quantities
- Remove items
- Order summary (subtotal, delivery fee, total)
- Free delivery threshold (TZS 15,000+)
- Checkout button
- Success modal

### 6. Orders Page
- Order history list
- Order ID, date, status
- Item count and total

### 7. Account Page
- User profile card
- Stats (orders, savings, rating)
- Settings menu
- Logout button

## 💾 Data Storage

### localStorage Keys
- `sokoletu_user` - Current logged-in user
- `sokoletu_users` - Array of all registered users

### User Object Structure
```javascript
{
  name: "John Doe",
  email: "john@example.com",
  phone: "+255 712 345 678",
  password: "password123", // Only for email/password users
  isGoogle: true // For Google users
}
```

## 🛒 Cart Features

- Add products with one click
- Increment/decrement quantities
- Remove items
- Clear entire cart
- Auto-calculate subtotal
- Delivery fee logic (free over TZS 15,000)
- Persistent cart during session

## 📍 Location Feature

- Default location: Mikocheni, DSM
- Suggested locations:
  - Mikocheni, DSM
  - Masaki, DSM
  - Kinondoni, DSM
  - Mbezi Beach, DSM
  - Kariakoo, DSM
  - Upanga, DSM
- Custom location input
- Location displayed in header

## 🎯 Product Categories

1. **Vegetables** 🥬 - Tomatoes, Spinach, Onions, Carrots, Peppers, Cabbage, Eggplant, Green Beans
2. **Fruits** 🍎 - Bananas, Mangoes, Pineapple, Oranges, Avocados, Watermelon
3. **Groceries** 🌾 - Rice, Maize Flour, Cooking Oil, Sugar, Wheat Flour
4. **Dairy** 🥛 - Milk, Yoghurt, Eggs, Cheese
5. **Meat & Fish** 🥩 - Chicken, Beef, Tilapia, Goat Meat, Prawns
6. **Household** 🏠 - Dish Soap, Toilet Paper, Laundry Detergent, Garbage Bags

## 💰 Pricing

All prices in Tanzanian Shillings (TZS):
- Vegetables: TZS 1,500 - 4,500
- Fruits: TZS 2,000 - 6,000
- Groceries: TZS 4,500 - 12,000
- Dairy: TZS 2,500 - 15,000
- Meat & Fish: TZS 12,000 - 35,000
- Household: TZS 3,500 - 8,000

## 🏷️ Discounts

Products with discounts show:
- Original price (strikethrough)
- Discount percentage badge (red)
- Discounted price (bold green)

Example: Bell Peppers - 20% OFF
- Original: TZS 5,600
- Discounted: TZS 4,500

## 🚚 Delivery

- **Standard Fee**: TZS 1,500
- **Free Delivery**: Orders above TZS 15,000
- **Estimated Time**: 30-45 minutes
- **Coverage**: Dar es Salaam areas

## 📊 Smart Basket

AI-powered weekly meal recommendations:
- 4-5 meals worth of ingredients
- Estimated total: TZS 12,500
- Savings: TZS 1,500
- Items: Rice, Tomatoes, Onions, Chicken, Spinach, Cooking Oil, Milk, Eggs, Bananas

## 🔒 Security Notes

This is a frontend demo application. For production use:
- Implement proper backend authentication
- Use HTTPS for all communications
- Hash passwords with bcrypt
- Implement JWT tokens
- Add CSRF protection
- Rate limiting for login attempts
- Email verification for new accounts
- Two-factor authentication option

## 🌐 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📈 Future Enhancements

- [ ] Real payment integration (M-Pesa, card)
- [ ] Order tracking with real-time updates
- [ ] Push notifications
- [ ] Product reviews and ratings
- [ ] Wishlist/favorites functionality
- [ ] Multi-language support (Swahili/English)
- [ ] Vendor/seller dashboard
- [ ] Admin panel
- [ ] Analytics dashboard
- [ ] Promo codes and coupons
- [ ] Referral program
- [ ] Loyalty points system

## 👨‍💻 Development

### Project Structure
```
src/
  ├── App.tsx          # Main app with all components
  ├── main.tsx         # Entry point
  └── index.css        # Global styles
```

### Key Components
- `AuthProvider` - Authentication context
- `CartProvider` - Shopping cart context
- `LoginPage` - Email/password login
- `SignupPage` - Account creation
- `AppContent` - Main app after login
- `ProductCard` - Individual product display
- `CartPage` - Shopping cart view
- `AccountPage` - User profile and settings

## 📝 License

MIT License - Feel free to use this project for learning or commercial purposes.

## 🤝 Contributing

Contributions welcome! Please open an issue or submit a pull request.

## 📧 Support

For questions or support, please open an issue on GitHub.

---

**Built with ❤️ for Tanzania's local markets**
