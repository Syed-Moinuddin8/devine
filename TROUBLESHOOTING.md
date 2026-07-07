# 🔧 Deployment Troubleshooting Guide

Common issues and solutions when deploying DEVINE Streetwear.

---

## 🚨 Frontend Issues (Vercel)

### Issue: Build Fails on Vercel

**Symptoms:**
- Build logs show errors
- Deployment fails
- Red X on deployment status

**Solutions:**

1. **Check build locally first:**
   ```bash
   npm run build
   ```
   Fix any errors that appear locally.

2. **Missing environment variables:**
   - Go to Vercel → Settings → Environment Variables
   - Ensure `VITE_API_URL` is set
   - Redeploy

3. **Node version mismatch:**
   - Add to `package.json`:
   ```json
   "engines": {
     "node": ">=18.0.0"
   }
   ```

4. **Dependency issues:**
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

---

### Issue: Blank Page / White Screen

**Symptoms:**
- Page loads but shows nothing
- No content visible
- Browser console may have errors

**Solutions:**

1. **Check browser console for errors:**
   - Right-click → Inspect → Console tab
   - Look for error messages

2. **Verify base URL in vite.config:**
   - Should not have custom base unless using subdirectory

3. **Check asset paths:**
   - Assets should use relative paths
   - Images should be in `public/` or imported

4. **Clear browser cache:**
   - Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)

---

### Issue: 404 on Page Refresh

**Symptoms:**
- Homepage works
- Navigation works
- Refreshing any page shows 404

**Solutions:**

1. **Verify `vercel.json` exists:**
   ```json
   {
     "rewrites": [
       {
         "source": "/(.*)",
         "destination": "/index.html"
       }
     ]
   }
   ```

2. **Redeploy after adding vercel.json**

---

### Issue: Environment Variables Not Working

**Symptoms:**
- API calls fail
- `import.meta.env.VITE_API_URL` is undefined

**Solutions:**

1. **Must prefix with `VITE_`:**
   - ✅ `VITE_API_URL`
   - ❌ `API_URL`

2. **Add to Vercel dashboard:**
   - Settings → Environment Variables
   - Add: `VITE_API_URL` = `https://your-backend-url`
   - Select "Production" environment

3. **Redeploy after adding env vars:**
   - Vercel → Deployments → Click "..." → Redeploy

4. **Check build logs:**
   - Vercel shows env vars as `[REDACTED]` in logs
   - This is normal - means they're set

---

## 🌐 Backend Issues (Railway/Render)

### Issue: Backend Deployment Fails

**Symptoms:**
- Build logs show errors
- Service won't start
- Crash loop

**Solutions:**

1. **Check build command:**
   - Should be: `npm install && npm run build`
   - Or just: `npm install` if building on start

2. **Check start command:**
   - Should be: `npm start`
   - Points to: `node dist/server.cjs`

3. **Verify build output:**
   - Ensure `dist/server.cjs` is created
   - Check build logs for errors

4. **Environment variables missing:**
   - Railway/Render → Variables/Environment
   - Must have `GEMINI_API_KEY`

---

### Issue: Backend Starts Then Crashes

**Symptoms:**
- Builds successfully
- Starts but crashes after a few seconds
- Logs show errors

**Solutions:**

1. **Check logs for error messages:**
   - Railway: Logs tab
   - Render: Logs in dashboard

2. **Common error - Port binding:**
   - Railway/Render assign port dynamically
   - Use: `process.env.PORT || 3000`
   - Check `server.ts` has this

3. **Missing dependencies:**
   ```bash
   npm install --save express dotenv @google/genai
   ```

4. **Syntax errors:**
   - Run locally first: `npm run dev`
   - Fix any errors before deploying

---

### Issue: API Returns 500 Errors

**Symptoms:**
- Backend is running
- API calls return 500 Internal Server Error
- Some endpoints work, others don't

**Solutions:**

1. **Check backend logs:**
   - Look for error stack traces
   - Identify which route is failing

2. **Gemini API key issues:**
   - Verify `GEMINI_API_KEY` is set correctly
   - Test AI search endpoint
   - Check Gemini API quota

3. **Database/data issues:**
   - Current implementation uses in-memory data
   - Data resets on restart (this is normal)
   - Consider persistent database for production

---

## 🔗 Integration Issues (Frontend ↔ Backend)

### Issue: CORS Errors

**Symptoms:**
- Browser console shows:
  ```
  Access to fetch at 'https://backend...' from origin 'https://frontend...'
  has been blocked by CORS policy
  ```
- Network tab shows failed requests

**Solutions:**

1. **Update backend CORS settings:**
   
   Edit `server.ts`:
   ```javascript
   const allowedOrigins = [
     'http://localhost:5173',
     'http://localhost:3000',
     'https://your-actual-vercel-url.vercel.app', // ADD THIS
   ];
   ```

2. **Commit and push changes:**
   ```bash
   git add server.ts
   git commit -m "Update CORS for production"
   git push
   ```

3. **Verify auto-redeploy:**
   - Railway/Render should auto-redeploy
   - Check deployment logs

4. **Test again:**
   - Hard refresh frontend (Ctrl+Shift+R)
   - Check if CORS error is gone

---

### Issue: API Calls Return 404

**Symptoms:**
- Network tab shows 404 for API calls
- Backend is running
- URLs look correct

**Solutions:**

1. **Verify API URL:**
   - Check `.env.production`
   - Should be: `VITE_API_URL=https://your-backend-url`
   - No trailing slash

2. **Check API endpoint paths:**
   - Should be: `/api/orders` not `api/orders`
   - Leading slash is important

3. **Verify backend routes:**
   - Test directly: `curl https://backend-url/api/orders`
   - Should return JSON data

4. **Check network tab:**
   - What URL is actually being called?
   - Does it match your backend URL?

---

### Issue: API Calls Timeout

**Symptoms:**
- Requests hang
- Eventually timeout
- Spinner never stops

**Solutions:**

1. **Backend cold start (Render free tier):**
   - First request after 15 min takes ~30s
   - This is normal for free tier
   - Consider paid tier for always-on

2. **Check backend status:**
   - Is backend actually running?
   - Check platform dashboard

3. **Firewall/network issues:**
   - Try from different network
   - Check if corporate firewall blocks

4. **Backend performance:**
   - Check logs for slow queries
   - Monitor CPU/memory usage

---

## 🔑 API Key Issues

### Issue: Gemini API Not Working

**Symptoms:**
- AI search returns error
- Logs show API key error
- Fallback search is used

**Solutions:**

1. **Verify API key is valid:**
   - Get key from: https://aistudio.google.com/apikey
   - Should start with `AI...`

2. **Check key is set correctly:**
   - Railway/Render dashboard
   - Variable name: `GEMINI_API_KEY`
   - Value: Your actual key (no quotes)

3. **Restart backend:**
   - Environment variables need restart to apply
   - Redeploy or restart service

4. **Check API quota:**
   - Gemini AI Studio → API Keys
   - Verify quota not exceeded

5. **Test API key locally:**
   ```bash
   curl https://generativelanguage.googleapis.com/v1/models?key=YOUR_KEY
   ```

---

## 📱 Mobile/Responsive Issues

### Issue: Layout Broken on Mobile

**Solutions:**

1. **Check viewport meta tag:**
   ```html
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
   ```

2. **Test responsive breakpoints:**
   - Chrome DevTools → Toggle device toolbar
   - Test various screen sizes

3. **Check Tailwind responsive classes:**
   - Use: `sm:` `md:` `lg:` prefixes
   - Mobile-first approach

---

## 🐌 Performance Issues

### Issue: Slow Loading

**Solutions:**

1. **Optimize images:**
   - Use WebP format
   - Compress images
   - Lazy load below fold

2. **Check bundle size:**
   ```bash
   npm run build
   ```
   - Look for large chunks
   - Consider code splitting

3. **Enable CDN:**
   - Vercel automatically uses CDN
   - Images should use Vercel Image Optimization

4. **Reduce API calls:**
   - Cache API responses
   - Use React Query or SWR

---

## 🔄 Continuous Deployment Issues

### Issue: Changes Not Deploying

**Symptoms:**
- Pushed to GitHub
- No new deployment
- Old version still live

**Solutions:**

1. **Check auto-deploy is enabled:**
   - Vercel: Settings → Git → Production Branch
   - Railway: Settings → Deploy

2. **Verify correct branch:**
   - Usually `main` or `master`
   - Check what you pushed to

3. **Check deployment logs:**
   - Look for build/deployment in progress
   - Check for errors

4. **Manual trigger:**
   - Vercel: Deployments → Redeploy
   - Railway: Deploy → Manual Trigger

---

## 🆘 Still Having Issues?

### Debugging Checklist

- [ ] Test locally with `npm run build && npm start`
- [ ] Check browser console for errors
- [ ] Check network tab for failed requests
- [ ] Check backend logs for errors
- [ ] Verify all environment variables are set
- [ ] Verify CORS settings updated
- [ ] Try in incognito/private mode
- [ ] Try different browser
- [ ] Clear cache and cookies
- [ ] Check platform status pages

### Get Help

**Platform Status Pages:**
- Vercel: https://www.vercel-status.com
- Railway: https://railway.app/status
- Render: https://status.render.com

**Community Support:**
- Railway Discord: https://discord.gg/railway
- Vercel Discord: https://vercel.com/discord
- Render Community: https://community.render.com

**Documentation:**
- [DEPLOYMENT.md](./DEPLOYMENT.md)
- [BACKEND-CONFIG.md](./BACKEND-CONFIG.md)
- [DEPLOYMENT-CHECKLIST.md](./DEPLOYMENT-CHECKLIST.md)

---

## 📝 Debug Commands

```bash
# Test backend locally
npm run dev

# Build and test production locally
npm run build
npm start

# Test specific API endpoint
curl http://localhost:3000/api/orders

# Check environment variables (local)
echo $VITE_API_URL

# View Vercel logs
vercel logs

# Check for TypeScript errors
npm run lint
```

---

**Pro Tip:** Most issues are caused by:
1. Missing/incorrect environment variables
2. CORS not configured
3. API URL not updated
4. Cache not cleared

Start with these four things and 90% of issues will be resolved! 🎯
