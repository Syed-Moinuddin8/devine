import React, { useState } from 'react';
import { CartItem, Coupon } from '../types';
import { ShieldCheck, CreditCard, Landmark, CheckCircle, Truck, FileText, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

interface CheckoutProps {
  cartItems: CartItem[];
  appliedCoupon: Coupon | null;
  onOrderSuccess: (order: any) => void;
  onCancel: () => void;
}

export default function Checkout({
  cartItems,
  appliedCoupon,
  onOrderSuccess,
  onCancel
}: CheckoutProps) {
  const [step, setStep] = useState(1); // 1: Shipping, 2: Payment, 3: Success

  // Form states
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [stateName, setStateName] = useState('Delhi');
  const [zipCode, setZipCode] = useState('');
  const [gstInvoice, setGstInvoice] = useState(false);
  const [gstNumber, setGstNumber] = useState('');

  // Payment states
  const [paymentMethod, setPaymentMethod] = useState('UPI'); // 'UPI', 'Credit Card', 'Net Banking', 'Cash On Delivery'
  const [upiId, setUpiId] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [selectedBank, setSelectedBank] = useState('HDFC Bank');

  // Order Details
  const subtotal = cartItems.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  const shippingCost = subtotal >= 2500 ? 0 : 150;
  
  let discountAmount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.type === 'percent') {
      discountAmount = Math.round((subtotal * appliedCoupon.discount) / 100);
    } else if (appliedCoupon.type === 'fixed') {
      discountAmount = appliedCoupon.discount;
    }
  }
  const grandTotal = Math.max(0, subtotal - discountAmount + shippingCost);

  // Loading/Submit states
  const [processingOrder, setProcessingOrder] = useState(false);
  const [createdOrder, setCreatedOrder] = useState<any>(null);

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const handlePlaceOrder = async () => {
    setProcessingOrder(true);
    
    const itemsPayload = cartItems.map(item => ({
      productId: item.product.id,
      name: item.product.name,
      price: item.product.price,
      quantity: item.quantity,
      color: item.selectedColor,
      size: item.selectedSize,
      image: item.product.images[0]
    }));

    const shippingAddress = {
      fullName,
      email,
      phone,
      address,
      city,
      state: stateName,
      zipCode,
      gstNumber: gstInvoice ? gstNumber : undefined
    };

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: itemsPayload,
          total: grandTotal,
          shippingAddress,
          paymentMethod
        })
      });

      const data = await response.json();
      if (data.success) {
        setCreatedOrder(data.order);
        setStep(3);
        onOrderSuccess(data.order);
      }
    } catch (e) {
      console.error('Error placing order:', e);
    } finally {
      setProcessingOrder(false);
    }
  };

  // Generate a printable PDF-like receipt
  const handlePrintInvoice = () => {
    window.print();
  };

  return (
    <div className="bg-black py-16 min-h-[90vh]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="mb-12 text-center">
          <span className="font-sans text-[10px] font-bold tracking-[0.3em] text-brand-accent uppercase">
            SECURE ARCHIVE CHECKOUT
          </span>
          <h2 className="font-heading text-4xl sm:text-5xl font-bold tracking-widest text-white uppercase mt-2">
            {step === 3 ? 'ORDER SUCCESSFUL' : 'CHECKOUT OUTLINE'}
          </h2>
        </div>

        {step !== 3 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Interactive Forms - left side */}
            <div className="lg:col-span-2">
              
              {/* Stepper Header */}
              <div className="flex items-center space-x-6 mb-8 text-xs font-sans tracking-wider font-semibold border-b border-zinc-900 pb-4">
                <span className={`pb-4 border-b-2 ${step === 1 ? 'border-brand-accent text-brand-accent' : 'border-transparent text-zinc-500'}`}>
                  01. SHIPPING ADDRESS
                </span>
                <span className={`pb-4 border-b-2 ${step === 2 ? 'border-brand-accent text-brand-accent' : 'border-transparent text-zinc-500'}`}>
                  02. PAYMENT PORTAL
                </span>
              </div>

              {/* Step 1 Form */}
              {step === 1 && (
                <form onSubmit={handleShippingSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-sans text-zinc-500 uppercase tracking-widest mb-1.5">Full Name</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Alexander Mercer"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full rounded-lg bg-zinc-950 border border-zinc-900 px-4 py-3 text-xs text-white focus:outline-none focus:border-brand-accent"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-sans text-zinc-500 uppercase tracking-widest mb-1.5">Email Address</label>
                      <input
                        type="email"
                        required
                        placeholder="alexander@gmail.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full rounded-lg bg-zinc-950 border border-zinc-900 px-4 py-3 text-xs text-white focus:outline-none focus:border-brand-accent"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-sans text-zinc-500 uppercase tracking-widest mb-1.5">Contact Phone</label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 99881 22430"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full rounded-lg bg-zinc-950 border border-zinc-900 px-4 py-3 text-xs text-white focus:outline-none focus:border-brand-accent"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-sans text-zinc-500 uppercase tracking-widest mb-1.5">ZIP / Pincode</label>
                      <input
                        type="text"
                        required
                        maxLength={6}
                        placeholder="110001"
                        value={zipCode}
                        onChange={(e) => setZipCode(e.target.value.replace(/\D/g, ''))}
                        className="w-full rounded-lg bg-zinc-950 border border-zinc-900 px-4 py-3 text-xs text-white focus:outline-none focus:border-brand-accent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-sans text-zinc-500 uppercase tracking-widest mb-1.5">Street Address</label>
                    <input
                      type="text"
                      required
                      placeholder="Apartment, suite, unit, building, street names"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full rounded-lg bg-zinc-950 border border-zinc-900 px-4 py-3 text-xs text-white focus:outline-none focus:border-brand-accent"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-sans text-zinc-500 uppercase tracking-widest mb-1.5">City</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. New Delhi"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full rounded-lg bg-zinc-950 border border-zinc-900 px-4 py-3 text-xs text-white focus:outline-none focus:border-brand-accent"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-sans text-zinc-500 uppercase tracking-widest mb-1.5">State</label>
                      <select
                        value={stateName}
                        onChange={(e) => setStateName(e.target.value)}
                        className="w-full rounded-lg bg-zinc-950 border border-zinc-900 px-4 py-3 text-xs text-white focus:outline-none focus:border-brand-accent"
                      >
                        <option value="Delhi">Delhi</option>
                        <option value="Maharashtra">Maharashtra</option>
                        <option value="Karnataka">Karnataka</option>
                        <option value="Tamil Nadu">Tamil Nadu</option>
                        <option value="Telangana">Telangana</option>
                        <option value="Gujarat">Gujarat</option>
                        <option value="Uttar Pradesh">Uttar Pradesh</option>
                      </select>
                    </div>
                  </div>

                  {/* GST Invoice Section */}
                  <div className="border border-zinc-900 bg-zinc-950 rounded-xl p-4">
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={gstInvoice}
                        onChange={(e) => setGstInvoice(e.target.checked)}
                        className="rounded border-zinc-800 text-brand-accent focus:ring-brand-accent h-4 w-4 bg-zinc-900"
                      />
                      <span className="font-sans text-[10px] font-bold tracking-widest text-zinc-300 uppercase">
                        REQUEST BUSINESS GST INVOICE
                      </span>
                    </label>
                    {gstInvoice && (
                      <div className="mt-4">
                        <label className="block text-[10px] font-sans text-zinc-500 uppercase tracking-widest mb-1.5">GST Registration Number</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. 07AAAAA1111A1Z1"
                          value={gstNumber}
                          onChange={(e) => setGstNumber(e.target.value.toUpperCase())}
                          className="w-full rounded-lg bg-black border border-zinc-900 px-4 py-3 text-xs text-white focus:outline-none focus:border-brand-accent"
                        />
                      </div>
                    )}
                  </div>

                  {/* Action */}
                  <div className="pt-4 flex justify-between items-center">
                    <button
                      type="button"
                      onClick={onCancel}
                      className="font-button text-[10px] font-bold tracking-widest text-zinc-400 hover:text-white uppercase"
                    >
                      ABANDON CHECKOUT
                    </button>
                    <button
                      type="submit"
                      className="font-button text-xs font-bold tracking-widest bg-brand-accent hover:bg-white text-black py-4 px-8 rounded-xl transition-all cursor-pointer uppercase flex items-center space-x-2"
                    >
                      <span>CONTINUE TO PAYMENT</span>
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </form>
              )}

              {/* Step 2 Form (Payments Panel) */}
              {step === 2 && (
                <div className="space-y-8">
                  
                  {/* Select payment methods */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                      { id: 'UPI', label: 'UPI / GPay', icon: Landmark },
                      { id: 'Credit Card', label: 'CARDS', icon: CreditCard },
                      { id: 'Net Banking', label: 'NETBANKING', icon: Landmark },
                      { id: 'Cash On Delivery', label: 'CASH ON DEL', icon: Truck }
                    ].map((method) => {
                      const Icon = method.icon;
                      return (
                        <button
                          key={method.id}
                          onClick={() => setPaymentMethod(method.id)}
                          className={`flex flex-col items-center justify-center p-4 rounded-xl border text-center transition-all cursor-pointer ${
                            paymentMethod === method.id
                              ? 'border-brand-accent bg-brand-accent/5 text-brand-accent scale-102 font-bold'
                              : 'border-zinc-900 bg-zinc-950 text-zinc-400 hover:border-zinc-700 hover:text-white'
                          }`}
                        >
                          <Icon className="h-5 w-5 mb-2" />
                          <span className="font-sans text-[10px] font-bold tracking-widest uppercase">{method.label}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Payment Details Container */}
                  <div className="bg-zinc-950 rounded-2xl border border-zinc-900 p-6">
                    {paymentMethod === 'UPI' && (
                      <div className="space-y-4">
                        <h4 className="font-heading text-lg tracking-widest text-white uppercase">GPay / PhonePe / UPI PORTAL</h4>
                        <p className="font-sans text-xs text-zinc-500 leading-relaxed">
                          Secure instant routing via unified interface. Instant 5% cashback loyalty reward added.
                        </p>
                        <div>
                          <label className="block text-[10px] font-sans text-zinc-500 uppercase tracking-widest mb-1.5">UPI Virtual Address (VPA)</label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. user@okaxis"
                            value={upiId}
                            onChange={(e) => setUpiId(e.target.value)}
                            className="w-full rounded-lg bg-black border border-zinc-900 px-4 py-3 text-xs text-white focus:outline-none focus:border-brand-accent"
                          />
                        </div>
                      </div>
                    )}

                    {paymentMethod === 'Credit Card' && (
                      <div className="space-y-4">
                        <h4 className="font-heading text-lg tracking-widest text-white uppercase">CREDIT / DEBIT TRANSACTION</h4>
                        <div>
                          <label className="block text-[10px] font-sans text-zinc-500 uppercase tracking-widest mb-1.5">Card Number</label>
                          <input
                            type="text"
                            maxLength={19}
                            placeholder="4111 2222 3333 4444"
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim())}
                            className="w-full rounded-lg bg-black border border-zinc-900 px-4 py-3 text-xs text-white focus:outline-none focus:border-brand-accent"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[10px] font-sans text-zinc-500 uppercase tracking-widest mb-1.5">Expiry Date</label>
                            <input
                              type="text"
                              maxLength={5}
                              placeholder="MM/YY"
                              value={cardExpiry}
                              onChange={(e) => setCardExpiry(e.target.value.replace(/\D/g, '').replace(/(.{2})/, '$1/'))}
                              className="w-full rounded-lg bg-black border border-zinc-900 px-4 py-3 text-xs text-white focus:outline-none focus:border-brand-accent"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-sans text-zinc-500 uppercase tracking-widest mb-1.5">CVV Security</label>
                            <input
                              type="password"
                              maxLength={3}
                              placeholder="***"
                              value={cardCvv}
                              onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, ''))}
                              className="w-full rounded-lg bg-black border border-zinc-900 px-4 py-3 text-xs text-white focus:outline-none focus:border-brand-accent"
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {paymentMethod === 'Net Banking' && (
                      <div className="space-y-4">
                        <h4 className="font-heading text-lg tracking-widest text-white uppercase">INSTITUTION BANK TRANSFER</h4>
                        <div>
                          <label className="block text-[10px] font-sans text-zinc-500 uppercase tracking-widest mb-1.5">Select Bank Institution</label>
                          <select
                            value={selectedBank}
                            onChange={(e) => setSelectedBank(e.target.value)}
                            className="w-full rounded-lg bg-black border border-zinc-900 px-4 py-3 text-xs text-white focus:outline-none focus:border-brand-accent"
                          >
                            <option value="HDFC Bank">HDFC Bank</option>
                            <option value="ICICI Bank">ICICI Bank</option>
                            <option value="State Bank of India">State Bank of India</option>
                            <option value="Axis Bank">Axis Bank</option>
                            <option value="KOTAK Bank">Kotak Mahindra Bank</option>
                          </select>
                        </div>
                      </div>
                    )}

                    {paymentMethod === 'Cash On Delivery' && (
                      <div className="space-y-4">
                        <h4 className="font-heading text-lg tracking-widest text-white uppercase">CASH ON ARRIVAL</h4>
                        <p className="font-sans text-xs text-zinc-400 leading-relaxed font-light">
                          Pay securely in cash or via mobile UPI upon delivery. An additional COD convenience charge of ₹50 may apply at sorting.
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="pt-4 flex justify-between items-center">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="font-button text-[10px] font-bold tracking-widest text-zinc-400 hover:text-white uppercase cursor-pointer"
                    >
                      GO BACK TO ADDRESS
                    </button>
                    
                    <button
                      onClick={handlePlaceOrder}
                      disabled={processingOrder}
                      className="font-button text-xs font-bold tracking-widest bg-brand-accent hover:bg-white text-black py-4 px-10 rounded-xl transition-all cursor-pointer uppercase flex items-center space-x-2"
                    >
                      <span>{processingOrder ? 'PROCESSING ORDER...' : 'PLACE SECURE ORDER'}</span>
                    </button>
                  </div>

                </div>
              )}

            </div>

            {/* Order Summary Sidebar - Right Side */}
            <div className="bg-zinc-950 rounded-2xl border border-zinc-900 p-6 h-fit space-y-6">
              <h3 className="font-heading text-xl sm:text-2xl tracking-widest text-white uppercase border-b border-zinc-900 pb-4">
                BAG CONTENTS
              </h3>

              {/* Items summary lists */}
              <div className="space-y-4 max-h-72 overflow-y-auto pr-1">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center space-x-3 text-xs font-sans">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="h-12 w-10 object-cover rounded"
                    />
                    <div className="flex-grow min-w-0">
                      <p className="text-white font-semibold truncate uppercase">{item.product.name}</p>
                      <p className="text-[10px] text-zinc-500 mt-0.5 uppercase">
                        {item.selectedSize} | Qty {item.quantity}
                      </p>
                    </div>
                    <span className="text-white font-bold">₹{(item.product.price * item.quantity).toLocaleString('en-IN')}</span>
                  </div>
                ))}
              </div>

              {/* Totals outline */}
              <div className="border-t border-zinc-900 pt-5 space-y-2.5 text-xs font-sans">
                <div className="flex justify-between text-zinc-500">
                  <span>SUBTOTAL</span>
                  <span>₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                {appliedCoupon && (
                  <div className="flex justify-between text-brand-accent font-medium">
                    <span>PROMO CODE ({appliedCoupon.code})</span>
                    <span>-₹{discountAmount.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="flex justify-between text-zinc-500">
                  <span>SHIPPING FREIGHT</span>
                  <span>{shippingCost === 0 ? 'COMPLIMENTARY' : `₹${shippingCost}`}</span>
                </div>
                <div className="flex justify-between text-white font-bold text-sm pt-4 border-t border-zinc-900">
                  <span>ESTIMATED TOTAL</span>
                  <span className="text-brand-accent">₹{grandTotal.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <div className="pt-2 rounded-lg bg-black/60 border border-zinc-900/60 p-4 flex items-center space-x-3">
                <ShieldCheck className="h-5 w-5 text-brand-accent" />
                <span className="font-sans text-[9px] text-zinc-400 leading-normal uppercase">
                  128-Bit SSL Encryption applied. Your transaction credentials remain isolated.
                </span>
              </div>
            </div>

          </div>
        ) : (
          /* Step 3: Success Screen / Printable Receipt */
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="mx-auto max-w-2xl bg-zinc-950 rounded-2xl border border-zinc-900 p-8 text-center shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-brand-accent" />

            <div className="flex justify-center mb-6">
              <CheckCircle className="h-16 w-16 text-brand-accent animate-bounce" />
            </div>

            <span className="font-sans text-[10px] font-bold tracking-[0.2em] text-brand-accent bg-brand-accent/10 px-3.5 py-1 rounded-full uppercase">
              TRANSACTION PERSISTED SECURELY
            </span>

            <h3 className="font-heading text-3xl sm:text-4xl tracking-widest text-white uppercase mt-6">
              THANK YOU FOR YOUR ORDER
            </h3>
            
            <p className="font-sans text-xs text-zinc-400 mt-3 max-w-md mx-auto leading-relaxed font-light">
              Your DEVINE aesthetic package is being customized for transit at our LA center. A confirmation SMS with tracking details has been sent to <span className="text-white font-medium">{createdOrder?.shippingAddress.phone}</span>.
            </p>

            {/* Receipt Summary Grid */}
            <div className="my-8 p-6 bg-black rounded-xl border border-zinc-900 text-left text-xs font-sans space-y-4">
              <div className="flex justify-between border-b border-zinc-900 pb-3 font-semibold text-zinc-400">
                <span>ORDER SERIAL CODE:</span>
                <span className="text-white font-bold">{createdOrder?.id}</span>
              </div>
              <div className="flex justify-between text-zinc-500">
                <span>ESTIMATED SHIP CARRIER:</span>
                <span className="text-white uppercase font-bold flex items-center">
                  <Truck className="h-3.5 w-3.5 mr-1 text-brand-accent" />
                  SHIPROCKET AIR CARGO
                </span>
              </div>
              <div className="flex justify-between text-zinc-500">
                <span>ESTIMATED TRANSIT CODE:</span>
                <span className="text-white uppercase font-bold">{createdOrder?.trackingNumber}</span>
              </div>
              <div className="flex justify-between text-zinc-500">
                <span>DELIVERY RECIPIENT:</span>
                <span className="text-white">{createdOrder?.shippingAddress.fullName}</span>
              </div>
              <div className="flex justify-between text-zinc-500">
                <span>SHIPPING COORDINATE:</span>
                <span className="text-white text-right">{createdOrder?.shippingAddress.address}, {createdOrder?.shippingAddress.city} - {createdOrder?.shippingAddress.zipCode}</span>
              </div>
              {createdOrder?.shippingAddress.gstNumber && (
                <div className="flex justify-between text-zinc-500 border-t border-zinc-950 pt-2">
                  <span>BUSINESS GST RECIP:</span>
                  <span className="text-brand-accent uppercase font-semibold">{createdOrder?.shippingAddress.gstNumber}</span>
                </div>
              )}
              <div className="flex justify-between border-t border-zinc-900 pt-3 font-bold text-sm">
                <span>TOTAL PAID AMOUNT</span>
                <span className="text-brand-accent">₹{createdOrder?.total.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handlePrintInvoice}
                className="font-button text-[10px] font-bold tracking-widest bg-zinc-900 hover:bg-zinc-800 text-white border border-zinc-800 py-3.5 px-6 rounded-lg transition-all cursor-pointer uppercase flex items-center justify-center space-x-2"
              >
                <FileText className="h-4 w-4" />
                <span>GENERATE & PRINT GST INVOICE</span>
              </button>

              <button
                onClick={onCancel}
                className="font-button text-[10px] font-bold tracking-widest bg-brand-accent hover:bg-white text-black py-3.5 px-6 rounded-lg transition-all cursor-pointer uppercase"
              >
                CONTINUE SHOPPING
              </button>
            </div>

          </motion.div>
        )}

      </div>
    </div>
  );
}
