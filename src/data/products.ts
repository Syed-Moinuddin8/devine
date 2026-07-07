import { Product } from '../types';

export const products: Product[] = [
  {
    id: 'devine-001',
    name: 'DEVINE SIGNATURE OVERSIZED HOODIE',
    category: 'Oversized T-Shirts', // Categorized within the general tops segment
    price: 3499,
    originalPrice: 4999,
    images: [
      '/hero_streetwear_devine_1783314954500.jpg', // Our custom flagship generated image!
      'https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=800&auto=format&fit=crop'
    ],
    colors: ['#000000', '#2A2A2A', '#C9A227'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    description: 'The definitive DEVINE oversized hoodie. Tailored from 480GSM heavyweight loopback luxury cotton, featuring a double-lined hood, seamless dropped shoulders, and subtle matte gold embroidery on the chest.',
    details: [
      '480GSM heavyweight organic cotton',
      'Double-lined structured hood (no drawstrings)',
      'Dropped shoulder slouchy streetwear silhouette',
      'Matte gold embroidered "DEVINE BLY" branding on center chest',
      'Pre-shrunk for optimal long-term fit preservation',
      'Made in limited quantities'
    ],
    specs: {
      'Material': '100% Organic Loopback Cotton',
      'Weight': 'Heavyweight (480 GSM)',
      'Origin': 'Designed in Los Angeles, Crafted in Portugal',
      'Care': 'Machine wash cold inside out, dry flat'
    },
    rating: 4.9,
    reviewsCount: 148,
    stock: 24,
    isTrending: true,
    isBestSeller: true,
    inStock: true
  },
  {
    id: 'devine-002',
    name: 'CORE APEX OVERSIZED GRAPHIC TEE',
    category: 'Oversized T-Shirts',
    price: 1899,
    originalPrice: 2499,
    images: [
      'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=800&auto=format&fit=crop'
    ],
    colors: ['#000000', '#FFFFFF', '#2A2A2A'],
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'Cut from premium 280GSM heavy combed cotton, this tee delivers the ultimate relaxed streetwear fit. Features high-density silk-screened "WE DON\'T FOLLOW TRENDS" slogan graphic on the back with custom distress effect.',
    details: [
      '280GSM heavy combed long-staple cotton',
      'High-ribbed tight collar (1.2 inch)',
      'Boxy fit with premium tailored shoulder lines',
      'Plastisol distressed back print for high streetwear aesthetic',
      'Woven brand label detail on the lower seam'
    ],
    specs: {
      'Material': '100% Combed Luxury Cotton',
      'Weight': 'Medium-Heavyweight (280 GSM)',
      'Origin': 'Crafted in Tokyo, Japan',
      'Care': 'Iron inside out, cold gentle wash only'
    },
    rating: 4.8,
    reviewsCount: 94,
    stock: 45,
    isTrending: true,
    inStock: true
  },
  {
    id: 'devine-003',
    name: 'KINETIC MULTI-POCKET UTILITY CARGOS',
    category: 'Cargos',
    price: 3899,
    originalPrice: 5499,
    images: [
      'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=800&auto=format&fit=crop'
    ],
    colors: ['#111111', '#2A2A2A', '#F7F7F7'],
    sizes: ['30', '32', '34', '36'],
    description: 'The ultimate utility cargo pant designed for a sleek, tapered streetwear profile. Fabricated in durable, weather-resistant micro-ripstop nylon blended with premium stretch twill. Features 8 discrete pockets and modular strap controls.',
    details: [
      'Ripstop cotton-nylon weatherproofing blend',
      '8 pockets layout including discrete zipped cargo holds',
      'Adjustable canvas tension straps at knees and ankles',
      'Ergonomic articulation panels at knee joints',
      'Custom luxury branded matte-black button closures'
    ],
    specs: {
      'Material': '70% Ripstop Cotton, 25% Nylon, 5% Elastane',
      'Fit': 'Relatively relaxed with ankle-drawstring tapering',
      'Hardware': 'YKK zippers, custom DEVINE brass buttons',
      'Care': 'Wash cold, air dry'
    },
    rating: 4.7,
    reviewsCount: 112,
    stock: 12,
    isTrending: true,
    isBestSeller: true,
    inStock: true
  },
  {
    id: 'devine-004',
    name: 'STREETCOURT ONE DISTRESSED DENIM',
    category: 'Jeans',
    price: 4299,
    originalPrice: 5999,
    images: [
      'https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=800&auto=format&fit=crop'
    ],
    colors: ['#2A2A2A', '#111111'],
    sizes: ['30', '32', '34', '36'],
    description: 'Constructed from Japanese selvedge 14oz raw denim. Features hand-worked distressed cuts with premium undershield panels, vintage stonewashing, and subtle paint splatter accents.',
    details: [
      '14oz authentic Japanese selvedge denim',
      'Hand-frayed rip details with internal reinforced lining',
      'Slim-straight editorial fit with progressive stack at ankle',
      'Premium leather debossed patch on back waistband',
      'Signature heavy-gauge golden stitching accents'
    ],
    specs: {
      'Material': '98% Cotton Denim, 2% Polyurethane for slight comfort flex',
      'Weight': '14oz Medium-Heavy Raw Selvedge',
      'Origin': 'Fabric woven in Okayama, Japan',
      'Care': 'Wash sparingly inside out, line dry'
    },
    rating: 4.6,
    reviewsCount: 78,
    stock: 15,
    inStock: true
  },
  {
    id: 'devine-005',
    name: 'DEVINE METROPOLIS SUEDE SNEAKERS',
    category: 'Sneakers',
    price: 7999,
    originalPrice: 10999,
    images: [
      'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=800&auto=format&fit=crop'
    ],
    colors: ['#FFFFFF', '#F7F7F7', '#C9A227'],
    sizes: ['40', '41', '42', '43', '44'],
    description: 'The pinnacle of luxury streetwear footwear. Individually handcrafted in Italy using top-grain calfskin suede and premium leather lining. Built on an extremely durable, lightweight Italian Margom cupsole.',
    details: [
      'Premium Italian calfskin suede upper',
      'Buttery-soft full leather inner lining',
      'Authentic Margom vulcanized rubber cupsole',
      'Waxed cotton flat laces with brushed metal tips',
      'Discreet metallic gold-stamped "DEVINE" serial code on heel'
    ],
    specs: {
      'Material': 'Calf Suede and Italian Leather',
      'Sole': '100% Margom Rubber cupsole',
      'Origin': 'Handcrafted in Civitanova Marche, Italy',
      'Inclusions': 'Custom DEVINE dust bag, extra flat waxed laces'
    },
    rating: 4.9,
    reviewsCount: 65,
    stock: 8,
    isTrending: true,
    isLimited: true,
    discount: 25,
    inStock: true
  },
  {
    id: 'devine-006',
    name: 'VINTAGE FLANNEL OVER-SHIRT',
    category: 'Premium Shirts',
    price: 2999,
    originalPrice: 3999,
    images: [
      'https://images.unsplash.com/photo-1603252109303-2751441dd157?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=800&auto=format&fit=crop'
    ],
    colors: ['#2A2A2A', '#C9A227', '#F7F7F7'],
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'A luxurious layering piece made of ultra-soft heavyweight brushed cotton flannel. Cut with a modern straight hem, dual chest flap pockets, and horn-style buttons. Perfect for styling over hoodies or core tees.',
    details: [
      '380GSM double-brushed soft wool-cotton flannel',
      'Horn-style customized premium resin buttons',
      'Straight hemline with dynamic side vents',
      'Dual utility breast pockets with snap flap closures',
      'Pre-shrunk fabric'
    ],
    specs: {
      'Material': '80% Premium Cotton, 20% Australian Wool blend',
      'Fit': 'Slightly oversized boxy cut',
      'Origin': 'Designed in Los Angeles',
      'Care': 'Dry clean recommended, or cold delicate wash'
    },
    rating: 4.5,
    reviewsCount: 52,
    stock: 30,
    inStock: true
  },
  {
    id: 'devine-007',
    name: 'DEVINE ATHLETICS SOCCER JERSEY',
    category: 'Sports Jerseys',
    price: 2499,
    originalPrice: 3299,
    images: [
      'https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?q=80&w=800&auto=format&fit=crop'
    ],
    colors: ['#000000', '#C9A227', '#FFFFFF'],
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'A retro-inspired performance streetwear football jersey. Engineered from breathable, moisture-wicking jacquard polyester with a subtle DEVINE checkerboard weave. Features a clean ribbed V-neck, ribbed cuffs, and high-density gold badges.',
    details: [
      'Moisture-wicking micro-mesh athletic jacquard',
      'Subtle gloss check pattern woven into fabric',
      'Heat-sealed matte-gold 3D TPU club crest on left chest',
      'Embroidered DEVINE sponsor lettering on chest',
      'Retro ribbed polo-style V-neck design'
    ],
    specs: {
      'Material': '100% Recycled Technical Polyester',
      'Fit': 'Authentic athletic-relaxed streetwear fit',
      'Technology': 'Dry-Breathe sweat management',
      'Care': 'Machine wash cold inside out, do not iron badges'
    },
    rating: 4.8,
    reviewsCount: 82,
    stock: 18,
    isTrending: true,
    inStock: true
  },
  {
    id: 'devine-008',
    name: 'DEVINE METALLIC GOLD CHAIN',
    category: 'Accessories',
    price: 1499,
    originalPrice: 1999,
    images: [
      '/limited_edition_banner_1783314969320.jpg', // Showing the chain on model!
      'https://images.unsplash.com/photo-1611085583191-a3b1a30a5a4a?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1598530025111-f39c14809f53?q=80&w=800&auto=format&fit=crop'
    ],
    colors: ['#C9A227'],
    sizes: ['ONE SIZE'],
    description: 'A timeless streetwear accessory. This 20-inch, 5mm Cuban link chain is micro-plated in 18-karat yellow gold over solid surgical-grade stainless steel. Engineered with a custom reinforced double-lock clasp.',
    details: [
      '18K Yellow Gold micro-plating (5 microns heavy plate)',
      'Solid 316L hypoallergenic surgical stainless steel core',
      'Custom luxury logo embossed lock box clasp',
      'Resistant to sweat, water, and tarnishing'
    ],
    specs: {
      'Material': '18k Gold Plated 316L Stainless Steel',
      'Length': '20 inches (50 cm)',
      'Width': '5.0 mm weight-balanced',
      'Origin': 'Co-designed with elite jewelers in Milan, Italy'
    },
    rating: 4.9,
    reviewsCount: 164,
    stock: 50,
    isBestSeller: true,
    inStock: true
  }
];

export const getRelatedProducts = (product: Product, limit = 4): Product[] => {
  return products
    .filter((p) => p.id !== product.id && (p.category === product.category || p.isTrending))
    .slice(0, limit);
};

export const categories = [
  { name: 'Oversized T-Shirts', image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=500&auto=format&fit=crop', desc: 'Heavyweight slouchy tees & hoodies' },
  { name: 'Premium Shirts', image: 'https://images.unsplash.com/photo-1603252109303-2751441dd157?q=80&w=500&auto=format&fit=crop', desc: 'Flannels, luxury linens, & layering pieces' },
  { name: 'Cargos', image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=500&auto=format&fit=crop', desc: 'Multi-pocket micro-ripstop utility pants' },
  { name: 'Jeans', image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=500&auto=format&fit=crop', desc: 'Okayama selvedge & distressed stacks' },
  { name: 'Sports Jerseys', image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=500&auto=format&fit=crop', desc: 'Breathable jacquard football-retro edits' },
  { name: 'Sneakers', image: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?q=80&w=500&auto=format&fit=crop', desc: 'Handcrafted Italian suede & leather soles' },
  { name: 'Accessories', image: 'https://images.unsplash.com/photo-1598530025111-f39c14809f53?q=80&w=500&auto=format&fit=crop', desc: 'Heavy 18k micro-plated chains & luxury bags' }
];
