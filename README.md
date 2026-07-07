<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# DEVINE Premium Streetwear

A luxury streetwear e-commerce platform featuring AI-powered product search, interactive shopping experience, and admin management.

View your app in AI Studio: https://ai.studio/apps/bfd2228d-3ae6-4003-a4e4-e4a9673ff3a2

## ✨ Features

- 🛍️ **E-commerce Platform** - Full-featured shopping experience
- 🤖 **AI Product Search** - Gemini-powered product recommendations
- 🎨 **Luxury UI/UX** - Cinematic design with smooth animations
- 📦 **Order Management** - Complete checkout and order tracking
- 👤 **User Accounts** - Order history, wishlist, loyalty points
- 🎯 **Admin Dashboard** - Order management and inventory control
- 📱 **Responsive Design** - Mobile-first approach
- ⚡ **Fast Performance** - Built with React 19 + Vite

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Local Development

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   - Copy `.env.example` to `.env.local`
   - Add your `GEMINI_API_KEY` to `.env.local`

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   - Navigate to `http://localhost:3000`

## 📦 Deployment

This project is configured for **complete Vercel deployment** - both frontend and backend on one platform!

### 🚀 Quick Deploy to Vercel

**Method 1: CLI (5 minutes)**
```bash
npm install -g vercel
vercel login
vercel --prod

# Add your Gemini API key
vercel env add GEMINI_API_KEY
vercel --prod
```

**Method 2: Dashboard**
1. Push to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Add `GEMINI_API_KEY` environment variable
5. Deploy!

### 📘 Deployment Guides

- **Quick Start**: [VERCEL-QUICK-START.md](./VERCEL-QUICK-START.md) ⚡
- **Complete Guide**: [DEPLOYMENT-GUIDE.md](./DEPLOYMENT-GUIDE.md) 📚

### Deployment Architecture

```
Complete Vercel Deployment:
  ├── Frontend (React/Vite) → Vercel Static Hosting
  └── Backend API → Vercel Serverless Functions
      ├── /api/orders
      ├── /api/reviews
      ├── /api/coupons
      ├── /api/loyalty
      └── /api/ai-search (Gemini AI)
```

## 🛠️ Tech Stack

### Frontend
- React 19
- TypeScript
- Vite
- Tailwind CSS
- Motion (Framer Motion)
- Lucide Icons

### Backend
- Vercel Serverless Functions
- Gemini AI SDK
- Node.js

### Deployment
- Vercel (Frontend + Backend All-in-One)

## 📂 Project Structure

```
├── api/                # Vercel Serverless Functions (Backend)
│   ├── orders.ts
│   ├── reviews.ts
│   ├── coupons.ts
│   ├── loyalty.ts
│   ├── ai-search.ts
│   └── orders/
│       └── [id]/
│           └── status.ts
├── src/
│   ├── components/     # React components
│   ├── data/          # Product catalog
│   ├── assets/        # Images and static files
│   ├── utils/         # API utilities
│   ├── App.tsx        # Main app component
│   └── types.ts       # TypeScript definitions
├── vercel.json        # Vercel config
└── VERCEL-DEPLOYMENT.md  # Deployment guide
```

## 🔧 Available Scripts

```bash
npm run dev              # Start development server
npm run build            # Build frontend + backend
npm run build:frontend   # Build frontend only
npm run build:backend    # Build backend only
npm run start            # Start production server
npm run lint             # Run TypeScript linter
```

## 🧪 Testing

Test API endpoints using the provided `test-api.http` file with REST Client extension or Postman.

## 📚 Documentation

- [Deployment Guide](./DEPLOYMENT-GUIDE.md) - Complete Vercel deployment instructions
- [Vercel Quick Start](./VERCEL-QUICK-START.md) - 5-minute quick deploy guide
- [Troubleshooting](./TROUBLESHOOTING.md) - Common issues and solutions
- [Architecture](./ARCHITECTURE.md) - System architecture overview

## 🔐 Environment Variables

### Vercel Deployment (Production)
Only one variable needed:
```env
GEMINI_API_KEY=your_gemini_api_key
```
Set this in Vercel Dashboard → Settings → Environment Variables

### Local Development
No environment variables needed for local dev (uses fallback mode).

## ⚠️ Important Notes

- Current implementation uses **in-memory storage** in serverless functions
- Data persists during function warm time (~5-15 minutes)
- For production, consider adding persistent database:
  - Vercel Postgres
  - MongoDB Atlas
  - Supabase
  - PlanetScale

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📝 License

This project is private and proprietary.

## 💬 Support

For deployment help:
- Check the deployment guides in `/docs`
- Review platform documentation (Vercel, Railway, Render)
- Check platform Discord communities

---

**Ready to deploy?** Follow the [Deployment Guide](./DEPLOYMENT-GUIDE.md)! 🚀
