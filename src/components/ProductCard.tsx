import React from 'react';
import { Product } from '../types';
import { Heart, Star, Eye, ShoppingCart } from 'lucide-react';
import { motion } from 'motion/react';

interface ProductCardProps {
  key?: string | number;
  product: Product;
  onViewProduct: (product: Product) => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
  onAddToCartDirect: (product: Product) => void;
}

export default function ProductCard({
  product,
  onViewProduct,
  isWishlisted,
  onToggleWishlist,
  onAddToCartDirect
}: ProductCardProps) {
  const currentPrice = product.price;
  const originalPrice = product.originalPrice;
  const discountPercent = originalPrice 
    ? Math.round(((originalPrice - currentPrice) / originalPrice) * 100)
    : product.discount;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-20px' }}
      transition={{ duration: 0.4 }}
      className="group relative flex flex-col rounded-sm border border-white/5 bg-[#111111] p-3 hover:border-brand-accent/40 hover:shadow-2xl transition-all duration-300"
    >
      {/* Image Containers */}
      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-sm bg-black">
        
        {/* Badges Overlay */}
        <div className="absolute left-3 top-3 z-10 flex flex-col space-y-1.5">
          {product.isLimited && (
            <span className="rounded-sm bg-brand-accent px-2.5 py-1 text-[8px] font-bold tracking-widest text-black uppercase">
              LIMITED EDITION
            </span>
          )}
          {discountPercent && (
            <span className="rounded-sm bg-red-600 px-2.5 py-1 text-[8px] font-bold tracking-widest text-white uppercase">
              {discountPercent}% OFF
            </span>
          )}
          {product.isBestSeller && !product.isLimited && (
            <span className="rounded-sm bg-zinc-800 border border-zinc-700 px-2.5 py-1 text-[8px] font-bold tracking-widest text-white uppercase">
              BESTSELLER
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          id={`wishlist-toggle-${product.id}`}
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product);
          }}
          className={`absolute right-3 top-3 z-10 rounded-sm p-2.5 backdrop-blur-md transition-all duration-300 cursor-pointer ${
            isWishlisted 
              ? 'bg-brand-accent text-black scale-105' 
              : 'bg-black/60 text-zinc-400 hover:text-white hover:bg-black/95'
          }`}
          title={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
        >
          <Heart className={`h-4 w-4 ${isWishlisted ? 'fill-black' : ''}`} />
        </button>

        {/* Product Image */}
        <img
          src={product.images[0]}
          alt={product.name}
          className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0"
          referrerPolicy="no-referrer"
        />

        {/* Dark Luxury Overlay on Hover */}
        <div className="absolute inset-0 bg-black/45 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-3">
          <button
            id={`quick-view-btn-${product.id}`}
            onClick={() => onViewProduct(product)}
            className="flex h-11 w-11 items-center justify-center rounded-sm bg-white text-black hover:bg-brand-accent hover:scale-105 transition-all duration-300 cursor-pointer shadow-lg"
            title="Quick View Details"
          >
            <Eye className="h-5 w-5" />
          </button>
          
          <button
            id={`direct-add-cart-${product.id}`}
            onClick={(e) => {
              e.stopPropagation();
              onAddToCartDirect(product);
            }}
            className="flex h-11 w-11 items-center justify-center rounded-sm bg-brand-accent text-black hover:bg-white hover:scale-105 transition-all duration-300 cursor-pointer shadow-lg"
            title="Instant Add to Cart"
          >
            <ShoppingCart className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Info Area */}
      <div className="mt-4 flex flex-col flex-grow">
        <div className="flex items-center justify-between">
          <span className="font-sans text-[9px] font-semibold tracking-widest text-zinc-500 uppercase">
            {product.category}
          </span>
          <div className="flex items-center space-x-1 text-brand-accent">
            <Star className="h-3 w-3 fill-brand-accent" />
            <span className="font-sans text-[10px] font-semibold text-zinc-300">
              {product.rating}
            </span>
          </div>
        </div>

        <h3 
          className="bebas text-2xl tracking-wider text-white mt-1.5 line-clamp-1 group-hover:text-brand-accent transition-colors cursor-pointer"
          onClick={() => onViewProduct(product)}
        >
          {product.name}
        </h3>

        <p className="font-sans text-[11px] text-zinc-400 mt-1 line-clamp-1">
          {product.description}
        </p>

        {/* Color swatches */}
        <div className="flex items-center space-x-1.5 mt-3">
          {product.colors.map((color) => (
            <div
              key={color}
              className="h-2.5 w-2.5 rounded-none border border-zinc-800"
              style={{ backgroundColor: color }}
            />
          ))}
          <span className="text-[9px] text-zinc-500 font-sans tracking-wider font-light">
            {product.colors.length} {product.colors.length > 1 ? 'ways' : 'way'}
          </span>
        </div>

        {/* Pricing Layout */}
        <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between">
          <div className="flex items-baseline space-x-2">
            <span className="font-sans text-sm font-bold text-white">
              ₹{currentPrice.toLocaleString('en-IN')}
            </span>
            {originalPrice && (
              <span className="font-sans text-[10px] text-zinc-500 line-through">
                ₹{originalPrice.toLocaleString('en-IN')}
              </span>
            )}
          </div>
          
          <button
            onClick={() => onViewProduct(product)}
            className="font-button text-[10px] font-bold tracking-[0.15em] text-zinc-300 hover:text-brand-accent transition-colors uppercase"
          >
            VIEW DETAILS
          </button>
        </div>
      </div>
    </motion.div>
  );
}
