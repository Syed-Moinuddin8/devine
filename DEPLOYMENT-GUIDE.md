# 🚀 Complete Vercel Deployment Guide

## Quick Deploy

Your project is ready to deploy **completely on Vercel** - both frontend and backend!

### Method 1: CLI (Fastest - 5 minutes)

```bash
# 1. Install Vercel CLI
npm install -g vercel

# 2. Login
vercel login

# 3. Deploy
vercel --prod

# 4. Add your Gemini API key
vercel env add GEMINI_API_KEY
# Select: Production
# Paste your key from: https://aistudio.google.com/apikey

# 5. Redeploy with the environment variable
vercel --prod
```

**✅ You're live!**

---

### Method 2: Dashboard (Easiest)

```bash
# 1. Push to GitHub
git add .
git commit -m "Ready for deployment"
git push origin main
```

Then:
1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "Add New" → "Project"
3. Import your GitHub repository
4. Add environment variable:
   - Name: `GEMINI_API_KEY`
   - Value: Your Gemini API key
   - Environment: Production
5. Click "Deploy"

**✅ Done! Your app will be live in 2-3 minutes!**

---

## 🏗️ Architecture

```
Vercel All-in-One:
  ├── Frontend (React + Vite) → Static Hosting
  └── Backend (Serverless Functions)
      ├── /api/orders
      ├── /api/orders/[id]/status
      ├── /api/reviews
      ├── /api/coupons
      ├── /api/loyalty
      └── /api/ai-search (Gemini AI)
```

---

## 🔑 Environment Variable

Only **ONE** environment variable is required:

```
GEMINI_API_KEY = your_gemini_api_key
```

**Get your API key**: https://aistudio.google.com/apikey

**Set in Vercel**:
- Dashboard → Settings → Environment Variables
- Or via CLI: `vercel env add GEMINI_API_KEY`

---

## 🧪 Testing Deployment

Visit your Vercel URL and test:
- ✅ Homepage loads
- ✅ Products display
- ✅ Add to cart
- ✅ Complete checkout
- ✅ View orders
- ✅ AI search works
- ✅ Reviews system

---

## 📊 API Endpoints

All serverless functions are available at:

- **GET** `/api/orders` - Fetch all orders
- **POST** `/api/orders` - Create new order
- **PATCH** `/api/orders/:id/status` - Update order status
- **GET** `/api/reviews?productId=xxx` - Fetch reviews
- **POST** `/api/reviews` - Create review
- **GET** `/api/coupons` - Fetch coupons
- **POST** `/api/coupons` - Create coupon
- **GET** `/api/loyalty` - Fetch loyalty points
- **POST** `/api/ai-search` - AI product search

---

## 🔄 Continuous Deployment

After initial setup, every push to `main` branch auto-deploys:

```bash
git add .
git commit -m "New feature"
git push origin main
# ↓
# Vercel auto-deploys in 2-3 minutes
```

---

## 🐛 Troubleshooting

### Build Fails
```bash
# Test build locally first
npm run build
```

### Function Errors
- Check Vercel Dashboard → Functions → Logs
- Verify `GEMINI_API_KEY` is set correctly

### Environment Variable Not Working
1. Make sure it's named exactly: `GEMINI_API_KEY`
2. Select "Production" environment
3. **Redeploy** after adding the variable

---

## 💰 Vercel Free Tier

Perfect for this project:
- ✅ 100 GB bandwidth/month
- ✅ 100 GB-Hrs serverless functions
- ✅ Unlimited deployments
- ✅ HTTPS included
- ✅ Custom domain support

---

## 🌐 Custom Domain (Optional)

1. Go to Vercel Dashboard
2. Settings → Domains
3. Add your domain
4. Follow DNS instructions
5. SSL certificate auto-configured

---

## 📱 Local Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Visit http://localhost:5173
```

---

## 🎯 Useful Commands

```bash
# Preview deployment (test before production)
vercel

# Deploy to production
vercel --prod

# View logs
vercel logs

# List all deployments
vercel ls

# View project info
vercel inspect
```

---

## ⚠️ Important Notes

### Data Persistence
- Current setup uses **in-memory storage** in serverless functions
- Data persists during function warm time (~5-15 minutes)
- Resets on cold starts

### For Production
Consider adding a persistent database:
- Vercel Postgres
- MongoDB Atlas
- Supabase
- PlanetScale

---

## 📚 Resources

- **Vercel Docs**: https://vercel.com/docs
- **Serverless Functions**: https://vercel.com/docs/functions
- **Environment Variables**: https://vercel.com/docs/environment-variables
- **Gemini API**: https://ai.google.dev/gemini-api/docs

---

## 🎉 Ready to Deploy!

Run this command to deploy:

```bash
vercel --prod
```

Your app will be live at: `https://your-app.vercel.app`

**Good luck!** 🚀
