import React, { useState, useEffect } from 'react';
import { Product, Review } from '../types';
import { ArrowLeft, Star, Heart, Share2, ShoppingBag, Truck, ShieldCheck, ChevronRight, MessageSquare, Plus, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import ProductCard from './ProductCard';

interface ProductPageProps {
  product: Product;
  onBack: () => void;
  onAddToCart: (product: Product, color: string, size: string, qty: number) => void;
  onBuyNow: (product: Product, color: string, size: string, qty: number) => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
  relatedProducts: Product[];
  recentlyViewed: Product[];
  onViewProduct: (product: Product) => void;
  onAddToCartDirect: (product: Product) => void;
  wishlistedIds: Set<string>;
}

export default function ProductPage({
  product,
  onBack,
  onAddToCart,
  onBuyNow,
  isWishlisted,
  onToggleWishlist,
  relatedProducts,
  recentlyViewed,
  onViewProduct,
  onAddToCartDirect,
  wishlistedIds
}: ProductPageProps) {
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[1] || product.sizes[0]);
  const [quantity, setQuantity] = useState(1);
  const [pinCode, setPinCode] = useState('');
  const [deliveryResult, setDeliveryResult] = useState<string | null>(null);
  const [deliveryLoading, setDeliveryLoading] = useState(false);
  const [view360Active, setView360Active] = useState(false);
  const [activeAngle, setActiveAngle] = useState('Front'); // 'Front', 'Side', 'Back', 'Detail', 'Model'

  // Frequently bought together bundle calculation
  const bundleItem = relatedProducts[0] || null;
  const bundleSaving = 400; // Flat discount
  const combinedPrice = bundleItem ? (product.price + bundleItem.price - bundleSaving) : product.price;

  // Review states
  const [reviews, setReviews] = useState<Review[]>([]);
  const [newReviewName, setNewReviewName] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewComment, setNewReviewComment] = useState('');
  const [reviewSubmitSuccess, setReviewSubmitSuccess] = useState(false);
  const [loadingReviews, setLoadingReviews] = useState(true);

  // Fetch reviews from server
  const fetchReviews = async () => {
    setLoadingReviews(true);
    try {
      const res = await fetch(`/api/reviews?productId=${product.id}`);
      const data = await res.json();
      if (data.reviews) {
        setReviews(data.reviews);
      }
    } catch (e) {
      console.error('Error fetching reviews:', e);
    } finally {
      setLoadingReviews(false);
    }
  };

  useEffect(() => {
    fetchReviews();
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setSelectedImageIdx(0);
    setSelectedColor(product.colors[0]);
    setSelectedSize(product.sizes[1] || product.sizes[0]);
    setQuantity(1);
    setDeliveryResult(null);
    setPinCode('');
  }, [product]);

  // Submit Review
  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewName || !newReviewComment) return;

    try {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: product.id,
          userName: newReviewName,
          rating: newReviewRating,
          comment: newReviewComment
        })
      });

      const data = await response.json();
      if (data.success) {
        setReviewSubmitSuccess(true);
        setNewReviewName('');
        setNewReviewComment('');
        setNewReviewRating(5);
        fetchReviews(); // reload list
        setTimeout(() => setReviewSubmitSuccess(false), 3000);
      }
    } catch (err) {
      console.error('Error submitting review:', err);
    }
  };

  // Check delivery pincode via simulated Shiprocket routing
  const handleCheckDelivery = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pinCode || pinCode.length < 6) return;

    setDeliveryLoading(true);
    setTimeout(() => {
      setDeliveryLoading(false);
      // Clean high fidelity estimation
      const firstDigit = pinCode.charAt(0);
      if (['1', '2', '3'].includes(firstDigit)) {
        setDeliveryResult('✅ Standard express delivery available! Expected delivery: Tomorrow, via Shiprocket Premium Air Cargo.');
      } else if (['4', '5', '6'].includes(firstDigit)) {
        setDeliveryResult('✅ Fast delivery available! Expected arrival in 2-3 business days via Shiprocket Express Ground.');
      } else {
        setDeliveryResult('✅ Standard delivery available! Expected arrival in 3-5 business days via Shiprocket Prime.');
      }
    }, 800);
  };

  // Add the bundle (both items) directly to the cart
  const handleAddBundle = () => {
    onAddToCart(product, selectedColor, selectedSize, 1);
    if (bundleItem) {
      onAddToCart(bundleItem, bundleItem.colors[0], bundleItem.sizes[1] || bundleItem.sizes[0], 1);
    }
  };

  const handleShareProduct = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('Product link copied to clipboard! Share the DEVINE style.');
  };

  // Angle definitions for our 360 cinematic simulator
  const angles = [
    { name: 'Front', imgIdx: 0 },
    { name: 'Side/Left', imgIdx: 1 },
    { name: 'Back/Detail', imgIdx: 2 }
  ];

  return (
    <div className="bg-black py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb / Back button */}
        <button
          id="product-back-btn"
          onClick={onBack}
          className="group inline-flex items-center space-x-2 text-zinc-400 hover:text-white transition-colors mb-8 text-xs font-bold tracking-widest cursor-pointer uppercase"
        >
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          <span>BACK TO COLLECTIONS</span>
        </button>

        {/* Product Showcase Split */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          
          {/* Images Section */}
          <div className="flex flex-col space-y-4">
            
            {/* Main Stage Image / Interactive 360 view */}
            <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl border border-zinc-900 bg-zinc-950">
              <AnimatePresence mode="wait">
                <motion.img
                  key={view360Active ? activeAngle : selectedImageIdx}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  src={view360Active 
                    ? product.images[angles.find(a => a.name === activeAngle)?.imgIdx || 0] || product.images[0]
                    : product.images[selectedImageIdx]
                  }
                  alt={`${product.name} Preview`}
                  className="h-full w-full object-cover object-center"
                  referrerPolicy="no-referrer"
                />
              </AnimatePresence>

              {/* 360 Controller overlay */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center bg-black/80 backdrop-blur-md rounded-full px-4 py-2 border border-zinc-800 space-x-2">
                <button
                  id="toggle-360-btn"
                  onClick={() => setView360Active(!view360Active)}
                  className={`px-3 py-1 text-[10px] font-bold tracking-widest rounded-full transition-all cursor-pointer ${
                    view360Active ? 'bg-brand-accent text-black' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  360° VIEW
                </button>
                {view360Active && (
                  <div className="flex items-center space-x-1 border-l border-zinc-700 pl-2">
                    {angles.map((ang) => (
                      <button
                        key={ang.name}
                        onClick={() => setActiveAngle(ang.name)}
                        className={`px-2 py-0.5 text-[9px] font-bold uppercase rounded transition-colors cursor-pointer ${
                          activeAngle === ang.name ? 'bg-zinc-800 text-brand-accent' : 'text-zinc-500 hover:text-zinc-300'
                        }`}
                      >
                        {ang.name.split('/')[0]}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Thumbnail carousel */}
            {!view360Active && (
              <div className="grid grid-cols-4 gap-4">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setSelectedImageIdx(idx);
                      setView360Active(false);
                    }}
                    className={`aspect-[3/4] rounded-xl overflow-hidden border bg-zinc-950 transition-all ${
                      selectedImageIdx === idx && !view360Active 
                        ? 'border-brand-accent scale-102 ring-1 ring-brand-accent/20' 
                        : 'border-zinc-900 hover:border-zinc-700'
                    }`}
                  >
                    <img
                      src={img}
                      alt="Thumbnail"
                      className="h-full w-full object-cover object-center"
                      referrerPolicy="no-referrer"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details Column */}
          <div className="flex flex-col justify-start">
            <div className="border-b border-zinc-900 pb-6">
              <span className="font-sans text-[10px] font-bold tracking-[0.3em] text-brand-accent uppercase">
                {product.category}
              </span>
              <h1 className="font-heading text-4xl sm:text-5xl font-bold tracking-wider text-white uppercase mt-2 leading-tight">
                {product.name}
              </h1>

              {/* Stars & Reviews summary */}
              <div className="flex items-center space-x-4 mt-4">
                <div className="flex items-center text-brand-accent space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'fill-brand-accent' : 'text-zinc-800'}`}
                    />
                  ))}
                  <span className="font-sans text-xs font-semibold text-white ml-2">
                    {product.rating}
                  </span>
                </div>
                <span className="text-zinc-500 text-xs font-sans">|</span>
                <span className="text-zinc-400 text-xs font-sans hover:text-white cursor-pointer underline flex items-center space-x-1">
                  <MessageSquare className="h-3 w-3 mr-1" />
                  <span>{reviews.length || product.reviewsCount} verified customer reviews</span>
                </span>
              </div>
            </div>

            {/* Pricing Area */}
            <div className="py-6 border-b border-zinc-900">
              <div className="flex items-baseline space-x-4">
                <span className="font-sans text-3xl font-bold text-white">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                {product.originalPrice && (
                  <span className="font-sans text-lg text-zinc-500 line-through">
                    ₹{product.originalPrice.toLocaleString('en-IN')}
                  </span>
                )}
                {product.originalPrice && (
                  <span className="font-sans text-xs font-bold text-brand-accent bg-brand-accent/10 px-2 py-0.5 rounded">
                    Save ₹{(product.originalPrice - product.price).toLocaleString('en-IN')}
                  </span>
                )}
              </div>
              <p className="font-sans text-xs text-zinc-400 mt-4 leading-relaxed font-light">
                {product.description}
              </p>
            </div>

            {/* Dynamic Attributes (Size / Color) */}
            <div className="py-6 border-b border-zinc-900 space-y-6">
              
              {/* Colors selection */}
              <div>
                <span className="font-sans text-[10px] font-bold tracking-widest text-zinc-400 uppercase">
                  COLORWAY: <span className="text-white ml-1 font-semibold">{selectedColor}</span>
                </span>
                <div className="flex items-center space-x-3 mt-3">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`h-8 w-8 rounded-full border-2 cursor-pointer transition-all ${
                        selectedColor === color 
                          ? 'border-brand-accent scale-110 shadow-lg shadow-brand-accent/20' 
                          : 'border-zinc-900 hover:border-zinc-700'
                      }`}
                      style={{ backgroundColor: color }}
                      title={`Color ${color}`}
                    />
                  ))}
                </div>
              </div>

              {/* Sizes selection */}
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-sans text-[10px] font-bold tracking-widest text-zinc-400 uppercase">
                    SELECT SIZE: <span className="text-white ml-1 font-semibold">{selectedSize}</span>
                  </span>
                  <button className="text-[10px] font-bold tracking-wider text-brand-accent hover:underline uppercase">
                    SIZE GUIDE
                  </button>
                </div>
                <div className="flex flex-wrap gap-2.5 mt-3">
                  {product.sizes.map((sz) => (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(sz)}
                      className={`font-button text-[11px] font-bold px-4 py-2.5 rounded-lg border transition-all cursor-pointer ${
                        selectedSize === sz
                          ? 'bg-brand-accent text-black border-brand-accent font-bold scale-102'
                          : 'bg-zinc-950 text-zinc-400 border-zinc-900 hover:border-zinc-700 hover:text-white'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
                {/* Low Stock Warn */}
                {product.stock < 25 && (
                  <p className="text-[10px] text-red-500 font-sans tracking-wide mt-3 animate-pulse uppercase font-medium">
                    ⚠️ CRITICAL STOCK: ONLY {product.stock} PIECES REMAINING FOR CO-ENTHUSIASTS
                  </p>
                )}
              </div>

              {/* Quantity Selection */}
              <div>
                <span className="font-sans text-[10px] font-bold tracking-widest text-zinc-400 uppercase">
                  QUANTITY
                </span>
                <div className="flex items-center space-x-3 mt-3">
                  <div className="flex items-center border border-zinc-900 rounded-lg overflow-hidden bg-zinc-950">
                    <button
                      onClick={() => setQuantity(q => Math.max(1, q - 1))}
                      className="px-4 py-2 hover:bg-zinc-900 text-zinc-400 hover:text-white transition-colors"
                    >
                      -
                    </button>
                    <span className="px-5 font-semibold text-xs text-white">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(q => q + 1)}
                      className="px-4 py-2 hover:bg-zinc-900 text-zinc-400 hover:text-white transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

            </div>

            {/* Buying Action buttons */}
            <div className="py-6 border-b border-zinc-900 space-y-4">
              <div className="flex flex-col sm:flex-row gap-4">
                
                <button
                  id="pdp-add-to-cart-btn"
                  onClick={() => onAddToCart(product, selectedColor, selectedSize, quantity)}
                  className="flex-grow font-button text-xs font-bold tracking-widest bg-white hover:bg-brand-accent text-black hover:text-black py-4 rounded-xl transition-all duration-300 flex items-center justify-center space-x-3 cursor-pointer uppercase"
                >
                  <ShoppingBag className="h-4 w-4" />
                  <span>ADD TO SHOPPING CART</span>
                </button>

                <button
                  id="pdp-buy-now-btn"
                  onClick={() => onBuyNow(product, selectedColor, selectedSize, quantity)}
                  className="flex-grow font-button text-xs font-bold tracking-widest bg-brand-accent hover:bg-white text-black hover:text-black py-4 rounded-xl transition-all duration-300 flex items-center justify-center space-x-3 cursor-pointer uppercase shadow-lg shadow-brand-accent/10"
                >
                  <span>BUY IT NOW</span>
                </button>

              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  onClick={() => onToggleWishlist(product)}
                  className="flex items-center space-x-2 text-zinc-400 hover:text-white text-xs font-semibold tracking-wider uppercase transition-colors"
                >
                  <Heart className={`h-4 w-4 ${isWishlisted ? 'fill-brand-accent text-brand-accent' : ''}`} />
                  <span>{isWishlisted ? 'REMOVE FROM WISHLIST' : 'ADD TO WISHLIST'}</span>
                </button>

                <button
                  onClick={handleShareProduct}
                  className="flex items-center space-x-2 text-zinc-400 hover:text-white text-xs font-semibold tracking-wider uppercase transition-colors"
                >
                  <Share2 className="h-4 w-4" />
                  <span>SHARE THE LOOK</span>
                </button>
              </div>
            </div>

            {/* Shiprocket Pincode Checker */}
            <div className="py-6 border-b border-zinc-900">
              <div className="flex items-center space-x-2 text-zinc-300 mb-3">
                <Truck className="h-4 w-4 text-brand-accent" />
                <span className="font-sans text-[10px] font-bold tracking-widest uppercase">
                  DELIVERY PINCODE CHECKER
                </span>
              </div>
              <form onSubmit={handleCheckDelivery} className="flex space-x-3 max-w-sm">
                <input
                  type="text"
                  maxLength={6}
                  placeholder="Enter 6-Digit PIN (e.g. 110001)"
                  value={pinCode}
                  onChange={(e) => setPinCode(e.target.value.replace(/\D/g, ''))}
                  className="flex-grow rounded-lg bg-zinc-950 border border-zinc-900 px-4 py-2.5 text-xs text-white focus:outline-none focus:border-brand-accent"
                />
                <button
                  type="submit"
                  className="font-button text-[10px] font-bold tracking-widest bg-zinc-900 hover:bg-brand-accent hover:text-black border border-zinc-800 text-white px-5 rounded-lg transition-all cursor-pointer uppercase"
                >
                  {deliveryLoading ? 'CHECKING...' : 'CHECK'}
                </button>
              </form>
              {deliveryResult && (
                <p className="text-[11px] font-sans text-zinc-300 mt-3 p-3 bg-zinc-950 rounded-lg border border-zinc-900/60 leading-normal">
                  {deliveryResult}
                </p>
              )}
            </div>

            {/* Secure Badges */}
            <div className="py-6 flex items-center justify-between border-b border-zinc-900 text-zinc-500 text-[10px] uppercase font-sans tracking-widest font-medium">
              <div className="flex items-center space-x-2">
                <ShieldCheck className="h-4 w-4 text-brand-accent" />
                <span>100% Original Products</span>
              </div>
              <div className="flex items-center space-x-2">
                <Truck className="h-4 w-4 text-brand-accent" />
                <span>7 Days Hassle-Free Returns</span>
              </div>
            </div>

            {/* Specs Accordion */}
            <div className="py-6 space-y-4 border-b border-zinc-900">
              <h3 className="font-sans text-[11px] font-bold tracking-widest text-zinc-300 uppercase">
                SPECIFICATIONS & FIT
              </h3>
              <div className="grid grid-cols-2 gap-4 text-xs font-sans">
                {Object.entries(product.specs).map(([key, val]) => (
                  <div key={key} className="border-b border-zinc-950 pb-2">
                    <p className="text-zinc-500 uppercase text-[9px] tracking-wider">{key}</p>
                    <p className="text-white mt-0.5">{val}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* FREQUENTLY BOUGHT TOGETHER BUNDLE (Upsell Module) */}
        {bundleItem && (
          <div className="mt-20 bg-zinc-950 rounded-2xl border border-zinc-900 p-6 md:p-8">
            <h3 className="font-heading text-xl sm:text-2xl tracking-widest text-white uppercase mb-6">
              FREQUENTLY BOUGHT TOGETHER
            </h3>
            
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
              
              {/* Items visualization */}
              <div className="flex items-center space-x-4 md:space-x-8">
                
                {/* Product 1 */}
                <div className="flex items-center space-x-4 bg-black/60 rounded-xl p-3 border border-zinc-900 w-52 md:w-64">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="h-16 w-12 object-cover rounded-md"
                  />
                  <div className="min-w-0">
                    <p className="font-heading text-sm text-white tracking-wider line-clamp-1">{product.name}</p>
                    <p className="font-sans text-xs text-brand-accent font-bold mt-1">₹{product.price.toLocaleString('en-IN')}</p>
                  </div>
                </div>

                <div className="text-zinc-600 font-sans text-2xl font-light">+</div>

                {/* Product 2 */}
                <div className="flex items-center space-x-4 bg-black/60 rounded-xl p-3 border border-zinc-900 w-52 md:w-64">
                  <img
                    src={bundleItem.images[0]}
                    alt={bundleItem.name}
                    className="h-16 w-12 object-cover rounded-md"
                  />
                  <div className="min-w-0">
                    <p className="font-heading text-sm text-white tracking-wider line-clamp-1">{bundleItem.name}</p>
                    <p className="font-sans text-xs text-brand-accent font-bold mt-1">₹{bundleItem.price.toLocaleString('en-IN')}</p>
                  </div>
                </div>

              </div>

              {/* Price & Action */}
              <div className="text-center lg:text-right flex flex-col items-center lg:items-end space-y-3">
                <div>
                  <p className="font-sans text-xs text-zinc-500 uppercase">BUNDLE PRICE</p>
                  <div className="flex items-baseline space-x-2 justify-center lg:justify-end mt-1">
                    <span className="font-sans text-2xl font-bold text-white">₹{combinedPrice.toLocaleString('en-IN')}</span>
                    <span className="font-sans text-xs text-zinc-500 line-through">₹{(product.price + bundleItem.price).toLocaleString('en-IN')}</span>
                  </div>
                  <p className="font-sans text-[10px] text-green-500 uppercase font-semibold mt-1">
                    🎉 SAVE ₹{bundleSaving.toLocaleString('en-IN')} ON COMBO DEALS!
                  </p>
                </div>
                
                <button
                  id="add-bundle-btn"
                  onClick={handleAddBundle}
                  className="font-button text-[10px] font-bold tracking-widest bg-brand-accent hover:bg-white text-black px-6 py-3.5 rounded-xl transition-all duration-300 flex items-center space-x-2 cursor-pointer uppercase"
                >
                  <Plus className="h-4 w-4 text-black" />
                  <span>ADD BUNDLE TO CART</span>
                </button>
              </div>

            </div>
          </div>
        )}

        {/* CUSTOMER REVIEWS (Synchronized CRUD Panel) */}
        <div id="reviews-panel" className="mt-24 border-t border-zinc-900 pt-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
            
            {/* Reviews aggregate bar chart */}
            <div>
              <h3 className="font-heading text-3xl tracking-wider text-white uppercase">
                CUSTOMER REVIEWS
              </h3>
              
              <div className="flex items-center space-x-4 mt-4">
                <span className="font-sans text-5xl font-extrabold text-white">{product.rating}</span>
                <div>
                  <div className="flex text-brand-accent">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-brand-accent text-brand-accent" />
                    ))}
                  </div>
                  <p className="font-sans text-xs text-zinc-400 mt-1">
                    Based on {reviews.length} authenticated ratings
                  </p>
                </div>
              </div>

              {/* Bar charts distribution */}
              <div className="mt-8 space-y-3">
                {[5, 4, 3, 2, 1].map((stars) => {
                  const count = reviews.filter(r => r.rating === stars).length;
                  const total = reviews.length || 1;
                  const pct = Math.round((count / total) * 100);
                  return (
                    <div key={stars} className="flex items-center text-xs font-sans">
                      <span className="w-10 text-zinc-500 uppercase">{stars} Stars</span>
                      <div className="flex-grow h-2 bg-zinc-900 rounded-full mx-4 overflow-hidden border border-zinc-900/60">
                        <div className="h-full bg-brand-accent rounded-full" style={{ width: `${pct}%` }} />
                      </div>
                      <span className="w-8 text-zinc-400 text-right">{pct}%</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Real Review list */}
            <div className="lg:col-span-2 space-y-8">
              
              {/* Form to post a review */}
              <div className="bg-zinc-950 rounded-2xl border border-zinc-900 p-6">
                <h4 className="font-heading text-xl tracking-widest text-white uppercase mb-4">
                  POST YOUR EXPERTISE REVIEW
                </h4>
                {reviewSubmitSuccess ? (
                  <motion.div
                    initial={{ scale: 0.95 }}
                    animate={{ scale: 1 }}
                    className="bg-brand-accent/15 border border-brand-accent/40 rounded-xl p-4 text-brand-accent text-xs font-sans flex items-center space-x-3 uppercase tracking-wider"
                  >
                    <Check className="h-5 w-5 text-brand-accent" />
                    <span>STYLING REVIEW PERSISTED SUCCESSFULLY ON THE SERVER!</span>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmitReview} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-sans text-zinc-500 uppercase tracking-widest mb-1">Your Name</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Jordan V."
                          value={newReviewName}
                          onChange={(e) => setNewReviewName(e.target.value)}
                          className="w-full rounded-lg bg-black border border-zinc-900 px-4 py-2.5 text-xs text-white focus:outline-none focus:border-brand-accent"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-sans text-zinc-500 uppercase tracking-widest mb-1">Rating Selection</label>
                        <select
                          value={newReviewRating}
                          onChange={(e) => setNewReviewRating(Number(e.target.value))}
                          className="w-full rounded-lg bg-black border border-zinc-900 px-4 py-2.5 text-xs text-white focus:outline-none focus:border-brand-accent"
                        >
                          <option value={5}>5 Stars (Excellent Tailoring)</option>
                          <option value={4}>4 Stars (Very High Quality)</option>
                          <option value={3}>3 Stars (Average Stitching)</option>
                          <option value={2}>2 Stars (Needs Refinement)</option>
                          <option value={1}>1 Star (Poor Styling)</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-[10px] font-sans text-zinc-500 uppercase tracking-widest mb-1">Commentary / Fit Advice</label>
                      <textarea
                        required
                        rows={3}
                        placeholder="Detail your thoughts on fabric quality, sizing drape, and styling matches..."
                        value={newReviewComment}
                        onChange={(e) => setNewReviewComment(e.target.value)}
                        className="w-full rounded-lg bg-black border border-zinc-900 px-4 py-2.5 text-xs text-white focus:outline-none focus:border-brand-accent"
                      />
                    </div>
                    <button
                      type="submit"
                      className="font-button text-[10px] font-bold tracking-widest bg-brand-accent hover:bg-white text-black px-6 py-3 rounded-lg transition-all cursor-pointer uppercase"
                    >
                      SUBMIT SECURE REVIEW
                    </button>
                  </form>
                )}
              </div>

              {/* Reviews Feed */}
              <div className="space-y-6">
                {loadingReviews ? (
                  <p className="text-zinc-500 text-xs font-sans animate-pulse uppercase tracking-widest">LOADING CORE REVIEWS FEED...</p>
                ) : reviews.length === 0 ? (
                  <p className="text-zinc-600 text-xs font-sans uppercase">No reviews yet. Be the first to advise the street-culture co-enthusiasts!</p>
                ) : (
                  reviews.map((rev) => (
                    <div key={rev.id} className="border-b border-zinc-900 pb-6 text-xs font-sans">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="h-8 w-8 rounded-full bg-brand-accent/10 border border-brand-accent/25 flex items-center justify-center font-bold text-brand-accent text-[10px]">
                            {rev.userName.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <p className="text-white font-semibold">{rev.userName}</p>
                            <p className="text-[10px] text-zinc-500 mt-0.5">{rev.date}</p>
                          </div>
                        </div>
                        <div className="flex text-brand-accent">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-3.5 w-3.5 ${i < rev.rating ? 'fill-brand-accent text-brand-accent' : 'text-zinc-800'}`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-zinc-400 mt-4 leading-relaxed font-light">
                        {rev.comment}
                      </p>
                      {rev.verified && (
                        <div className="flex items-center text-emerald-500 text-[9px] tracking-wider uppercase mt-2.5 font-semibold">
                          <Check className="h-3 w-3 mr-1" />
                          <span>VERIFIED CO-ENTHUSIAST APPAREL BUYER</span>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>

            </div>

          </div>
        </div>

        {/* RELATED PRODUCTS */}
        <div className="mt-32 border-t border-zinc-900 pt-16">
          <h3 className="font-heading text-3xl tracking-wider text-white uppercase mb-8">
            RECOMMENDED COMPATIBLES
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.slice(0, 4).map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                onViewProduct={onViewProduct}
                isWishlisted={wishlistedIds.has(p.id)}
                onToggleWishlist={onToggleWishlist}
                onAddToCartDirect={onAddToCartDirect}
              />
            ))}
          </div>
        </div>

        {/* RECENTLY VIEWED PRODUCTS */}
        {recentlyViewed.length > 0 && (
          <div className="mt-32 border-t border-zinc-900 pt-16">
            <h3 className="font-heading text-3xl tracking-wider text-zinc-400 uppercase mb-8">
              RECENTLY VIEWED SEGMENTS
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {recentlyViewed.slice(0, 4).map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  onViewProduct={onViewProduct}
                  isWishlisted={wishlistedIds.has(p.id)}
                  onToggleWishlist={onToggleWishlist}
                  onAddToCartDirect={onAddToCartDirect}
                />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
