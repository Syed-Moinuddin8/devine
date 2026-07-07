import React, { useState, useEffect } from 'react';
import { UserProfile, Order } from '../types';
import { User, Gift, Award, Share2, Clipboard, MapPin, Sparkles, Check, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

interface UserAccountProps {
  ordersList: Order[];
  onCancelOrder: (orderId: string) => void;
  wishlistProducts: any[];
  onRemoveFromWishlist: (product: any) => void;
  onViewProduct: (product: any) => void;
}

export default function UserAccount({
  ordersList,
  onCancelOrder,
  wishlistProducts,
  onRemoveFromWishlist,
  onViewProduct
}: UserAccountProps) {
  const [profile, setProfile] = useState<UserProfile>({
    id: 'user_devine',
    name: 'Alexander Mercer',
    email: 'alexander@gmail.com',
    phone: '+91 99881 22430',
    loyaltyPoints: 450,
    referralCode: 'DEVINE_ALEX_45'
  });

  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState('orders'); // 'orders', 'wishlist', 'rewards', 'profile'

  const handleCopyReferral = () => {
    navigator.clipboard.writeText(profile.referralCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-black py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Profile Card Header */}
        <div className="bg-[#111111] rounded-sm border border-white/5 p-6 sm:p-8 flex flex-col md:flex-row items-center md:justify-between gap-6 mb-12">
          <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6 text-center sm:text-left">
            <div className="h-16 w-16 rounded-sm bg-brand-accent/10 border border-brand-accent/30 flex items-center justify-center">
              <User className="h-8 w-8 text-brand-accent" />
            </div>
            <div>
              <div className="flex items-center space-x-2.5 justify-center sm:justify-start">
                <h2 className="bebas text-3xl font-black tracking-wider text-white uppercase">{profile.name}</h2>
                <span className="rounded-sm bg-brand-accent/10 border border-brand-accent/25 px-3 py-0.5 text-[8px] font-bold text-brand-accent uppercase tracking-widest">STYLING VIP</span>
              </div>
              <p className="font-sans text-xs text-zinc-500 mt-1">{profile.email} • {profile.phone}</p>
            </div>
          </div>

          <div className="flex space-x-6">
            <div className="text-center bg-white/5 rounded-sm px-5 py-3 border border-white/5">
              <span className="font-sans text-[9px] text-zinc-500 uppercase tracking-wider block">Loyalty Points</span>
              <span className="bebas text-2xl text-brand-accent tracking-widest mt-1 block">{profile.loyaltyPoints} PTS</span>
            </div>
            <div className="text-center bg-white/5 rounded-sm px-5 py-3 border border-white/5">
              <span className="font-sans text-[9px] text-zinc-500 uppercase tracking-wider block">Completed Drops</span>
              <span className="bebas text-2xl text-white tracking-widest mt-1 block">{ordersList.length}</span>
            </div>
          </div>
        </div>

        {/* Layout Split */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Tabs Menu */}
          <div className="flex flex-col space-y-2 border-r border-white/5 pr-0 lg:pr-4">
            {[
              { id: 'orders', label: 'MY DROPS & TRACKING' },
              { id: 'wishlist', label: 'WISHLIST SEEDINGS' },
              { id: 'rewards', label: 'LOYALTY REWARDS' },
              { id: 'profile', label: 'ADDRESS DETAILS' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`text-left font-button text-[11px] font-bold tracking-widest py-3 px-4 rounded-sm border transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-brand-accent text-black border-brand-accent font-bold scale-102'
                    : 'bg-[#111111] text-zinc-400 border-white/5 hover:border-white/20 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Active Tab contents */}
          <div className="lg:col-span-3">
            
            {/* Tab: Orders */}
            {activeTab === 'orders' && (
              <div className="space-y-6">
                <h3 className="bebas text-2xl tracking-wider text-white uppercase border-b border-white/5 pb-3">
                  STREETWEAR drops history
                </h3>

                {ordersList.length === 0 ? (
                  <div className="text-center py-12 text-zinc-500 text-xs font-sans">
                    <p className="uppercase tracking-widest">No order history found</p>
                    <p className="font-light text-zinc-600 mt-2">Get started by browsing the catalog segments!</p>
                  </div>
                ) : (
                  ordersList.map((ord) => (
                    <div key={ord.id} className="bg-[#111111] rounded-sm border border-white/5 p-5 space-y-4">
                      {/* Order main meta */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/5 pb-3 gap-3">
                        <div className="text-xs font-sans">
                          <p className="text-zinc-500 uppercase text-[10px]">DROP SERIAL CODE:</p>
                          <p className="text-white font-bold mt-0.5">{ord.id}</p>
                        </div>
                        <div className="text-xs font-sans">
                          <p className="text-zinc-500 uppercase text-[10px]">ESTIMATED COURIER STATUS:</p>
                          <p className="text-brand-accent font-bold mt-0.5 flex items-center">
                            <span className="h-2 w-2 rounded-sm bg-brand-accent mr-1.5 animate-pulse" />
                            {ord.status.toUpperCase()}
                          </p>
                        </div>
                        <div className="text-xs font-sans">
                          <p className="text-zinc-500 uppercase text-[10px]">TOTAL DEBITS:</p>
                          <p className="text-white font-bold mt-0.5">₹{ord.total.toLocaleString('en-IN')}</p>
                        </div>
                      </div>

                      {/* Items loop */}
                      <div className="space-y-3">
                        {ord.items.map((item, idx) => (
                          <div key={idx} className="flex items-center space-x-3 text-xs font-sans">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="h-12 w-10 object-cover rounded-sm"
                            />
                            <div className="flex-grow min-w-0">
                              <p className="text-white font-semibold uppercase">{item.name}</p>
                              <p className="text-[10px] text-zinc-500 mt-0.5 uppercase">
                                Size: {item.size} | Color: {item.color} | Qty {item.quantity}
                              </p>
                            </div>
                            <span className="text-zinc-400">₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                          </div>
                        ))}
                      </div>

                      {/* Shipping metadata / Actions */}
                      <div className="pt-3 border-t border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="text-[10px] font-sans text-zinc-400">
                          <p className="uppercase tracking-wider">TRACKING CONSOLE:</p>
                          <p className="text-white font-bold mt-1 uppercase">{ord.trackingNumber} via SHIPROCKET EXPRESS</p>
                        </div>
                        
                        {ord.status.toLowerCase() === 'pending' && (
                          <button
                            onClick={() => onCancelOrder(ord.id)}
                            className="font-button text-[10px] font-bold tracking-widest text-red-500 hover:text-red-400 hover:underline uppercase cursor-pointer text-left"
                          >
                            CANCEL THIS DROP
                          </button>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* Tab: Wishlist */}
            {activeTab === 'wishlist' && (
              <div className="space-y-6">
                <h3 className="bebas text-2xl tracking-wider text-white uppercase border-b border-white/5 pb-3">
                  WISHLIST SEEDINGS
                </h3>

                {wishlistProducts.length === 0 ? (
                  <div className="text-center py-12 text-zinc-500 text-xs font-sans">
                    <p className="uppercase tracking-widest">Wishlist is clear</p>
                    <p className="font-light text-zinc-600 mt-2">Tap hearts on the shop cards to seed elements here.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {wishlistProducts.map((p) => (
                      <div
                        key={p.id}
                        className="flex items-center space-x-4 bg-[#111111] p-4 rounded-sm border border-white/5"
                      >
                        <img
                          src={p.images[0]}
                          alt={p.name}
                          className="h-16 w-12 object-cover rounded-sm"
                        />
                        <div className="flex-grow min-w-0 text-xs font-sans">
                          <h4 className="bebas text-xl text-white tracking-widest line-clamp-1 uppercase">{p.name}</h4>
                          <p className="text-zinc-500 mt-0.5 truncate uppercase">{p.category}</p>
                          <p className="text-brand-accent font-bold mt-1">₹{p.price.toLocaleString('en-IN')}</p>
                        </div>
                        <div className="flex flex-col space-y-2">
                          <button
                            onClick={() => onViewProduct(p)}
                            className="font-button text-[9px] font-bold tracking-widest bg-white text-black py-1.5 px-3 rounded-sm uppercase cursor-pointer"
                          >
                            VIEW
                          </button>
                          <button
                            onClick={() => onRemoveFromWishlist(p)}
                            className="text-zinc-500 hover:text-red-500 text-[9px] uppercase hover:underline"
                          >
                            REMOVE
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Tab: Rewards */}
            {activeTab === 'rewards' && (
              <div className="space-y-6">
                <h3 className="bebas text-2xl tracking-wider text-white uppercase border-b border-white/5 pb-3">
                  DEVINE BLY LOYALTY MILESTONES
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Share Code */}
                  <div className="bg-[#111111] rounded-sm border border-white/5 p-5 space-y-4">
                    <div className="flex items-center space-x-3 text-brand-accent">
                      <Gift className="h-5 w-5" />
                      <h4 className="bebas text-lg tracking-wider uppercase">STYLING REFERRAL BONUSES</h4>
                    </div>
                    <p className="font-sans text-xs text-zinc-400 leading-normal font-light">
                      Gift a friend 15% discount on their first drop, and earn ₹300 cashback credit instantly upon fulfillment.
                    </p>
                    <div className="flex items-center justify-between border border-white/10 bg-black rounded-sm p-3">
                      <span className="font-sans text-xs font-bold text-white uppercase">{profile.referralCode}</span>
                      <button
                        onClick={handleCopyReferral}
                        className="text-brand-accent hover:text-white transition-colors cursor-pointer"
                        title="Copy code"
                      >
                        {copied ? <Check className="h-4 w-4" /> : <Clipboard className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Loyalty Levels */}
                  <div className="bg-[#111111] rounded-sm border border-white/5 p-5 space-y-4">
                    <div className="flex items-center space-x-3 text-brand-accent">
                      <Award className="h-5 w-5" />
                      <h4 className="bebas text-lg tracking-wider uppercase">VIP REWARDS ARCHIVE</h4>
                    </div>
                    <p className="font-sans text-xs text-zinc-400 leading-normal font-light">
                      Earn 5 loyalty points on every ₹100 spend. Redemptions unlock custom limited stickers, flannels, and private drops.
                    </p>
                    
                    <div className="space-y-2 text-xs font-sans">
                      <div className="flex justify-between border-b border-white/5 pb-2 text-zinc-500">
                        <span>CURRENT STATUS:</span>
                        <span className="text-white font-bold">BRONZE APPAREL (0-500 pts)</span>
                      </div>
                      <div className="flex justify-between text-zinc-500">
                        <span>NEXT LEVEL:</span>
                        <span className="text-brand-accent font-bold">SILVER CO-ENTHUSIAST (500 pts)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Tab: Profile */}
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <h3 className="bebas text-2xl tracking-wider text-white uppercase border-b border-white/5 pb-3">
                  saved coordinates & profiles
                </h3>

                <div className="bg-[#111111] rounded-sm border border-white/5 p-5 space-y-4 font-sans text-xs">
                  <div className="flex items-center justify-between border-b border-white/5 pb-3">
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-brand-accent" />
                      <span className="font-semibold text-white uppercase">PRIMARY RESIDENCE COORDINATES</span>
                    </div>
                    <span className="rounded-sm bg-white/5 border border-white/10 text-[8px] font-bold text-zinc-400 px-2.5 py-0.5 uppercase tracking-widest">DEFAULT</span>
                  </div>

                  <p className="font-bold text-white uppercase">{profile.name}</p>
                  <p className="text-zinc-400 leading-relaxed font-light mt-1">
                    C-45, Phase III, DLF Cyber City,<br />
                    Sector 24, New Delhi - 110001
                  </p>
                  <p className="text-zinc-500 mt-2">Mobile: {profile.phone}</p>
                </div>
              </div>
            )}

          </div>
        </div>

      </div>
    </div>
  );
}
