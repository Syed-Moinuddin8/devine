import type { VercelRequest, VercelResponse } from '@vercel/node';

// In-Memory Database Store
const dbStore = {
  coupons: [
    { code: 'DEVINE10', discount: 10, type: 'percent' as const, description: '10% off on all streetwear' },
    { code: 'GOLDVIP', discount: 500, type: 'fixed' as const, minSpend: 3000, description: 'Flat 500 off on orders above 3000' },
    { code: 'STREETFIRST', discount: 15, type: 'percent' as const, description: '15% off first order for fashion enthusiasts' }
  ]
};

export default function handler(req: VercelRequest, res: VercelResponse) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    return res.status(200).json({ coupons: dbStore.coupons });
  }

  if (req.method === 'POST') {
    const { code, discount, type, minSpend, description } = req.body;
    
    if (!code || !discount || !type) {
      return res.status(400).json({ error: 'Missing coupon values.' });
    }
    
    const newCoupon = { 
      code: code.toUpperCase(), 
      discount, 
      type, 
      minSpend, 
      description: description || '' 
    };
    
    dbStore.coupons.push(newCoupon);
    return res.status(201).json({ success: true, coupon: newCoupon });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
