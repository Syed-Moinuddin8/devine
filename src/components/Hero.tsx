import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles, Trophy, Flame } from 'lucide-react';

interface HeroProps {
  onShopClick: () => void;
  onExploreClick: () => void;
}

export default function Hero({ onShopClick, onExploreClick }: HeroProps) {
  // Use public folder path for Vercel deployment
  const heroImage = '/hero_streetwear_devine_1783314954500.jpg';

  const stats = [
    { label: 'GLOBAL STORES', value: '18+', icon: Trophy },
    { label: 'HAPPY CO-ENTHUSIASTS', value: '140K+', icon: Flame },
    { label: 'STYLING DROPS', value: '4.9/5', icon: Sparkles }
  ];

  return (
    <div className="relative min-h-[92vh] w-full overflow-hidden bg-black flex flex-col justify-between">
      {/* Cinematic Background Image & Luxury Parallax Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="DEVINE Luxury Streetwear Campaign"
          className="h-full w-full object-cover object-center scale-105 animate-[pulse_6s_infinite_alternate] opacity-65"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/80" />
      </div>

      {/* Floating Design Credential (Margin Accent) - Pure Editorial Vibe */}
      <div className="absolute top-12 right-12 hidden lg:block z-10 text-right">
        <span className="font-heading text-lg tracking-[0.3em] text-brand-accent">
          CAMPAIGN VOL. VII / ISSUE I
        </span>
        <p className="font-sans text-[10px] tracking-widest text-zinc-400 mt-1 uppercase">
          DEVINE GLOBAL STREETWEAR SYNDICATE
        </p>
      </div>

      {/* Main Slogan Area */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex-grow flex items-center pt-24 pb-12 w-full">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-6 inline-flex items-center gap-3 text-brand-accent font-bold text-xs uppercase tracking-[0.3em]"
          >
            <span className="w-8 h-[1px] bg-brand-accent"></span>
            <span>Established 2024 • CAMPAIGN VOL. VII</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="headline text-5xl sm:text-7xl lg:text-[100px] font-black leading-[0.85] text-white tracking-tighter"
          >
            WE DON'T<br />
            FOLLOW<br />
            <span className="text-brand-accent">TRENDS.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="font-sans text-sm sm:text-lg text-zinc-400 mt-8 tracking-wide leading-relaxed max-w-lg font-light"
          >
            Premium Luxury Streetwear for the modern enthusiast. Crafted with precision from luxury 480GSM loopback cotton, designed for the bold.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-10 flex flex-col sm:flex-row gap-4"
          >
            <button
              id="hero-shop-btn"
              onClick={onShopClick}
              className="accent-bg text-black px-10 py-5 rounded-sm font-bold uppercase text-xs tracking-widest hover:brightness-110 transition-all flex items-center justify-center space-x-3 group cursor-pointer"
            >
              <span>SHOP COLLECTION</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1.5 transition-transform duration-300" />
            </button>

            <button
              id="hero-explore-btn"
              onClick={onExploreClick}
              className="border border-white/20 px-10 py-5 rounded-sm font-bold uppercase text-xs tracking-widest glass hover:bg-white/10 transition-all flex items-center justify-center space-x-2 cursor-pointer"
            >
              <span>EXPLORE LOOKBOOK</span>
            </button>
          </motion.div>
        </div>
      </div>

      {/* Footer Stats Banner (Micro Interactions) */}
      <div className="relative z-10 w-full border-t border-white/10 glass py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-4 divide-y sm:divide-y-0 sm:divide-x divide-white/10">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1 + i * 0.1 }}
                className="flex items-center justify-center space-x-4 py-3 sm:py-0"
              >
                <div className="rounded-sm bg-white/5 p-3 border border-white/10 glass">
                  <Icon className="h-5 w-5 text-brand-accent" />
                </div>
                <div>
                  <h4 className="bebas text-2xl tracking-widest text-white leading-none">
                    {stat.value}
                  </h4>
                  <p className="font-sans text-[9px] font-medium tracking-[0.2em] text-zinc-500 uppercase mt-1">
                    {stat.label}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
