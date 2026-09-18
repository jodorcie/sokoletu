export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  unit: string;
  category: string;
  emoji: string;
  discount?: number;
  fresh?: boolean;
  vendor?: string;
}

export interface Category {
  id: string;
  name: string;
  emoji: string;
  color: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface SmartBasket {
  id: string;
  name: string;
  items: string[];
  estimatedTotal: number;
  savings: number;
  meals: number;
}

export const categories: Category[] = [
  { id: 'vegetables', name: 'Vegetables', emoji: '🥬', color: 'from-green-400 to-green-600' },
  { id: 'fruits', name: 'Fruits', emoji: '🍎', color: 'from-red-400 to-red-600' },
  { id: 'groceries', name: 'Groceries', emoji: '🌾', color: 'from-amber-400 to-amber-600' },
  { id: 'dairy', name: 'Dairy', emoji: '🥛', color: 'from-blue-200 to-blue-400' },
  { id: 'meat', name: 'Meat & Fish', emoji: '🥩', color: 'from-rose-400 to-rose-600' },
  { id: 'household', name: 'Household', emoji: '🏠', color: 'from-purple-400 to-purple-600' },
];

export const products: Product[] = [
  // Vegetables
  { id: 'v1', name: 'Fresh Tomatoes', price: 2500, unit: '1 kg', category: 'vegetables', emoji: '🍅', fresh: true, vendor: 'Kariakoo Market' },
  { id: 'v2', name: 'Green Spinach', price: 1500, unit: '1 bunch', category: 'vegetables', emoji: '🥬', fresh: true, vendor: 'Mzizima Market' },
  { id: 'v3', name: 'Onions', price: 3000, unit: '1 kg', category: 'vegetables', emoji: '🧅', fresh: true, vendor: 'Kariakoo Market' },
  { id: 'v4', name: 'Carrots', price: 2000, unit: '1 kg', category: 'vegetables', emoji: '🥕', fresh: true, vendor: 'Mzizima Market' },
  { id: 'v5', name: 'Bell Peppers', price: 4500, unit: '500g', category: 'vegetables', emoji: '🫑', discount: 20, originalPrice: 5600, vendor: 'Kariakoo Market' },
  { id: 'v6', name: 'Cabbage', price: 1800, unit: '1 head', category: 'vegetables', emoji: '🥬', fresh: true, vendor: 'Mzizima Market' },
  { id: 'v7', name: 'Eggplant', price: 2200, unit: '500g', category: 'vegetables', emoji: '🍆', fresh: true, vendor: 'Kariakoo Market' },
  { id: 'v8', name: 'Green Beans', price: 3500, unit: '500g', category: 'vegetables', emoji: '🫘', discount: 15, originalPrice: 4100, vendor: 'Mzizima Market' },

  // Fruits
  { id: 'f1', name: 'Bananas', price: 2000, unit: '1 bunch', category: 'fruits', emoji: '🍌', fresh: true, vendor: 'Mzizima Market' },
  { id: 'f2', name: 'Mangoes', price: 5000, unit: '1 kg', category: 'fruits', emoji: '🥭', fresh: true, vendor: 'Kariakoo Market' },
  { id: 'f3', name: 'Pineapple', price: 3500, unit: '1 piece', category: 'fruits', emoji: '🍍', discount: 20, originalPrice: 4400, vendor: 'Mzizima Market' },
  { id: 'f4', name: 'Oranges', price: 4000, unit: '1 kg', category: 'fruits', emoji: '🍊', fresh: true, vendor: 'Kariakoo Market' },
  { id: 'f5', name: 'Avocados', price: 3000, unit: '3 pcs', category: 'fruits', emoji: '🥑', fresh: true, vendor: 'Mzizima Market' },
  { id: 'f6', name: 'Watermelon', price: 6000, unit: '1 piece', category: 'fruits', emoji: '🍉', discount: 15, originalPrice: 7000, vendor: 'Kariakoo Market' },

  // Groceries
  { id: 'g1', name: 'Rice (Sambaa)', price: 8000, unit: '2 kg', category: 'groceries', emoji: '🍚', fresh: true, vendor: 'Kariakoo Market' },
  { id: 'g2', name: 'Maize Flour', price: 5500, unit: '2 kg', category: 'groceries', emoji: '🌽', vendor: 'Mzizima Market' },
  { id: 'g3', name: 'Cooking Oil', price: 12000, unit: '2 L', category: 'groceries', emoji: '🫗', discount: 10, originalPrice: 13300, vendor: 'Kariakoo Market' },
  { id: 'g4', name: 'Sugar', price: 4500, unit: '1 kg', category: 'groceries', emoji: '🍬', vendor: 'Mzizima Market' },
  { id: 'g5', name: 'Wheat Flour', price: 6000, unit: '2 kg', category: 'groceries', emoji: '🌾', vendor: 'Kariakoo Market' },

  // Dairy
  { id: 'd1', name: 'Fresh Milk', price: 3500, unit: '1 L', category: 'dairy', emoji: '🥛', fresh: true, vendor: 'Mzizima Market' },
  { id: 'd2', name: 'Yoghurt', price: 2500, unit: '500ml', category: 'dairy', emoji: '🫙', vendor: 'Kariakoo Market' },
  { id: 'd3', name: 'Eggs', price: 8000, unit: '30 pcs', category: 'dairy', emoji: '🥚', fresh: true, vendor: 'Mzizima Market' },
  { id: 'd4', name: 'Cheese', price: 15000, unit: '250g', category: 'dairy', emoji: '🧀', discount: 15, originalPrice: 17600, vendor: 'Kariakoo Market' },

  // Meat & Fish
  { id: 'm1', name: 'Chicken', price: 18000, unit: '1 kg', category: 'meat', emoji: '🍗', fresh: true, vendor: 'Kariakoo Market' },
  { id: 'm2', name: 'Beef', price: 22000, unit: '1 kg', category: 'meat', emoji: '🥩', fresh: true, vendor: 'Mzizima Market' },
  { id: 'm3', name: 'Tilapia Fish', price: 12000, unit: '1 kg', category: 'meat', emoji: '🐟', discount: 20, originalPrice: 15000, vendor: 'Kariakoo Market' },
  { id: 'm4', name: 'Goat Meat', price: 25000, unit: '1 kg', category: 'meat', emoji: '🍖', vendor: 'Mzizima Market' },
  { id: 'm5', name: 'Prawns', price: 35000, unit: '500g', category: 'meat', emoji: '🦐', discount: 10, originalPrice: 38900, vendor: 'Kariakoo Market' },

  // Household
  { id: 'h1', name: 'Dish Soap', price: 3500, unit: '750ml', category: 'household', emoji: '🧴', vendor: 'Mzizima Market' },
  { id: 'h2', name: 'Toilet Paper', price: 8000, unit: '12 rolls', category: 'household', emoji: '🧻', vendor: 'Kariakoo Market' },
  { id: 'h3', name: 'Laundry Detergent', price: 6500, unit: '1 kg', category: 'household', emoji: '🫧', discount: 15, originalPrice: 7600, vendor: 'Mzizima Market' },
  { id: 'h4', name: 'Garbage Bags', price: 4000, unit: '30 pcs', category: 'household', emoji: '🗑️', vendor: 'Kariakoo Market' },
];

export const smartBasket: SmartBasket = {
  id: 'weekly-basket',
  name: 'Your Weekly Smart Basket',
  items: ['Rice', 'Tomatoes', 'Onions', 'Chicken', 'Spinach', 'Cooking Oil', 'Milk', 'Eggs', 'Bananas'],
  estimatedTotal: 12500,
  savings: 1500,
  meals: 4,
};

export const banners = [
  { id: 1, title: 'Fresh From the Farm', subtitle: 'Up to 20% off on vegetables today!', gradient: 'from-green-600 to-emerald-500', emoji: '🌿' },
  { id: 2, title: 'Weekend Special', subtitle: 'Free delivery on orders above TZS 15,000', gradient: 'from-teal-600 to-green-500', emoji: '🚚' },
  { id: 3, title: 'New Arrivals', subtitle: 'Fresh mangoes & pineapples in season', gradient: 'from-amber-500 to-orange-500', emoji: '🥭' },
];

export const formatPrice = (price: number): string => {
  return `TZS ${price.toLocaleString()}`;
};
