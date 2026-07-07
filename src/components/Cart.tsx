import React, { useState } from 'react';
import { CartItem, Coupon } from '../types';
import { X, ShoppingBag, Trash2, ArrowRight, Tag, Percent, Gift } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQty: (itemId: string, newQty: number) => void;
  onRemoveItem: (itemId: string) => void;
  onCheckout: (appliedCoupon: Coupon | null) => void;
}

export default function Cart({
  isOpen,
  onClose,
  cartItems,
  onUpdateQty,
  onRemoveItem,
  onCheckout
}: CartProps) {
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [couponError, setCouponError] = useState<string | null>(null);

  // Available coupons list for reference
  const availableCoupons: Coupon[] = [
    { code: 'DEVINE10', discount: 10, type: 'percent', description: '10% OFF on all streetwear' },
    { code: 'GOLDVIP', discount: 500, type: 'fixed', minSpend: 3000, description: 'Flat 500 off on orders above 3000' },
    { code: 'STREETFIRST', discount: 15, type: 'percent', description: '15% OFF first order' }
  ];

  const subtotal = cartItems.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  
  // Shipping target (Free shipping above ₹2500)
  const shippingThreshold = 2500;
  const shippingCost = subtotal >= shippingThreshold || subtotal === 0 ? 0 : 150;
  
  // Coupon Discount
  let discountAmount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.type === 'percent') {
      discountAmount = Math.round((subtotal * appliedCoupon.discount) / 100);
    } else if (appliedCoupon.type === 'fixed') {
      discountAmount = appliedCoupon.discount;
    }
  }

  const grandTotal = Math.max(0, subtotal - discountAmount + shippingCost);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError(null);
    const code = couponCode.trim().toUpperCase();
    
    const matched = availableCoupons.find(c => c.code === code);
    if (!matched) {
      setCouponError('Invalid coupon code. Try DEVINE10, STREETFIRST, or GOLDVIP.');
      return;
    }

    if (matched.minSpend && subtotal < matched.minSpend) {
      setCouponError(`Minimum spend of ₹${matched.minSpend} required for this coupon.`);
      return;
    }

    setAppliedCoupon(matched);
    setCouponCode('');
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/80"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed bottom-0 right-0 top-0 z-50 w-full max-w-md bg-black/90 p-6 shadow-2xl border-l border-white/10 flex flex-col h-full glass"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-5">
              <div className="flex items-center space-x-2.5">
                <ShoppingBag className="h-5 w-5 text-brand-accent" />
                <h2 className="bebas text-3xl tracking-wider text-white uppercase">
                  SHOPPING BAG ({cartItems.length})
                </h2>
              </div>
              <button
                id="close-cart-btn"
                className="rounded-sm text-zinc-400 hover:text-white p-2 border border-white/10 bg-white/5"
                onClick={onClose}
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Free Shipping Indicator */}
            {subtotal > 0 && (
              <div className="mt-4 p-3 rounded-sm bg-[#111111] border border-white/5 text-center">
                {subtotal >= shippingThreshold ? (
                  <p className="font-sans text-[10px] text-green-500 font-semibold tracking-wider uppercase">
                    🎉 CONGRATS! YOU HAVE EARNED FREE COMPLIMENTARY EXPRESS DELIVERY
                  </p>
                ) : (
                  <p className="font-sans text-[10px] text-zinc-400 font-medium tracking-wide">
                    ADD <span className="font-bold text-white">₹{(shippingThreshold - subtotal).toLocaleString('en-IN')}</span> MORE TO UNLOCK FREE COMPLIMENTARY COURIER
                  </p>
                )}
                <div className="mt-2 w-full bg-black h-1.5 rounded-sm overflow-hidden">
                  <div 
                    className="h-full bg-brand-accent transition-all duration-500" 
                    style={{ width: `${Math.min(100, (subtotal / shippingThreshold) * 100)}%` }}
                  />
                </div>
              </div>
            )}

            {/* Cart Items List */}
            <div className="flex-grow overflow-y-auto mt-6 pr-2 space-y-4">
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <div className="rounded-sm bg-[#111111] p-6 border border-white/5">
                    <ShoppingBag className="h-10 w-10 text-zinc-600" />
                  </div>
                  <h3 className="bebas text-2xl tracking-wider text-white mt-4 uppercase">YOUR BAG IS EMPTY</h3>
                  <p className="font-sans text-xs text-zinc-500 max-w-xs mt-2">
                    WE DON'T FOLLOW TRENDS. DISCOVER BRAND ARRIVALS AND SEEDS OF THE NEXT ERA.
                  </p>
                  <button
                    onClick={onClose}
                    className="mt-6 font-button text-[10px] font-bold tracking-widest bg-brand-accent text-black px-6 py-3 rounded-sm cursor-pointer uppercase"
                  >
                    START SHOPPING
                  </button>
                </div>
              ) : (
                cartItems.map((item) => (
                  <div 
                    key={item.id} 
                    className="flex items-center space-x-4 bg-[#111111] p-3 rounded-sm border border-white/5"
                  >
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="h-20 w-16 object-cover rounded-sm"
                      referrerPolicy="no-referrer"
                    />
                    <div className="flex-grow min-w-0">
                      <h4 className="bebas text-xl tracking-wider text-white line-clamp-1">
                        {item.product.name}
                      </h4>
                      <p className="font-sans text-[10px] text-zinc-500 mt-1 uppercase">
                        Size: <span className="text-white font-medium">{item.selectedSize}</span> | Color:{' '}
                        <span 
                          className="inline-block h-2 w-2 rounded-none align-middle ml-1" 
                          style={{ backgroundColor: item.selectedColor }} 
                        />
                      </p>

                      <div className="flex items-center justify-between mt-3">
                        {/* Qty edit */}
                        <div className="flex items-center border border-white/10 rounded-sm overflow-hidden bg-black text-[10px]">
                          <button
                            onClick={() => onUpdateQty(item.id, item.quantity - 1)}
                            className="px-2 py-1 text-zinc-400 hover:text-white"
                          >
                            -
                          </button>
                          <span className="px-3 text-white font-semibold">{item.quantity}</span>
                          <button
                            onClick={() => onUpdateQty(item.id, item.quantity + 1)}
                            className="px-2 py-1 text-zinc-400 hover:text-white"
                          >
                            +
                          </button>
                        </div>
                        
                        <span className="font-sans text-xs font-bold text-white ml-2">
                          ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="text-zinc-600 hover:text-red-500 transition-colors p-2"
                      title="Delete Item"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Footer Summary & Promos */}
            {cartItems.length > 0 && (
              <div className="border-t border-white/10 pt-5 mt-auto">
                
                {/* Coupon application form */}
                <div className="pb-4">
                  {appliedCoupon ? (
                    <div className="flex items-center justify-between bg-white/5 rounded-sm p-3 border border-brand-accent/20">
                      <div className="flex items-center space-x-2">
                        <Tag className="h-4 w-4 text-brand-accent" />
                        <div>
                          <p className="font-sans text-[10px] font-bold text-brand-accent uppercase tracking-widest">{appliedCoupon.code} APPLIED</p>
                          <p className="font-sans text-[9px] text-zinc-500">{appliedCoupon.description}</p>
                        </div>
                      </div>
                      <button 
                        onClick={handleRemoveCoupon}
                        className="text-zinc-400 hover:text-white text-[10px] font-bold uppercase cursor-pointer"
                      >
                        REMOVE
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleApplyCoupon} className="flex space-x-2">
                      <input
                        type="text"
                        placeholder="ENTER COUPON (e.g. DEVINE10)"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        className="flex-grow rounded-sm bg-black border border-white/10 px-3.5 py-2 text-xs text-white uppercase focus:outline-none focus:border-brand-accent"
                      />
                      <button
                        type="submit"
                        className="font-button text-[10px] font-bold tracking-widest bg-[#111111] border border-white/10 text-white px-4 rounded-sm cursor-pointer uppercase hover:bg-brand-accent hover:text-black hover:border-brand-accent transition-all"
                      >
                        APPLY
                      </button>
                    </form>
                  )}
                  {couponError && (
                    <p className="text-[10px] text-red-500 font-sans tracking-wide mt-2 uppercase">{couponError}</p>
                  )}
                </div>

                {/* Subtotal summary */}
                <div className="space-y-2 border-t border-white/10 pt-4 text-xs font-sans">
                  <div className="flex justify-between text-zinc-500">
                    <span>BAG SUBTOTAL</span>
                    <span>₹{subtotal.toLocaleString('en-IN')}</span>
                  </div>
                  {appliedCoupon && (
                    <div className="flex justify-between text-brand-accent font-medium">
                      <span>COUPON DISCOUNT ({appliedCoupon.code})</span>
                      <span>-₹{discountAmount.toLocaleString('en-IN')}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-zinc-500">
                    <span>ESTIMATED DELIVERY CHARGE</span>
                    <span>{shippingCost === 0 ? 'COMPLIMENTARY' : `₹${shippingCost}`}</span>
                  </div>
                  <div className="flex justify-between text-white font-bold text-sm pt-2 border-t border-white/10">
                    <span>TOTAL ESTIMATED</span>
                    <span>₹{grandTotal.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                {/* Checkout CTA */}
                <button
                  id="checkout-trigger-btn"
                  onClick={() => onCheckout(appliedCoupon)}
                  className="w-full mt-6 font-button text-xs font-bold tracking-widest bg-brand-accent hover:bg-white text-black hover:text-black py-4 rounded-sm transition-all duration-300 flex items-center justify-center space-x-3 cursor-pointer uppercase shadow-lg shadow-brand-accent/10"
                >
                  <span>PROCEED TO CHECKOUT</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            )}

          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
