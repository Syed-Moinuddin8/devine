import type { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenAI, Type } from '@google/genai';

// Product catalog for AI matching
const productCatalogDetails = [
  { id: 'devine-001', name: 'DEVINE SIGNATURE OVERSIZED HOODIE', category: 'Oversized T-Shirts / Hoodies', price: 3499, description: '480GSM heavy organic cotton, double lined hood, matte gold embroidery on center chest, oversized slouchy fit.' },
  { id: 'devine-002', name: 'CORE APEX OVERSIZED GRAPHIC TEE', category: 'Oversized T-Shirts', price: 1899, description: '280GSM heavy combed cotton, boxy drop shoulders, high collar 1.2-inch rib, custom distress back slogan print.' },
  { id: 'devine-003', name: 'KINETIC MULTI-POCKET UTILITY CARGOS', category: 'Cargos', price: 3899, description: 'Cotton-nylon micro-ripstop, water resistant, tapered streetwear silhouette, 8 custom cargo pockets, knee/ankle modular tension strap locks.' },
  { id: 'devine-004', name: 'STREETCOURT ONE DISTRESSED DENIM', category: 'Jeans', price: 4299, description: '14oz Okayama Japanese raw selvedge denim, slim-straight stack fit, hand distressed slits with reinforced lining.' },
  { id: 'devine-005', name: 'DEVINE METROPOLIS SUEDE SNEAKERS', category: 'Sneakers', price: 7999, description: 'Handcrafted luxury sneakers, Italian calfskin suede upper, buttery leather lining, authentic Margom rubber sole.' },
  { id: 'devine-006', name: 'VINTAGE FLANNEL OVER-SHIRT', category: 'Premium Shirts', price: 2999, description: '380GSM double brushed wool-cotton flannel, horn resin buttons, side split straight hem, relaxed silhouette.' },
  { id: 'devine-007', name: 'DEVINE ATHLETICS SOCCER JERSEY', category: 'Sports Jerseys', price: 2499, description: 'Moisture wicking check pattern jacquard weave, matte gold 3D TPU badge, ribbed V-neck, retro sports fashion.' },
  { id: 'devine-008', name: 'DEVINE METALLIC GOLD CHAIN', category: 'Accessories', price: 1499, description: '5mm Cuban link chain, 18k yellow gold heavy plating, hypoallergenic 316L stainless steel, Milan design.' }
];

// Fallback keyword matcher
const fallbackMatch = (query: string) => {
  const lowerQuery = query.toLowerCase();
  const matchedIds: string[] = [];
  
  if (lowerQuery.includes('hoodie') || lowerQuery.includes('oversized') || lowerQuery.includes('black')) matchedIds.push('devine-001');
  if (lowerQuery.includes('tee') || lowerQuery.includes('t-shirt') || lowerQuery.includes('graphic')) matchedIds.push('devine-002');
  if (lowerQuery.includes('cargo') || lowerQuery.includes('pants') || lowerQuery.includes('pockets') || lowerQuery.includes('utility')) matchedIds.push('devine-003');
  if (lowerQuery.includes('denim') || lowerQuery.includes('jeans') || lowerQuery.includes('ripped')) matchedIds.push('devine-004');
  if (lowerQuery.includes('sneaker') || lowerQuery.includes('shoes') || lowerQuery.includes('suede')) matchedIds.push('devine-005');
  if (lowerQuery.includes('flannel') || lowerQuery.includes('shirt') || lowerQuery.includes('check')) matchedIds.push('devine-006');
  if (lowerQuery.includes('jersey') || lowerQuery.includes('soccer') || lowerQuery.includes('athletics')) matchedIds.push('devine-007');
  if (lowerQuery.includes('chain') || lowerQuery.includes('gold') || lowerQuery.includes('necklace') || lowerQuery.includes('accessory')) matchedIds.push('devine-008');

  if (matchedIds.length === 0) {
    matchedIds.push('devine-001', 'devine-003', 'devine-005');
  }

  return {
    matchedIds,
    reply: `I did a premium search of our active inventory for "${query}". I recommend coordinating our heavy-weight DEVINE Signature Oversized Hoodie with the tactical Kinetic Utility Cargos, rounded off by the handcrafted Metropolis Suede Sneakers in white for an iconic high-end streetwear silhouette. This fit stands out with its high-density proportions and editorial contrast.`
  };
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { query } = req.body;
  
  if (!query) {
    return res.status(400).json({ error: 'Query is required for AI Search.' });
  }

  // Check if API key exists
  const apiKey = process.env.GEMINI_API_KEY;
  
  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
    return res.status(200).json(fallbackMatch(query));
  }

  try {
    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'vercel-serverless',
        }
      }
    });

    const prompt = `The customer is requesting style recommendations or searching our high-end fashion inventory with this query: "${query}".
    
    Our active catalog is as follows:
    ${JSON.stringify(productCatalogDetails, null, 2)}
    
    Match this query with the most appropriate products. Return the list of matched product IDs, along with a personalized reply from the DEVINE Styling Concierge. The tone must be extremely luxurious, authoritative, confident, streetwear-knowledgeable, and styling-focused (e.g. SNITCH, REPRESENT fashion advisor). Explain how to style the items together (e.g. proportions, layering, metal matches).`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            matchedIds: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: 'IDs of matched products from the catalog.'
            },
            reply: {
              type: Type.STRING,
              description: 'Luxurious fashion advisor response recommending matching clothing and premium styling guidelines.'
            }
          },
          required: ['matchedIds', 'reply']
        }
      }
    });

    if (response.text) {
      const parsed = JSON.parse(response.text.trim());
      return res.status(200).json(parsed);
    } else {
      return res.status(200).json(fallbackMatch(query));
    }
  } catch (error) {
    console.error('Error with Gemini API:', error);
    return res.status(200).json(fallbackMatch(query));
  }
}
