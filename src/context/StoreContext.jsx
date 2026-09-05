// src/context/StoreContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { PRODUCTS } from '../data/products';

const StoreContext = createContext();

const STORAGE_KEYS = {
  CART: 'anarthak_cart_v2',
  WISHLIST: 'anarthak_wishlist_v2',
  ORDERS: 'anarthak_orders_v2',
  ADDRESSES: 'anarthak_addresses_v2',
  THEME: 'anarthak_theme_v2'
};

const INITIAL_ADDRESSES = [
  {
    id: 'addr-ind-1',
    isDefault: true,
    fullName: 'Kabir Mehra',
    email: 'kabir.mehra@anarthak.in',
    phone: '+91 98201 54321',
    address: 'Flat 402, Sea Breeze Apts, Perry Cross Road, Bandra West',
    city: 'Mumbai',
    state: 'Maharashtra',
    postalCode: '400050',
    country: 'India'
  },
  {
    id: 'addr-ind-2',
    isDefault: false,
    fullName: 'Kabir Mehra',
    email: 'kabir.mehra@anarthak.in',
    phone: '+91 98110 87654',
    address: 'Studio 12, Deer Park Lane, Hauz Khas Village',
    city: 'New Delhi',
    state: 'Delhi',
    postalCode: '110016',
    country: 'India'
  }
];

const INITIAL_ORDERS = [
  {
    id: 'AN-78291',
    date: 'March 14, 2025',
    status: 'In Transit',
    trackingNumber: 'BD-AIR-88291039',
    carrier: 'Bluedart Apex Air Express',
    estimatedDelivery: 'Tomorrow by 4:00 PM',
    shippingAddress: INITIAL_ADDRESSES[0],
    shippingMethod: { name: 'Bluedart Priority Express', price: 99, duration: '24-48 Hours (Air)' },
    paymentMethod: { type: 'UPI (Google Pay)', last4: 'OKHDFC', brand: 'UPI Autopay' },
    items: [
      {
        id: 'item-demo-1',
        productId: 'an-01',
        name: '01 KAAL CHAKRA BOXY TEE',
        color: 'Void Obsidian',
        size: 'L',
        price: 1999,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1200&auto=format&fit=crop',
        gsm: 320
      },
      {
        id: 'item-demo-2',
        productId: 'an-03',
        name: '03 ANARTHAK MANIFESTO PUFF TEE',
        color: 'Blood Crimson',
        size: 'L',
        price: 2499,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=1200&auto=format&fit=crop',
        gsm: 340
      }
    ],
    subtotal: 4498,
    discount: 449.8,
    shippingFee: 0,
    tax: 202.41,
    total: 4250.61,
    timeline: [
      { step: 'Order Placed & UPI Verified', time: 'March 14, 11:20 AM', completed: true },
      { step: 'Tirupur Quality Check Passed', time: 'March 14, 03:30 PM', completed: true },
      { step: 'Hand-Packed in Anarthak Box', time: 'March 14, 06:15 PM', completed: true },
      { step: 'Dispatched via Bluedart Apex', time: 'March 15, 08:30 AM', completed: true },
      { step: 'Out for Delivery (Mumbai Hub)', time: 'Estimated March 16', completed: false }
    ]
  }
];

export const StoreProvider = ({ children }) => {
  // Theme State (Dark / Light)
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem(STORAGE_KEYS.THEME) || 'dark';
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.THEME, theme);
    const root = document.documentElement;
    if (theme === 'light') {
      root.classList.remove('dark');
      root.classList.add('light');
    } else {
      root.classList.remove('light');
      root.classList.add('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Modals & Drawers
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  // Selected Filter Category
  const [activeCategoryFilter, setActiveCategoryFilter] = useState('all');

  // User State
  const [user, setUser] = useState({
    name: 'Kabir Mehra',
    email: 'kabir.mehra@anarthak.in',
    phone: '+91 98201 54321',
    tier: 'OG Anarthak Member (Tier 1)',
    city: 'Mumbai',
    memberSince: '2024'
  });

  // Currency Formatter for Indian Rupees (₹)
  const formatPrice = (amount) => {
    return `₹${Math.round(amount).toLocaleString('en-IN')}`;
  };

  // Cart State (Persisted)
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CART);
      return saved ? JSON.parse(saved) : [
        {
          id: 'cart-init-1',
          productId: 'an-01',
          name: '01 KAAL CHAKRA BOXY TEE',
          subtitle: '320 GSM Tirupur Combed Heavyweight Cotton',
          price: 1999,
          color: 'Void Obsidian',
          colorHex: '#0E0E11',
          size: 'L',
          quantity: 1,
          image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1200&auto=format&fit=crop',
          gsm: 320
        }
      ];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
  }, [cart]);

  // Wishlist State (Persisted)
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.WISHLIST);
      return saved ? JSON.parse(saved) : ['an-03', 'an-06'];
    } catch {
      return ['an-03'];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.WISHLIST, JSON.stringify(wishlist));
  }, [wishlist]);

  // Saved Addresses (Persisted)
  const [savedAddresses, setSavedAddresses] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ADDRESSES);
      return saved ? JSON.parse(saved) : INITIAL_ADDRESSES;
    } catch {
      return INITIAL_ADDRESSES;
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ADDRESSES, JSON.stringify(savedAddresses));
  }, [savedAddresses]);

  // Orders State (Persisted)
  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ORDERS);
      return saved ? JSON.parse(saved) : INITIAL_ORDERS;
    } catch {
      return INITIAL_ORDERS;
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
  }, [orders]);

  const [activeOrder, setActiveOrder] = useState(null);

  // Promo Code Engine
  const [activePromo, setActivePromo] = useState({ code: 'NOTLIKETHEM', discountPercent: 15 });

  // Toast System
  const [toasts, setToasts] = useState([]);

  const showToast = (message, type = 'success') => {
    const id = Date.now() + Math.random().toString(36).substr(2, 4);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Cart Actions
  const addToCart = (product, colorName, size, quantity = 1) => {
    const colorObj = product.colors.find((c) => c.name === colorName) || product.colors[0];
    const existingIndex = cart.findIndex(
      (item) => item.productId === product.id && item.color === colorObj.name && item.size === size
    );

    if (existingIndex > -1) {
      const updated = [...cart];
      updated[existingIndex].quantity += quantity;
      setCart(updated);
    } else {
      const newItem = {
        id: `cart-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
        productId: product.id,
        name: product.name,
        subtitle: product.subtitle,
        price: product.price,
        color: colorObj.name,
        colorHex: colorObj.hex,
        size: size,
        quantity: quantity,
        image: product.images[0],
        gsm: product.gsm
      };
      setCart((prev) => [newItem, ...prev]);
    }

    showToast(`Added ${product.name} (${size}) to bag`, 'success');
    setIsCartOpen(true);
  };

  const updateQuantity = (cartItemId, newQty) => {
    if (newQty <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === cartItemId ? { ...item, quantity: newQty } : item))
    );
  };

  const removeFromCart = (cartItemId) => {
    const removedItem = cart.find((i) => i.id === cartItemId);
    setCart((prev) => prev.filter((item) => item.id !== cartItemId));
    if (removedItem) {
      showToast(`Removed from bag`, 'info');
    }
  };

  const clearCart = () => {
    setCart([]);
  };

  // Wishlist Actions
  const toggleWishlist = (productId) => {
    const exists = wishlist.includes(productId);
    const prod = PRODUCTS.find((p) => p.id === productId);
    const name = prod ? prod.name : 'Piece';

    if (exists) {
      setWishlist((prev) => prev.filter((id) => id !== productId));
      showToast(`Removed from wishlist`, 'info');
    } else {
      setWishlist((prev) => [...prev, productId]);
      showToast(`Saved to wishlist`, 'success');
    }
  };

  const isInWishlist = (productId) => wishlist.includes(productId);

  const moveWishlistToCart = (productId, size = 'L') => {
    const product = PRODUCTS.find((p) => p.id === productId);
    if (!product) return;
    addToCart(product, product.colors[0].name, size, 1);
    setWishlist((prev) => prev.filter((id) => id !== productId));
  };

  // Promo Engine
  const applyPromoCode = (rawCode) => {
    const code = rawCode.trim().toUpperCase();
    if (code === 'NOTLIKETHEM') {
      setActivePromo({ code, discountPercent: 15 });
      showToast('15% Anarthak Rebellion Discount applied', 'success');
      return { success: true };
    }
    if (code === 'DESI20' || code === 'FIRSTDROP') {
      setActivePromo({ code, discountPercent: 20 });
      showToast('20% Desi Drop Privilege applied', 'success');
      return { success: true };
    }
    if (code === 'ANARTHAK10') {
      setActivePromo({ code, discountPercent: 10 });
      showToast('10% Welcome Discount applied', 'success');
      return { success: true };
    }
    showToast('Invalid promo code. Try NOTLIKETHEM or DESI20', 'error');
    return { success: false };
  };

  const removePromoCode = () => {
    setActivePromo(null);
    showToast('Promo code removed', 'info');
  };

  // Financial Computations in INR
  const FREE_SHIPPING_THRESHOLD = 1999;
  const cartSubtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const cartDiscount = activePromo ? (cartSubtotal * activePromo.discountPercent) / 100 : 0;
  const freeShippingRemaining = Math.max(0, FREE_SHIPPING_THRESHOLD - cartSubtotal);
  const freeShippingProgress = Math.min(100, Math.round((cartSubtotal / FREE_SHIPPING_THRESHOLD) * 100));
  const shippingFee = cartSubtotal >= FREE_SHIPPING_THRESHOLD || cartSubtotal === 0 ? 0 : 99;
  const estimatedTax = cartSubtotal > 0 ? (cartSubtotal - cartDiscount) * 0.05 : 0; // 5% GST
  const cartTotal = Math.max(0, cartSubtotal - cartDiscount + shippingFee + estimatedTax);
  const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Address Management
  const addAddress = (address) => {
    const newAddr = { ...address, id: `addr-${Date.now()}` };
    if (newAddr.isDefault) {
      setSavedAddresses((prev) => prev.map((a) => ({ ...a, isDefault: false })).concat(newAddr));
    } else {
      setSavedAddresses((prev) => [...prev, newAddr]);
    }
    showToast('Delivery address saved to account', 'success');
  };

  const deleteAddress = (id) => {
    setSavedAddresses((prev) => prev.filter((a) => a.id !== id));
    showToast('Address removed', 'info');
  };

  // Order Placement
  const placeOrder = (orderData) => {
    const newOrderId = `AN-${Math.floor(10000 + Math.random() * 90000)}`;
    const newOrder = {
      id: newOrderId,
      date: new Date().toLocaleDateString('en-IN', { month: 'long', day: 'numeric', year: 'numeric' }),
      status: 'Order Placed',
      trackingNumber: `BD-AIR-${Math.floor(10000000 + Math.random() * 90000000)}`,
      carrier: orderData.shippingMethod?.carrier || 'Bluedart Apex Air',
      estimatedDelivery: '2-3 Days across India',
      shippingAddress: orderData.shippingAddress,
      shippingMethod: orderData.shippingMethod,
      paymentMethod: orderData.paymentMethod,
      items: [...cart],
      subtotal: cartSubtotal,
      discount: cartDiscount,
      shippingFee: orderData.shippingMethod?.price ?? shippingFee,
      tax: estimatedTax,
      total: (cartSubtotal - cartDiscount + (orderData.shippingMethod?.price ?? shippingFee) + estimatedTax),
      timeline: [
        { step: 'Order Placed & Payment Confirmed', time: 'Just now', completed: true },
        { step: 'Tirupur Mill Quality Check', time: 'Pending', completed: false },
        { step: 'Wax-Sealed in Anarthak Black Box', time: 'Pending', completed: false },
        { step: 'Handed to Bluedart Air Courier', time: 'Pending', completed: false },
        { step: 'Delivered to Doorstep', time: 'Pending', completed: false }
      ]
    };

    setOrders((prev) => [newOrder, ...prev]);
    setActiveOrder(newOrder);
    clearCart();
    showToast(`Order ${newOrderId} placed successfully!`, 'success');
    return newOrder;
  };

  const value = {
    // Theme
    theme,
    toggleTheme,

    // Filter
    activeCategoryFilter,
    setActiveCategoryFilter,

    // Currency Formatter
    formatPrice,

    // Modals
    isCartOpen,
    setIsCartOpen,
    isWishlistOpen,
    setIsWishlistOpen,
    isSearchOpen,
    setIsSearchOpen,
    isAuthOpen,
    setIsAuthOpen,
    isSizeGuideOpen,
    setIsSizeGuideOpen,
    quickViewProduct,
    setQuickViewProduct,

    // Cart
    cart,
    cartItemCount,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    cartSubtotal,
    cartDiscount,
    freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
    freeShippingRemaining,
    freeShippingProgress,
    shippingFee,
    estimatedTax,
    cartTotal,

    // Promo
    activePromo,
    applyPromoCode,
    removePromoCode,

    // Wishlist
    wishlist,
    toggleWishlist,
    isInWishlist,
    moveWishlistToCart,

    // User & Account
    user,
    setUser,
    savedAddresses,
    addAddress,
    deleteAddress,
    orders,
    activeOrder,
    setActiveOrder,
    placeOrder,

    // Toasts
    toasts,
    showToast,
    removeToast
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) throw new Error('useStore must be used within StoreProvider');
  return context;
};
