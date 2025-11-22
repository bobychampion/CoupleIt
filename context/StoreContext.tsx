import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product, CartItem, Category } from '../types';
import { INITIAL_PRODUCTS } from '../constants';

interface StoreContextType {
  products: Product[];
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  addProduct: (product: Product) => void; // For admin
  getProductsByCategory: (category?: string) => Product[];
  getProductById: (id: string) => Product | undefined;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Initialize with dummy data
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>([]);

  // Simple local storage persistence for cart
  useEffect(() => {
    const savedCart = localStorage.getItem('replique_cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('replique_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item: CartItem) => {
    setCart((prev) => {
      // Check if exact configuration exists (including dimensions)
      const existingIdx = prev.findIndex(
        (i) => i.productId === item.productId && 
               i.selectedColor === item.selectedColor && 
               i.selectedMaterial === item.selectedMaterial &&
               i.assemblyService === item.assemblyService &&
               i.dimensions.width === item.dimensions.width &&
               i.dimensions.height === item.dimensions.height &&
               i.dimensions.depth === item.dimensions.depth
      );

      if (existingIdx > -1) {
        const newCart = [...prev];
        newCart[existingIdx].quantity += item.quantity;
        return newCart;
      }
      return [...prev, item];
    });
  };

  const removeFromCart = (productId: string) => {
    // This is a simplified remove, ideally we'd remove by index or unique cart ID
    setCart((prev) => prev.filter((i) => i.productId !== productId));
  };

  const clearCart = () => setCart([]);

  const addProduct = (product: Product) => {
    setProducts((prev) => [...prev, product]);
  };

  const getProductsByCategory = (category?: string) => {
    if (!category || category === 'All') return products;
    return products.filter((p) => p.category === category);
  };

  const getProductById = (id: string) => products.find((p) => p.id === id);

  return (
    <StoreContext.Provider
      value={{
        products,
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        addProduct,
        getProductsByCategory,
        getProductById,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};