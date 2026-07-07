# 🚀 Complete Vercel Deployment Guide

## Overview

Your DEVINE Premium Streetwear project is now configured to deploy **completely on Vercel**:
- ✅ Frontend (React + Vite) → Vercel Static Hosting
- ✅ Backend API → Vercel Serverless Functions
- ✅ Everything on one platform!

---

## 📦 What's Been Configured

### ✅ Serverless Functions Created
All API endpoints are now Vercel Serverless Functions in the `/api` folder:

- `/api/orders.ts` - Get and create orders
- `/api/orders/[id]/status.ts` - Update order status
- `/api/reviews.ts` - Get and create reviews
- `/api/coupons.ts` - Get and create coupons
- `/api/loyalty.ts` - Get loyalty points
- `/api/ai-search.ts` - AI-powered product search

### ✅ Configuration Updated
- `vercel.json` - Configured for serverless functions + SPA routing
- `src/utils/api.ts` - Updated to use relative API paths
- Environment files updated for Vercel deployment

---

## 🚀 Deploy to Vercel (3 Methods)

### Method 1: Vercel CLI (Fastest - 5 minutes)

#### Step 1: Install Vercel CLI
```bash
npm install -g vercel
```

#### Step 2: Login to Vercel
```bash
vercel login
```
Follow the prompts to authenticate.

#### Step 3: Deploy
```bash
# Preview deployment (test first)
vercel

# Production deployment
vercel --prod
```

#### Step 4: Add Environment Variable
```bash
# Add your Gemini API key
vercel env add GEMINI_API_KEY

# When prompted:
# - Environment: Select "Production"
# - Value: Paste your Gemini API key
```

#### Step 5: Redeploy with Environment Variable
```bash
vercel --prod
```

**✅ Done! Your app is live!**

---

### Method 2: Vercel Dashboard (Easiest for beginners)

#### Step 1: Push to GitHub
```bash
git add .
git commit -m "Configure for Vercel deployment"
git push origin main
```

#### Step 2: Go to Vercel
1. Visit [vercel.com](https://vercel.com)
2. Sign up/login with GitHub

#### Step 3: Import Project
1. Click "Add New" → "Project"
2. Import your GitHub repository
3. Vercel auto-detects Vite framework

#### Step 4: Configure Project
- **Framework Preset**: Vite (auto-detected)
- **Root Directory**: `./`
- **Build Command**: `npm run build` (auto-detected)
- **Output Directory**: `dist` (auto-detected)
- **Install Command**: `npm install` (auto-detected)

#### Step 5: Add Environment Variable
1. Before clicking "Deploy", expand "Environment Variables"
2. Add:
   - **Name**: `GEMINI_API_KEY`
   - **Value**: Your Gemini API key
   - **Environment**: Production

#### Step 6: Deploy
1. Click "Deploy"
2. Wait 2-3 minutes
3. **✅ Your app is live!**

---

### Method 3: GitHub Integration (Auto-Deploy on Push)

#### Step 1: Connect to Vercel (one-time setup)
Follow Method 2 steps 1-6 above.

#### Step 2: Auto-Deploy Setup
Once connected, every push to `main` branch auto-deploys:

```bash
# Make changes
git add .
git commit -m "Update feature"
git push origin main

# Vercel automatically deploys in 2-3 minutes
```

---

## 🔑 Environment Variables

### Required Variable

Only ONE environment variable is required:

| Variable | Value | Where to Set |
|----------|-------|--------------|
| `GEMINI_API_KEY` | Your Gemini API key | Vercel Dashboard |

**Get your API key**: https://aistudio.google.com/apikey

### How to Add in Vercel Dashboard

1. Go to your project on Vercel
2. Click "Settings"
3. Click "Environment Variables"
4. Add `GEMINI_API_KEY`
5. Paste your API key
6. Select "Production" (and optionally "Preview" and "Development")
7. Click "Save"
8. Redeploy your project

---

## 🧪 Testing Your Deployment

### 1. Test Homepage
Visit your Vercel URL: `https://your-app.vercel.app`
- ✅ Homepage loads
- ✅ Images display
- ✅ Navigation works

### 2. Test API Endpoints
Open browser console and test API calls:

```javascript
// Test orders endpoint
fetch('/api/orders')
  .then(r => r.json())
  .then(console.log);

// Test AI search
fetch('/api/ai-search', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ query: 'oversized hoodie' })
})
  .then(r => r.json())
  .then(console.log);
```

### 3. Test Full Flow
- ✅ Browse products
- ✅ Add to cart
- ✅ Complete checkout
- ✅ Order appears in account
- ✅ AI search works
- ✅ Reviews work

---

## 📊 Vercel Dashboard Overview

### After Deployment

Your Vercel dashboard shows:

1. **Overview**: Deployment status, domain, git branch
2. **Deployments**: History of all deployments
3. **Functions**: Your serverless function logs and performance
4. **Settings**: Environment variables, domains, etc.

### View Logs

To see serverless function logs:
1. Go to Vercel Dashboard
2. Click "Functions" tab
3. View real-time logs and errors

---

## 🌐 Custom Domain (Optional)

### Add Your Own Domain

1. Go to Vercel Dashboard
2. Click "Settings" → "Domains"
3. Add your domain (e.g., `devine-streetwear.com`)
4. Follow DNS configuration instructions
5. Wait for DNS propagation (5-30 minutes)

**Free SSL certificate** is automatically provisioned!

---

## ⚡ Performance Features

Vercel automatically provides:

- ✅ **Global CDN** - Lightning fast worldwide
- ✅ **Edge Caching** - Cached at 100+ edge locations
- ✅ **Automatic HTTPS** - SSL certificate included
- ✅ **Smart Caching** - Static assets cached forever
- ✅ **Instant Rollbacks** - One-click rollback to previous deployment
- ✅ **DDoS Protection** - Enterprise-grade security

---

## 📱 Serverless Function Details

### How It Works

```
User Request → Vercel Edge Network → Serverless Function → Response
                    ↓
              Static Assets (Frontend)
```

### Function Specifications

- **Runtime**: Node.js
- **Memory**: 1024 MB (configurable in vercel.json)
- **Timeout**: 10 seconds (free tier)
- **Region**: Automatically optimized
- **Cold Start**: ~100-300ms first request

### Function URLs

Your API is available at:
- `/api/orders`
- `/api/reviews`
- `/api/coupons`
- `/api/loyalty`
- `/api/ai-search`
- `/api/orders/[orderId]/status`

---

## 🔄 Continuous Deployment

### Auto-Deploy Workflow

```
1. Make code changes locally
2. git commit -m "feature"
3. git push origin main
4. Vercel detects push
5. Builds & deploys automatically
6. Live in 2-3 minutes!
```

### Branch Deployments

Vercel creates preview deployments for every branch:
- `main` branch → Production
- Other branches → Preview URLs (for testing)

---

## 🐛 Troubleshooting

### Issue: Build Fails

**Check build logs in Vercel dashboard:**
1. Go to "Deployments" tab
2. Click failed deployment
3. View "Building" logs
4. Fix errors shown

**Common fixes:**
```bash
# Test build locally first
npm run build

# Install missing dependencies
npm install @vercel/node --save-dev
```

---

### Issue: API Calls Fail (404)

**Solution:**
1. Ensure `/api` folder exists with `.ts` files
2. Check `vercel.json` has correct rewrites
3. Redeploy

---

### Issue: Environment Variable Not Working

**Solution:**
1. Verify variable name is `GEMINI_API_KEY` (exact case)
2. In Vercel: Settings → Environment Variables
3. Ensure "Production" is selected
4. **Redeploy** after adding variables (important!)

---

### Issue: Function Timeout

**Symptoms:** "Function exceeded timeout"

**Solution:**
- Free tier has 10s timeout
- Upgrade to Pro for 60s timeout
- Or optimize function code

---

### Issue: Cold Starts

**Symptoms:** First request after inactivity is slow

**This is normal** for serverless functions:
- First request: ~300ms (cold start)
- Subsequent requests: ~10-50ms

**Solutions:**
- Upgrade to Pro for faster cold starts
- Or accept this limitation (most users won't notice)

---

## 💰 Vercel Pricing

### Free Tier (Hobby)

**Perfect for this project!**

- ✅ Unlimited deployments
- ✅ 100 GB bandwidth/month
- ✅ Serverless function executions: 100 GB-Hrs
- ✅ HTTPS included
- ✅ Custom domain support
- ⏱️ 10s function timeout

### Pro Tier ($20/month)

If you need:
- More bandwidth
- 60s function timeout
- Analytics
- Password protection
- Team collaboration

---

## 📊 Monitoring & Analytics

### Built-in Analytics

Vercel provides:
- Real-time visitor analytics
- Function execution times
- Error tracking
- Bandwidth usage

**Enable in Dashboard:**
1. Go to "Analytics" tab
2. Enable Web Analytics
3. View real-time stats

---

## 🔐 Security

### Automatic Security Features

Vercel provides:
- ✅ DDoS protection
- ✅ SSL/HTTPS enforcement
- ✅ WAF (Web Application Firewall)
- ✅ Secure environment variables
- ✅ Function isolation

### Best Practices

1. **Never commit API keys** - Use environment variables
2. **Enable security headers** - Add to `vercel.json`
3. **Keep dependencies updated** - Run `npm audit`

---

## 🎉 You're Done!

Your DEVINE Streetwear app is now fully deployed on Vercel!

### Your Deployment URLs

**Production:**
```
Frontend: https://your-app.vercel.app
API: https://your-app.vercel.app/api/*
```

### Next Steps

- [ ] Test all features on production
- [ ] Add custom domain (optional)
- [ ] Enable Vercel Analytics
- [ ] Share your app!

---

## 📚 Additional Resources

- **Vercel Docs**: https://vercel.com/docs
- **Serverless Functions**: https://vercel.com/docs/functions
- **Environment Variables**: https://vercel.com/docs/environment-variables
- **Custom Domains**: https://vercel.com/docs/custom-domains

---

## 💡 Tips

1. **Preview deployments** - Test before production with `vercel`
2. **Branch protection** - Use preview URLs for pull requests
3. **Instant rollback** - One click to revert bad deployments
4. **Function logs** - Monitor in real-time in dashboard

---

**Questions?** Check the Vercel docs or their support!

**Ready to deploy?** Run `vercel --prod` now! 🚀
