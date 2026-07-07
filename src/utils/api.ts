// API utility for handling backend requests
// This will automatically use the correct API URL based on environment

const API_BASE_URL = import.meta.env.VITE_API_URL || '';

export const api = {
  // Orders endpoints
  getOrders: async () => {
    const response = await fetch(`${API_BASE_URL}/api/orders`);
    if (!response.ok) throw new Error('Failed to fetch orders');
    return response.json();
  },

  createOrder: async (orderData: any) => {
    const response = await fetch(`${API_BASE_URL}/api/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderData),
    });
    if (!response.ok) throw new Error('Failed to create order');
    return response.json();
  },

  updateOrderStatus: async (orderId: string, status: string) => {
    const response = await fetch(`${API_BASE_URL}/api/orders/${orderId}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    if (!response.ok) throw new Error('Failed to update order status');
    return response.json();
  },

  // Reviews endpoints
  getReviews: async (productId?: string) => {
    const url = productId 
      ? `${API_BASE_URL}/api/reviews?productId=${productId}`
      : `${API_BASE_URL}/api/reviews`;
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch reviews');
    return response.json();
  },

  createReview: async (reviewData: any) => {
    const response = await fetch(`${API_BASE_URL}/api/reviews`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(reviewData),
    });
    if (!response.ok) throw new Error('Failed to create review');
    return response.json();
  },

  // Coupons endpoints
  getCoupons: async () => {
    const response = await fetch(`${API_BASE_URL}/api/coupons`);
    if (!response.ok) throw new Error('Failed to fetch coupons');
    return response.json();
  },

  createCoupon: async (couponData: any) => {
    const response = await fetch(`${API_BASE_URL}/api/coupons`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(couponData),
    });
    if (!response.ok) throw new Error('Failed to create coupon');
    return response.json();
  },

  // Loyalty endpoints
  getLoyalty: async () => {
    const response = await fetch(`${API_BASE_URL}/api/loyalty`);
    if (!response.ok) throw new Error('Failed to fetch loyalty data');
    return response.json();
  },

  // AI Search endpoint
  aiSearch: async (query: string) => {
    const response = await fetch(`${API_BASE_URL}/api/ai-search`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query }),
    });
    if (!response.ok) throw new Error('Failed to perform AI search');
    return response.json();
  },
};

export default api;
