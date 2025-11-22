import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, ShoppingBag, X, Hammer } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import AIChat from './AIChat';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cart } = useStore();
  const location = useLocation();

  const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Categories', path: '/categories' },
    { name: 'Catalog', path: '/catalog' },
    { name: 'Admin', path: '/admin' },
  ];

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 font-sans text-stone-900">
      <nav className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-stone-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link to="/" className="flex items-center gap-2" onClick={closeMenu}>
                <div className="bg-primary-700 text-white p-1.5 rounded-md">
                   <Hammer className="h-5 w-5" />
                </div>
                <span className="font-serif text-xl font-bold tracking-tight text-stone-900">
                  Replique
                  <span className="text-primary-700">Crafts</span>
                </span>
              </Link>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`text-sm font-medium transition-colors hover:text-primary-700 ${
                      location.pathname === link.path ? 'text-primary-700 font-bold' : 'text-stone-600'
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Cart Icon */}
            <div className="hidden md:block">
              <Link to="/cart" className="group flex items-center gap-1 text-stone-600 hover:text-primary-700">
                <div className="relative">
                  <ShoppingBag className="h-6 w-6" />
                  {cartItemCount > 0 && (
                    <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary-600 text-xs font-bold text-white">
                      {cartItemCount}
                    </span>
                  )}
                </div>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="-mr-2 flex md:hidden gap-4 items-center">
              <Link to="/cart" className="relative text-stone-600">
                <ShoppingBag className="h-6 w-6" />
                {cartItemCount > 0 && (
                  <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary-600 text-xs font-bold text-white">
                    {cartItemCount}
                  </span>
                )}
              </Link>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center rounded-md p-2 text-stone-400 hover:bg-stone-100 hover:text-stone-500 focus:outline-none"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-stone-200 bg-white">
            <div className="space-y-1 px-2 pt-2 pb-3 sm:px-3">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={closeMenu}
                  className={`block rounded-md px-3 py-2 text-base font-medium ${
                    location.pathname === link.path
                      ? 'bg-primary-50 text-primary-700'
                      : 'text-stone-600 hover:bg-stone-50 hover:text-stone-900'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>

      <main className="flex-grow">
        {children}
      </main>

      <footer className="bg-stone-900 text-stone-400 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                    <h3 className="text-white font-serif font-bold text-lg mb-4">Replique Crafts</h3>
                    <p className="text-sm">Modern DIY furniture templates made simple. Affordable, stylish, and customizable.</p>
                </div>
                <div>
                    <h3 className="text-white font-bold mb-4">Quick Links</h3>
                    <ul className="space-y-2 text-sm">
                        <li><Link to="/catalog" className="hover:text-white">All Templates</Link></li>
                        <li><Link to="/admin" className="hover:text-white">Admin Login</Link></li>
                    </ul>
                </div>
                <div>
                     <h3 className="text-white font-bold mb-4">Contact</h3>
                     <p className="text-sm">Lagos, Nigeria</p>
                     <p className="text-sm">hello@repliquecrafts.com</p>
                </div>
            </div>
            <div className="mt-8 border-t border-stone-800 pt-8 text-center text-xs">
                © {new Date().getFullYear()} Replique Crafts. All rights reserved.
            </div>
        </div>
      </footer>
      <AIChat />
    </div>
  );
};

export default Layout;