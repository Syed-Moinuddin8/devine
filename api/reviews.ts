import type { VercelRequest, VercelResponse } from '@vercel/node';

// In-Memory Database Store
const dbStore = {
  reviews: [
    {
      id: 'rev-1',
      productId: 'devine-001',
      userName: 'Marcus K.',
      rating: 5,
      date: '2026-06-28',
      comment: 'Unbelievable fabric quality. 480GSM feels incredibly heavy and sits exactly how high-end luxury streetwear should. Definitely buying another.',
      verified: true
    },
    {
      id: 'rev-2',
      productId: 'devine-001',
      userName: 'Jordan T.',
      rating: 5,
      date: '2026-07-01',
      comment: 'Best fit I have seen on a hoodie. The gold embroidery adds that perfect low-key premium flex.',
      verified: true
    },
    {
      id: 'rev-3',
      productId: 'devine-003',
      userName: 'Tyler V.',
      rating: 5,
      date: '2026-07-02',
      comment: 'Ripstop material is waterproof and highly premium. Strap controls are clean, not too baggy.',
      verified: true
    },
    {
      id: 'rev-4',
      productId: 'devine-005',
      userName: 'Christian L.',
      rating: 5,
      date: '2026-07-03',
      comment: 'Handcrafted quality is evident immediately. Inside leather is incredibly soft. Comparable to designers charging 4x this.',
      verified: true
    }
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
    const { productId } = req.query;
    
    if (productId) {
      const filtered = dbStore.reviews.filter(r => r.productId === productId);
      return res.status(200).json({ reviews: filtered });
    }
    
    return res.status(200).json({ reviews: dbStore.reviews });
  }

  if (req.method === 'POST') {
    const { productId, userName, rating, comment } = req.body;
    
    if (!productId || !userName || !rating || !comment) {
      return res.status(400).json({ error: 'Missing review parameters.' });
    }

    const newReview = {
      id: `rev-${Date.now()}`,
      productId,
      userName,
      rating,
      date: new Date().toISOString().split('T')[0],
      comment,
      verified: true
    };

    dbStore.reviews.unshift(newReview);
    return res.status(201).json({ success: true, review: newReview });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
