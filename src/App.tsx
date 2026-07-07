import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Categories from './components/Categories';
import ProductCard from './components/ProductCard';
import ProductPage from './components/ProductPage';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import AISearch from './components/AISearch';
import UserAccount from './components/UserAccount';
import AboutContact from './components/AboutContact';
import AdminDashboard from './components/AdminDashboard';
import { products, categories, getRelatedProducts } from './data/products';
import { Product, CartItem, Order, Coupon } from './types';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Instagram, Send, CheckCircle2, ArrowUpRight, MessageSquare, Github, MessageCircle } from 'lucide-react';

export default function App() {
  const [currentView, setCurrentView] = useState('home'); // 'home', 'shop', 'about', 'contact', 'admin', 'account'
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  // Dialog togglers
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [voiceActive, setVoiceActive] = useState(false);

  // E-commerce state
  const [productsList, setProductsList] = useState<Product[]>(products);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Set<string>>(new Set());
  const [ordersList, setOrdersList] = useState<Order[]>([]);

  // Filtering states on Shop page
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortParam, setSortParam] = useState('trending'); // 'price-asc', 'price-desc', 'rating', 'trending'

  // Newsletter state
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubbed, setNewsletterSubbed] = useState(false);

  // Synchronize cart with localStorage if available
  useEffect(() => {
    const savedCart = localStorage.getItem('devine_cart');
    const savedWish = localStorage.getItem('devine_wishlist');
    const savedOrders = localStorage.getItem('devine_orders');
    
    if (savedCart) {
      try { setCartItems(JSON.parse(savedCart)); } catch (e) {}
    }
    if (savedWish) {
      try { setWishlist(new Set<string>(JSON.parse(savedWish))); } catch (e) {}
    }
    if (savedOrders) {
      try { setOrdersList(JSON.parse(savedOrders)); } catch (e) {}
    }
  }, []);

  const saveCartToStorage = (updatedCart: CartItem[]) => {
    setCartItems(updatedCart);
    localStorage.setItem('devine_cart', JSON.stringify(updatedCart));
  };

  const saveWishlistToStorage = (updatedWish: Set<string>) => {
    setWishlist(updatedWish);
    localStorage.setItem('devine_wishlist', JSON.stringify(Array.from(updatedWish)));
  };

  const saveOrdersToStorage = (updatedOrders: Order[]) => {
    setOrdersList(updatedOrders);
    localStorage.setItem('devine_orders', JSON.stringify(updatedOrders));
  };

  // Add to Cart
  const handleAddToCart = (product: Product, color: string, size: string, qty: number) => {
    const itemId = `${product.id}-${color}-${size}`;
    const existing = cartItems.find(item => item.id === itemId);
    
    let updated: CartItem[];
    if (existing) {
      updated = cartItems.map(item => 
        item.id === itemId ? { ...item, quantity: item.quantity + qty } : item
      );
    } else {
      updated = [...cartItems, {
        id: itemId,
        product,
        quantity: qty,
        selectedColor: color,
        selectedSize: size
      }];
    }

    saveCartToStorage(updated);
    setCartOpen(true); // Auto-slide open cart
  };

  // Quick add (Direct click from shop card)
  const handleAddToCartDirect = (product: Product) => {
    handleAddToCart(product, product.colors[0], product.sizes[1] || product.sizes[0], 1);
  };

  // Buy Now workflow
  const handleBuyNow = (product: Product, color: string, size: string, qty: number) => {
    handleAddToCart(product, color, size, qty);
    setCartOpen(false);
    setCurrentView('checkout');
    setSelectedProduct(null);
  };

  // Update Cart Quantity
  const handleUpdateQty = (itemId: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveItem(itemId);
      return;
    }
    const updated = cartItems.map(item => 
      item.id === itemId ? { ...item, quantity: newQty } : item
    );
    saveCartToStorage(updated);
  };

  // Remove Cart Item
  const handleRemoveItem = (itemId: string) => {
    const updated = cartItems.filter(item => item.id !== itemId);
    saveCartToStorage(updated);
  };

  // Toggle Wishlist
  const handleToggleWishlist = (product: Product) => {
    const updated = new Set<string>(wishlist);
    if (updated.has(product.id)) {
      updated.delete(product.id);
    } else {
      updated.add(product.id);
    }
    saveWishlistToStorage(updated);
  };

  // Handle Checkout procedure
  const handleCheckout = () => {
    setCartOpen(false);
    setCurrentView('checkout');
    setSelectedProduct(null);
  };

  // Order Success sync
  const handleOrderSuccess = (newOrder: Order) => {
    const updated = [newOrder, ...ordersList];
    saveOrdersToStorage(updated);
    
    // Clear cart
    saveCartToStorage([]);
  };

  // Cancel order
  const handleCancelOrder = (orderId: string) => {
    const updated = ordersList.map(o => 
      o.id === orderId ? { ...o, status: 'cancelled' } : o
    );
    saveOrdersToStorage(updated);
  };

  // Admin: Update order status
  const handleUpdateOrderStatus = (orderId: string, newStatus: string) => {
    const updated = ordersList.map(o => 
      o.id === orderId ? { ...o, status: newStatus } : o
    );
    saveOrdersToStorage(updated);
  };

  // Admin: Replenish stock counts
  const handleReplenishStock = (productId: string, newStock: number) => {
    const updated = productsList.map(p => 
      p.id === productId ? { ...p, stock: newStock } : p
    );
    setProductsList(updated);
  };

  // Newsletter submit
  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setNewsletterSubbed(true);
    setNewsletterEmail('');
    setTimeout(() => setNewsletterSubbed(false), 4000);
  };

  const handleOpenSearchWithVoice = () => {
    setVoiceActive(true);
    setSearchOpen(true);
  };

  // Category navigation from home grid
  const handleCategoryNavigate = (cat: string) => {
    setSelectedCategory(cat);
    setCurrentView('shop');
    setSelectedProduct(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // PDP Routing click
  const handleViewProduct = (p: Product) => {
    setSelectedProduct(p);
    setCurrentView('pdp');
  };

  // Filtered products for Shop page
  const filteredProducts = productsList.filter(p => {
    const matchesCategory = selectedCategory === 'ALL' || p.category === selectedCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  }).sort((a, b) => {
    if (sortParam === 'price-asc') return a.price - b.price;
    if (sortParam === 'price-desc') return b.price - a.price;
    if (sortParam === 'rating') return b.rating - a.rating;
    return b.isTrending ? 1 : -1; // Fallback to trending
  });

  const trendingHomeProducts = productsList.filter(p => p.isTrending || p.isBestSeller).slice(0, 4);

  return (
    <div className="min-h-screen bg-black flex flex-col justify-between text-white selection:bg-brand-accent selection:text-black relative overflow-x-hidden">
      {/* Immersive UI ambient radial grid pattern */}
      <div className="absolute inset-0 grid-pattern opacity-40 pointer-events-none z-0"></div>
      
      {/* FLOATING DECORATOR: SCROLL TO EXPLORE */}
      <div className="fixed right-6 bottom-24 z-40 hidden md:flex flex-col items-center gap-4 pointer-events-none select-none">
        <div className="w-10 h-10 rounded-full glass flex items-center justify-center border border-white/10 shadow-2xl">
          <div className="w-2 h-2 rounded-full bg-brand-accent animate-ping"></div>
        </div>
        <div className="vertical-text bebas text-[10px] tracking-[0.2em] text-zinc-500 font-bold uppercase">SCROLL TO EXPLORE</div>
        <div className="w-[1px] h-16 bg-gradient-to-b from-brand-accent/40 to-transparent"></div>
      </div>

      {/* Top running marquee promo */}
      <div className="bg-brand-accent text-black py-2.5 text-[10px] font-bold tracking-[0.25em] overflow-hidden select-none whitespace-nowrap border-b border-brand-accent">
        <div className="inline-block animate-[marquee_24s_linear_infinite] uppercase">
          DEVINE BLY CO • COMPLIMENTARY EXPEDITED SHIPPING ON DROPS ABOVE ₹2,500 • USE CODE <span className="underline">DEVINE10</span> FOR 10% DISCOUNT • RAW INDUSTRIAL TEXTILES • PROPORTIONS TAILORED GLOBALLY • 
        </div>
        <div className="inline-block animate-[marquee_24s_linear_infinite] uppercase ml-12">
          DEVINE BLY CO • COMPLIMENTARY EXPEDITED SHIPPING ON DROPS ABOVE ₹2,500 • USE CODE <span className="underline">DEVINE10</span> FOR 10% DISCOUNT • RAW INDUSTRIAL TEXTILES • PROPORTIONS TAILORED GLOBALLY • 
        </div>
      </div>

      {/* Sticky Navigation */}
      <Navbar
        currentView={currentView}
        onNavigate={(view) => {
          setCurrentView(view);
          setSelectedProduct(null);
        }}
        cartCount={cartItems.reduce((acc, it) => acc + it.quantity, 0)}
        wishlistCount={wishlist.size}
        onOpenCart={() => setCartOpen(true)}
        onOpenSearch={() => {
          setVoiceActive(false);
          setSearchOpen(true);
        }}
        onVoiceSearch={handleOpenSearchWithVoice}
      />

      {/* Main Viewport Routing */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          
          {/* PDP View */}
          {currentView === 'pdp' && selectedProduct && (
            <motion.div
              key="pdp-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <ProductPage
                product={selectedProduct}
                onBack={() => {
                  setSelectedProduct(null);
                  setCurrentView('shop');
                }}
                onAddToCart={handleAddToCart}
                onBuyNow={handleBuyNow}
                isWishlisted={wishlist.has(selectedProduct.id)}
                onToggleWishlist={handleToggleWishlist}
                relatedProducts={getRelatedProducts(selectedProduct, 4)}
                recentlyViewed={productsList.filter(p => p.id !== selectedProduct.id).slice(0, 4)}
                onViewProduct={handleViewProduct}
                onAddToCartDirect={handleAddToCartDirect}
                wishlistedIds={wishlist}
              />
            </motion.div>
          )}

          {/* Checkout View */}
          {currentView === 'checkout' && (
            <motion.div
              key="checkout-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Checkout
                cartItems={cartItems}
                appliedCoupon={null}
                onOrderSuccess={handleOrderSuccess}
                onCancel={() => setCurrentView('shop')}
              />
            </motion.div>
          )}

          {/* Home View */}
          {currentView === 'home' && (
            <motion.div
              key="home-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-0"
            >
              <Hero
                onShopClick={() => setCurrentView('shop')}
                onExploreClick={() => handleCategoryNavigate('ALL')}
              />
              
              <Categories onCategoryClick={handleCategoryNavigate} />

              {/* Home trending showcase */}
              <section className="py-24 bg-zinc-950 border-b border-zinc-900/40">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                  <div className="mb-12 text-center md:text-left">
                    <span className="font-sans text-[10px] font-bold tracking-[0.3em] text-brand-accent uppercase">
                      THE CURRENT METRICS
                    </span>
                    <h2 className="font-heading text-4xl sm:text-5xl font-bold tracking-widest text-white uppercase mt-2">
                      TRENDING STYLING DROPS
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {trendingHomeProducts.map((p) => (
                      <ProductCard
                        key={p.id}
                        product={p}
                        onViewProduct={handleViewProduct}
                        isWishlisted={wishlist.has(p.id)}
                        onToggleWishlist={handleToggleWishlist}
                        onAddToCartDirect={handleAddToCartDirect}
                      />
                    ))}
                  </div>

                  <div className="mt-12 text-center">
                    <button
                      onClick={() => setCurrentView('shop')}
                      className="font-button text-xs font-bold tracking-widest bg-zinc-900 hover:bg-brand-accent hover:text-black border border-zinc-800 text-white px-8 py-4 rounded-xl transition-all cursor-pointer uppercase"
                    >
                      VIEW WHOLE SPEC ARCHIVES
                    </button>
                  </div>
                </div>
              </section>

              {/* Newsletter subscription panel */}
              <section className="py-20 bg-black text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(#111_1.5px,transparent_1.5px)] [background-size:20px_20px] opacity-35" />
                <div className="relative z-10 mx-auto max-w-2xl px-4 sm:px-6">
                  <span className="font-sans text-[10px] font-bold tracking-[0.3em] text-brand-accent uppercase">
                    JOIN THE SYNDICATE
                  </span>
                  <h3 className="font-heading text-3xl sm:text-4xl tracking-widest text-white uppercase mt-3">
                    SUBSCRIBE FOR IN-HOUSE DROPS
                  </h3>
                  <p className="font-sans text-xs text-zinc-500 mt-2 max-w-md mx-auto leading-relaxed">
                    Be the first to access limited 480GSM loopback hoodie seedings and premium sneaks. No marketing filler. Pure textile releases.
                  </p>

                  {newsletterSubbed ? (
                    <motion.div
                      initial={{ scale: 0.95 }}
                      animate={{ scale: 1 }}
                      className="mt-8 bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-brand-accent text-xs font-sans flex items-center justify-center space-x-2 tracking-wider uppercase max-w-md mx-auto"
                    >
                      <CheckCircle2 className="h-4 w-4" />
                      <span>YOU ARE SUBSCRIBED TO DEVINE INTEL DISPATCHES</span>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleNewsletterSubmit} className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                      <input
                        type="email"
                        required
                        placeholder="Your premium email address"
                        value={newsletterEmail}
                        onChange={(e) => setNewsletterEmail(e.target.value)}
                        className="flex-grow rounded-lg bg-zinc-950 border border-zinc-900 px-4 py-3 text-xs text-white focus:outline-none focus:border-brand-accent"
                      />
                      <button
                        type="submit"
                        className="font-button text-xs font-bold tracking-widest bg-brand-accent hover:bg-white text-black py-3 px-6 rounded-lg transition-colors cursor-pointer uppercase"
                      >
                        SUBSCRIBE
                      </button>
                    </form>
                  )}
                </div>
              </section>
            </motion.div>
          )}

          {/* Shop View */}
          {currentView === 'shop' && (
            <motion.div
              key="shop-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="py-12 bg-black"
            >
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                
                {/* Title */}
                <div className="mb-12 text-center sm:text-left">
                  <span className="font-sans text-[10px] font-bold tracking-[0.3em] text-brand-accent uppercase">
                    DEVINE CO-ENTHUSIAST CATALOG
                  </span>
                  <h1 className="font-heading text-4xl sm:text-5xl font-bold tracking-widest text-white uppercase mt-2">
                    STREETWEAR SPEC ARCHIVES
                  </h1>
                </div>

                {/* Filters layout */}
                <div className="flex flex-col lg:flex-row gap-8 items-start mb-12">
                  
                  {/* Left filter swatches */}
                  <div className="flex flex-wrap gap-2 flex-grow">
                    {['ALL', ...categories.map(c => c.name)].map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`font-button text-[10px] font-bold tracking-widest px-4 py-2.5 rounded-lg border transition-all cursor-pointer uppercase ${
                          selectedCategory === cat
                            ? 'bg-brand-accent text-black border-brand-accent'
                            : 'bg-zinc-950 text-zinc-400 border-zinc-900 hover:border-zinc-700 hover:text-white'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>

                  {/* Search and Sort layout */}
                  <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
                    <input
                      type="text"
                      placeholder="Keyword Search..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="rounded-lg bg-zinc-950 border border-zinc-900 px-4 py-2.5 text-xs text-white focus:outline-none focus:border-brand-accent min-w-48"
                    />

                    <select
                      value={sortParam}
                      onChange={(e) => setSortParam(e.target.value)}
                      className="rounded-lg bg-zinc-950 border border-zinc-900 px-4 py-2.5 text-xs text-zinc-300 focus:outline-none cursor-pointer"
                    >
                      <option value="trending">Sort by: Trending</option>
                      <option value="price-asc">Price: Low to High</option>
                      <option value="price-desc">Price: High to Low</option>
                      <option value="rating">Top Rated</option>
                    </select>
                  </div>

                </div>

                {/* Items Grid */}
                {filteredProducts.length === 0 ? (
                  <div className="text-center py-24 text-zinc-500 text-xs font-sans border border-zinc-900 bg-zinc-950 rounded-2xl">
                    <p className="uppercase tracking-widest">No matching styling items found</p>
                    <p className="font-light text-zinc-600 mt-2">Try relaxing your search terms or category triggers!</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {filteredProducts.map((p) => (
                      <ProductCard
                        key={p.id}
                        product={p}
                        onViewProduct={handleViewProduct}
                        isWishlisted={wishlist.has(p.id)}
                        onToggleWishlist={handleToggleWishlist}
                        onAddToCartDirect={handleAddToCartDirect}
                      />
                    ))}
                  </div>
                )}

              </div>
            </motion.div>
          )}

          {/* About View */}
          {currentView === 'about' && (
            <motion.div
              key="about-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <AboutContact />
            </motion.div>
          )}

          {/* Contact View */}
          {currentView === 'contact' && (
            <motion.div
              key="contact-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <AboutContact />
            </motion.div>
          )}

          {/* Admin Dashboard */}
          {currentView === 'admin' && (
            <motion.div
              key="admin-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <AdminDashboard
                orders={ordersList}
                products={productsList}
                onUpdateOrderStatus={handleUpdateOrderStatus}
                onReplenishStock={handleReplenishStock}
              />
            </motion.div>
          )}

          {/* User Account Portal */}
          {currentView === 'account' && (
            <motion.div
              key="account-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <UserAccount
                ordersList={ordersList}
                onCancelOrder={handleCancelOrder}
                wishlistProducts={productsList.filter(p => wishlist.has(p.id))}
                onRemoveFromWishlist={handleToggleWishlist}
                onViewProduct={handleViewProduct}
              />
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* FOOTER */}
      <footer className="bg-zinc-950 border-t border-zinc-900 pt-16 pb-8 text-xs font-sans text-zinc-500">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8 pb-12 border-b border-zinc-900/60">
          
          {/* Brand Intro info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-1">
              <span className="font-heading text-2xl font-bold tracking-[0.25em] text-white">DEVINE</span>
              <span className="font-sans text-[8px] font-semibold tracking-widest text-brand-accent pt-1">BLY</span>
            </div>
            <p className="leading-relaxed font-light text-zinc-400">
              A global premium luxury streetwear brand supplying loopback flannels, heavy cargos, oversized tees, sneakers, and accessory hardware.
            </p>
            <div className="flex items-center space-x-3 text-zinc-400">
              <a href="https://www.instagram.com/devine_bly/" target="_blank" rel="noreferrer" className="rounded bg-zinc-900 p-2 border border-zinc-800 hover:text-brand-accent transition-colors">
                <Instagram className="h-4 w-4" />
              </a>
              <div className="rounded bg-zinc-900 p-2 border border-zinc-800 hover:text-brand-accent transition-colors cursor-pointer">
                <Github className="h-4 w-4" />
              </div>
              <div className="rounded bg-zinc-900 p-2 border border-zinc-800 hover:text-brand-accent transition-colors cursor-pointer">
                <MessageCircle className="h-4 w-4" />
              </div>
            </div>
          </div>

          {/* Quick segments Links */}
          <div className="space-y-4">
            <h4 className="font-heading text-lg tracking-widest text-white uppercase font-bold">SEGMENTS</h4>
            <ul className="space-y-2.5 font-light">
              {categories.slice(0, 4).map(c => (
                <li key={c.name}>
                  <button onClick={() => handleCategoryNavigate(c.name)} className="hover:text-white transition-colors cursor-pointer uppercase tracking-wider text-[11px]">
                    {c.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources links */}
          <div className="space-y-4">
            <h4 className="font-heading text-lg tracking-widest text-white uppercase font-bold">RESOURCES</h4>
            <ul className="space-y-2.5 font-light">
              <li><button onClick={() => setCurrentView('about')} className="hover:text-white transition-colors cursor-pointer text-[11px] tracking-wider uppercase">BRAND PHILOSOPHY</button></li>
              <li><button onClick={() => setCurrentView('contact')} className="hover:text-white transition-colors cursor-pointer text-[11px] tracking-wider uppercase">HELP CONCIERGE</button></li>
              <li><button onClick={() => setCurrentView('account')} className="hover:text-white transition-colors cursor-pointer text-[11px] tracking-wider uppercase">CO-ENTHUSIAST ACCOUNT</button></li>
              <li><button onClick={() => setCurrentView('admin')} className="hover:text-white transition-colors cursor-pointer text-[11px] tracking-wider uppercase">METRIC PANEL</button></li>
            </ul>
          </div>

          {/* Support desk */}
          <div className="space-y-4">
            <h4 className="font-heading text-lg tracking-widest text-white uppercase font-bold">SUPPORT CONCIERGE</h4>
            <p className="leading-relaxed font-light text-zinc-400">
              Live helpline active 10:00 AM - 07:00 PM (IST). Custom order requests via WhatsApp or email channel.
            </p>
            <p className="text-white font-bold text-[11px] tracking-wider uppercase">
              📞 +91 99881 22430<br />
              ✉️ concierge@devinebly.com
            </p>
          </div>

        </div>

        {/* Legal copyrights */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-8 flex flex-col sm:flex-row items-center justify-between text-[10px] text-zinc-600 uppercase tracking-widest gap-4">
          <p>© 2026 DEVINE BLY CO. ALL STREET RIGHTS ARCHIVED.</p>
          <div className="flex space-x-6">
            <span className="hover:text-zinc-400 cursor-pointer">PRIVACY RULES</span>
            <span className="hover:text-zinc-400 cursor-pointer">Fit GUIDES</span>
            <span className="hover:text-zinc-400 cursor-pointer">SHIPROCKET TRANSITS</span>
          </div>
        </div>
      </footer>

      {/* FLOATING CART DRAWER */}
      <Cart
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cartItems={cartItems}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveItem}
        onCheckout={handleCheckout}
      />

      {/* FLOATING AI SEARCH PANEL */}
      <AISearch
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onSelectProduct={handleViewProduct}
        voiceActiveOnInit={voiceActive}
      />

    </div>
  );
}

