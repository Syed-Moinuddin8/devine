import React, { useState } from 'react';
import { Search, Heart, ShoppingBag, User, Settings, Menu, X, Mic } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  currentView: string;
  onNavigate: (view: string) => void;
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenSearch: () => void;
  onVoiceSearch: () => void;
}

export default function Navbar({
  currentView,
  onNavigate,
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenSearch,
  onVoiceSearch
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'HOME', view: 'home' },
    { label: 'SHOP', view: 'shop' },
    { label: 'ABOUT', view: 'about' },
    { label: 'CONTACT', view: 'contact' },
    { label: 'ADMIN', view: 'admin' }
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-white/10 glass">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          
          {/* Mobile Menu Trigger */}
          <button 
            id="mobile-menu-btn"
            className="text-white hover:text-brand-accent transition-colors md:hidden"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open Menu"
          >
            <Menu className="h-6 w-6" />
          </button>

          {/* BRAND LOGO */}
          <div 
            id="brand-logo"
            className="flex items-center space-x-1 cursor-pointer select-none"
            onClick={() => onNavigate('home')}
          >
            <span className="bebas text-3xl font-black italic tracking-[0.2em] text-white hover:text-brand-accent transition-colors">
              DEVINE
            </span>
            <span className="font-sans text-[8px] font-bold tracking-widest text-brand-accent align-super pt-1">
              BLY
            </span>
          </div>

          {/* DESKTOP NAVIGATION */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.view}
                id={`nav-item-${item.view}`}
                onClick={() => onNavigate(item.view)}
                className={`font-button text-[11px] font-bold tracking-[0.2em] transition-colors relative py-2 uppercase ${
                  currentView === item.view ? 'text-white' : 'text-zinc-400 hover:text-white'
                }`}
              >
                {item.label}
                {currentView === item.view && (
                  <motion.div 
                    layoutId="navbar-indicator" 
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-brand-accent"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </nav>

          {/* ACTION BUTTONS */}
          <div className="flex items-center space-x-4 sm:space-x-6">
            
            {/* Search Trigger */}
            <button
              id="search-trigger-btn"
              onClick={onOpenSearch}
              className="text-zinc-400 hover:text-white transition-colors cursor-pointer relative group p-2"
              title="Search DEVINE Store"
            >
              <Search className="h-5 w-5 group-hover:scale-110 transition-transform" />
            </button>

            {/* Voice Search Mic */}
            <button
              id="voice-search-btn"
              onClick={onVoiceSearch}
              className="text-zinc-400 hover:text-brand-accent transition-colors cursor-pointer relative group p-2"
              title="Voice Search"
            >
              <Mic className="h-5 w-5 group-hover:scale-110 transition-transform text-zinc-400 group-hover:text-brand-accent" />
            </button>

            {/* Wishlist */}
            <button
              id="wishlist-btn"
              onClick={() => onNavigate('account')}
              className="text-zinc-400 hover:text-white transition-colors cursor-pointer relative group p-2"
              title="Your Wishlist"
            >
              <Heart className="h-5 w-5 group-hover:scale-110 transition-transform" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-white text-[9px] font-bold text-black">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart Button */}
            <button
              id="cart-btn"
              onClick={onOpenCart}
              className="text-zinc-400 hover:text-white transition-colors cursor-pointer relative group p-2"
              title="Shopping Cart"
            >
              <ShoppingBag className="h-5 w-5 group-hover:scale-110 transition-transform" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-brand-accent text-[9px] font-bold text-black">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Profile */}
            <button
              id="profile-btn"
              onClick={() => onNavigate('account')}
              className={`text-zinc-400 hover:text-white transition-colors cursor-pointer p-2 ${
                currentView === 'account' ? 'text-brand-accent' : ''
              }`}
              title="My Account"
            >
              <User className="h-5 w-5" />
            </button>

          </div>
        </div>
      </header>

      {/* MOBILE DRAWER */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 z-50 bg-black/80"
            />

            {/* Drawer Panel */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed bottom-0 left-0 top-0 z-50 w-4/5 max-w-sm bg-brand-dark p-6 shadow-2xl border-r border-brand-dark-grey"
            >
              <div className="flex items-center justify-between border-b border-zinc-800 pb-5">
                <div className="flex items-center space-x-1">
                  <span className="font-heading text-2xl font-bold tracking-[0.25em] text-white">
                    DEVINE
                  </span>
                  <span className="font-sans text-[8px] font-semibold tracking-widest text-brand-accent pt-1">
                    BLY
                  </span>
                </div>
                <button
                  id="close-mobile-menu-btn"
                  className="rounded-md text-zinc-400 hover:text-white p-2 border border-zinc-800"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="mt-8 flex flex-col space-y-6">
                {navItems.map((item) => (
                  <button
                    key={item.view}
                    id={`mobile-nav-${item.view}`}
                    onClick={() => {
                      onNavigate(item.view);
                      setMobileMenuOpen(false);
                    }}
                    className={`text-left font-button text-sm font-semibold tracking-widest py-3 border-b border-zinc-900 ${
                      currentView === item.view ? 'text-brand-accent' : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              <div className="absolute bottom-10 left-6 right-6">
                <div className="rounded-xl bg-zinc-900/60 p-4 border border-zinc-800 text-center">
                  <p className="font-sans text-xs text-zinc-500">Premium Fashion Brand</p>
                  <p className="font-heading text-lg tracking-widest text-brand-accent mt-1">DEVINE BLY CO.</p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
