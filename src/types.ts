export interface Product {
  id: string;
  name: string;
  category: 'Oversized T-Shirts' | 'Premium Shirts' | 'Cargos' | 'Jeans' | 'Sports Jerseys' | 'Sneakers' | 'Accessories';
  price: number;
  originalPrice?: number;
  images: string[];
  colors: string[];
  sizes: string[];
  description: string;
  details: string[];
  specs: Record<string, string>;
  rating: number;
  reviewsCount: number;
  stock: number;
  isTrending?: boolean;
  isBestSeller?: boolean;
  isLimited?: boolean;
  discount?: number;
  inStock: boolean;
}

export interface Review {
  id: string;
  userName: string;
  userImage?: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
}

export interface CartItem {
  id: string; // Unique combination of productId_color_size
  product: Product;
  selectedColor: string;
  selectedSize: string;
  quantity: number;
}

export interface Order {
  id: string;
  date: string;
  items: {
    productId: string;
    name: string;
    price: number;
    quantity: number;
    color: string;
    size: string;
    image: string;
  }[];
  total: number;
  shippingAddress: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    gstNumber?: string;
  };
  paymentMethod: string;
  paymentStatus: 'Paid' | 'Pending';
  status: 'Processing' | 'Shipped' | 'Out for Delivery' | 'Delivered' | 'cancelled';
  trackingNumber?: string;
}

export interface Coupon {
  code: string;
  discount: number;
  type: 'percent' | 'fixed';
  minSpend?: number;
  description: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  loyaltyPoints: number;
  referralCode: string;
}

