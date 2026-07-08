// src/context/ShopContext.jsx
// Yeh context poore shop ka "brain" hai.
// Cart, Wishlist, Search, Filters, Sort - sab kuch yahin manage hota hai
// taaki koi bhi component (Navbar, Dashboard, ProductCard, Cart page, Wishlist page)
// isi ek jagah se data le sake, alag-alag states create karne ki zarurat nahi.

import { createContext, useContext, useState, useMemo } from "react";
import products from "../data/products";

const ShopContext = createContext(null);

export function ShopProvider({ children }) {
  // ---------- CART STATE ----------
  // cart ek array hai jisme har item { ...product, quantity } hota hai
  const [cart, setCart] = useState([]);

  // ---------- WISHLIST STATE ----------
  // wishlist sirf product objects ka array hai (quantity ki zarurat nahi)
  const [wishlist, setWishlist] = useState([]);

  // ---------- SEARCH / FILTER / SORT STATE ----------
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceRange, setPriceRange] = useState("All"); // e.g. "0-1000000"
  const [inStockOnly, setInStockOnly] = useState(false);
  const [featuredOnly, setFeaturedOnly] = useState(false);
  const [sortOption, setSortOption] = useState("Default");
  const [currentPage, setCurrentPage] = useState(1);

  const PRODUCTS_PER_PAGE = 6;

  // ---------- CART FUNCTIONS ----------
  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        // Agar product already cart mein hai, quantity +1 kar do
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      // Naya product cart mein add karo, quantity 1 se start
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  const increaseQuantity = (productId) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (productId) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
        )
        // Agar quantity 0 ho jaye, item ko cart se hata do
        .filter((item) => item.quantity > 0)
    );
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartSubtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  // Abhi delivery/tax charges nahi hain, isliye total = subtotal
  const cartTotal = cartSubtotal;

  // ---------- WISHLIST FUNCTIONS ----------
  const toggleWishlist = (product) => {
    setWishlist((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) {
        // Already wishlist mein hai -> remove karo
        return prev.filter((item) => item.id !== product.id);
      }
      // Nahi hai -> add karo
      return [...prev, product];
    });
  };

  const removeFromWishlist = (productId) => {
    setWishlist((prev) => prev.filter((item) => item.id !== productId));
  };

  const isInWishlist = (productId) => wishlist.some((item) => item.id === productId);
  const wishlistCount = wishlist.length;

  // ---------- FILTER RESET HELPER ----------
  const clearAllFilters = () => {
    setSearchTerm("");
    setSelectedBrand("All");
    setSelectedCategory("All");
    setPriceRange("All");
    setInStockOnly(false);
    setFeaturedOnly(false);
    setSortOption("Default");
    setCurrentPage(1);
  };

  // ---------- MAIN LOGIC: Search -> Filter -> Sort -> Paginate ----------
  // useMemo isliye taaki yeh calculation sirf tab dobara ho jab
  // in dependencies mein se koi change ho - performance ke liye achha hai.
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // 1. SEARCH (name, brand, category - case-insensitive)
    if (searchTerm.trim() !== "") {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(term) ||
          p.brand.toLowerCase().includes(term) ||
          p.category.toLowerCase().includes(term)
      );
    }

    // 2. FILTER by Brand
    if (selectedBrand !== "All") {
      result = result.filter((p) => p.brand === selectedBrand);
    }

    // 3. FILTER by Category
    if (selectedCategory !== "All") {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // 4. FILTER by Price Range
    if (priceRange !== "All") {
      const [min, max] = priceRange.split("-").map(Number);
      result = result.filter((p) => p.price >= min && p.price <= max);
    }

    // 5. FILTER by In Stock
    if (inStockOnly) {
      result = result.filter((p) => p.stock === true);
    }

    // 6. FILTER by Featured
    if (featuredOnly) {
      result = result.filter((p) => p.featured === true);
    }

    // 7. SORT
    if (sortOption === "Price: Low to High") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOption === "Price: High to Low") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortOption === "Rating: High to Low") {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortOption === "Name: A to Z") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }
    // "Default" par kuch nahi karte, original order rehta hai

    return result;
  }, [searchTerm, selectedBrand, selectedCategory, priceRange, inStockOnly, featuredOnly, sortOption]);

  // 8. PAGINATION (filteredProducts ke upar apply hota hai)
  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE) || 1;

  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
    return filteredProducts.slice(startIndex, startIndex + PRODUCTS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  // ---------- VALUE OBJECT (jo bhi component use karega) ----------
  const value = {
    allProducts: products,
    filteredProducts,
    paginatedProducts,
    totalPages,
    currentPage,
    setCurrentPage,
    PRODUCTS_PER_PAGE,

    searchTerm,
    setSearchTerm,
    selectedBrand,
    setSelectedBrand,
    selectedCategory,
    setSelectedCategory,
    priceRange,
    setPriceRange,
    inStockOnly,
    setInStockOnly,
    featuredOnly,
    setFeaturedOnly,
    sortOption,
    setSortOption,
    clearAllFilters,

    cart,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    cartCount,
    cartSubtotal,
    cartTotal,

    wishlist,
    toggleWishlist,
    removeFromWishlist,
    isInWishlist,
    wishlistCount,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export const useShop = () => useContext(ShopContext);