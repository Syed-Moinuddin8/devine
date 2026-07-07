import type { VercelRequest, VercelResponse } from '@vercel/node';

// In-Memory Database Store
const dbStore = {
  loyaltyPoints: 350
};

export default function handler(req: VercelRequest, res: VercelResponse) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    return res.status(200).json({ 
      loyaltyPoints: dbStore.loyaltyPoints, 
      referralCode: 'DEVINE-STREET-881' 
    });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
