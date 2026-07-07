import type { VercelRequest, VercelResponse } from '@vercel/node';

// In-Memory Database Store
const dbStore = {
  orders: [
    {
      id: 'DEV-98124',
      date: '2026-07-04T14:30:00Z',
      items: [
        {
          productId: 'devine-001',
          name: 'DEVINE SIGNATURE OVERSIZED HOODIE',
          price: 3499,
          quantity: 1,
          color: '#000000',
          size: 'XL',
          image: '/src/assets/images/hero_streetwear_devine_1783314954500.jpg'
        }
      ],
      total: 3499,
      shippingAddress: {
        fullName: 'Alexander Mercer',
        email: 'alex.mercer@gmail.com',
        phone: '+1 (555) 981-2244',
        address: '842 Melrose Avenue',
        city: 'Los Angeles',
        state: 'California',
        zipCode: '90046'
      },
      paymentMethod: 'Credit Card',
      paymentStatus: 'Paid' as const,
      status: 'Shipped' as const,
      trackingNumber: 'SHIP-99128301'
    }
  ]
};

export default function handler(req: VercelRequest, res: VercelResponse) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'PATCH, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'PATCH') {
    const { id } = req.query;
    const { status } = req.body;
    
    const order = dbStore.orders.find(o => o.id === id);
    
    if (!order) {
      return res.status(404).json({ error: 'Order not found.' });
    }
    
    order.status = status;
    return res.status(200).json({ success: true, order });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
