import React from 'react';
import { categories } from '../data/products';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';

interface CategoriesProps {
  onCategoryClick: (categoryName: string) => void;
}

export default function Categories({ onCategoryClick }: CategoriesProps) {
  return (
    <section id="categories-section" className="py-24 bg-black border-b border-brand-dark-grey/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between">
          <div>
            <span className="font-sans text-[10px] font-bold tracking-[0.3em] text-brand-accent uppercase">
              DEVINE ARCHIVES
            </span>
            <h2 className="font-heading text-4xl sm:text-5xl font-bold tracking-widest text-white uppercase mt-2">
              FEATURED CATEGORIES
            </h2>
          </div>
          <p className="font-sans text-xs text-zinc-500 max-w-sm mt-4 md:mt-0 tracking-wide">
            Designed in Los Angeles, engineered for heavy streetwear enthusiasts globally. Explore our curated segments.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, idx) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              onClick={() => onCategoryClick(category.name)}
              className="group relative h-80 rounded-sm overflow-hidden bg-[#111111] border border-white/5 cursor-pointer shadow-2xl"
            >
              <img
                src={category.image}
                alt={category.name}
                className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out grayscale group-hover:grayscale-0"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 card-gradient z-10" />

              {/* Text Card content */}
              <div className="absolute bottom-6 left-6 right-6 z-20 flex flex-col justify-end">
                <span className="font-sans text-[10px] font-bold tracking-[0.25em] text-brand-accent uppercase mb-1">
                  COLLECTION
                </span>
                <div className="flex items-center justify-between mt-1">
                  <h3 className="bebas text-3xl tracking-[0.1em] text-white group-hover:text-brand-accent transition-colors">
                    {category.name}
                  </h3>
                  <div className="rounded-sm bg-brand-accent p-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <ArrowUpRight className="h-4 w-4 text-black" />
                  </div>
                </div>
                <p className="font-sans text-[10.5px] text-zinc-400 mt-2 line-clamp-1 group-hover:text-zinc-300 transition-colors tracking-wider font-light">
                  {category.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
