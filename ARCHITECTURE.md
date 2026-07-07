# 🏗️ Architecture Overview

## System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────┐
│                                                                     │
│                          USER'S BROWSER                            │
│                                                                     │
│  ┌──────────────────────────────────────────────────────────┐    │
│  │  React Application (SPA)                                 │    │
│  │  • React 19 + TypeScript                                 │    │
│  │  • Vite Build System                                     │    │
│  │  • Tailwind CSS Styling                                  │    │
│  │  • Motion Animations                                     │    │
│  │  • Local State Management                                │    │
│  └──────────────────────────────────────────────────────────┘    │
│                                                                     │
└─────────────────┬───────────────────────────────────────────────────┘
                  │
                  │ HTTPS Requests
                  │
                  ▼
┌─────────────────────────────────────────────────────────────────────┐
│                                                                     │
│                      VERCEL CDN/HOSTING                            │
│                   https://your-app.vercel.app                     │
│                                                                     │
│  ┌──────────────────────────────────────────────────────────┐    │
│  │  Static Assets Serving                                   │    │
│  │  • HTML, CSS, JavaScript                                 │    │
│  │  • Images, Fonts                                         │    │
│  │  • SPA Routing (Client-side)                            │    │
│  │  • Global Edge Network                                   │    │
│  │  • Automatic HTTPS                                       │    │
│  └──────────────────────────────────────────────────────────┘    │
│                                                                     │
└─────────────────┬───────────────────────────────────────────────────┘
                  │
                  │ API Calls
                  │ (VITE_API_URL)
                  │
                  ▼
┌─────────────────────────────────────────────────────────────────────┐
│                                                                     │
│                RAILWAY/RENDER BACKEND SERVER                       │
│             https://your-app.railway.app/api/*                    │
│                                                                     │
│  ┌──────────────────────────────────────────────────────────┐    │
│  │  Express.js REST API                                     │    │
│  │                                                           │    │
│  │  Endpoints:                                              │    │
│  │  • POST /api/orders      - Create orders                │    │
│  │  • GET  /api/orders      - Fetch orders                 │    │
│  │  • POST /api/reviews     - Submit reviews               │    │
│  │  • GET  /api/reviews     - Fetch reviews                │    │
│  │  • POST /api/coupons     - Create coupons               │    │
│  │  • GET  /api/coupons     - Fetch coupons                │    │
│  │  • GET  /api/loyalty     - Loyalty points               │    │
│  │  • POST /api/ai-search   - AI product search            │    │
│  │                                                           │    │
│  │  Middleware:                                             │    │
│  │  • CORS (Cross-Origin Resource Sharing)                 │    │
│  │  • JSON Body Parser                                      │    │
│  │  • Error Handling                                        │    │
│  └──────────────────────────────────────────────────────────┘    │
│                                                                     │
│  ┌──────────────────────────────────────────────────────────┐    │
│  │  In-Memory Database                                      │    │
│  │  • Orders Store                                          │    │
│  │  • Reviews Store                                         │    │
│  │  • Coupons Store                                         │    │
│  │  • Loyalty Points                                        │    │
│  │  ⚠️ Data resets on restart                              │    │
│  └──────────────────────────────────────────────────────────┘    │
│                                                                     │
└─────────────────┬───────────────────────────────────────────────────┘
                  │
                  │ API Calls
                  │ (GEMINI_API_KEY)
                  │
                  ▼
┌─────────────────────────────────────────────────────────────────────┐
│                                                                     │
│                    GOOGLE GEMINI AI API                            │
│               https://generativelanguage.googleapis.com           │
│                                                                     │
│  ┌──────────────────────────────────────────────────────────┐    │
│  │  Gemini 3.5 Flash Model                                  │    │
│  │  • Natural Language Understanding                        │    │
│  │  • Product Catalog Matching                              │    │
│  │  • Style Recommendations                                 │    │
│  │  • Fashion Advisory Response                             │    │
│  └──────────────────────────────────────────────────────────┘    │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 🔄 Request Flow Examples

### 1. Loading the Homepage

```
User Browser
    │
    ├─→ GET https://your-app.vercel.app/
    │
    └─→ Vercel CDN
            │
            ├─→ Returns index.html
            ├─→ Returns CSS bundle
            ├─→ Returns JS bundle
            └─→ Returns images
                    │
                    └─→ React App Renders in Browser
```

### 2. Adding Item to Cart (Local Only)

```
User Clicks "Add to Cart"
    │
    └─→ React State Update
            │
            └─→ localStorage.setItem('devine_cart', ...)
                    │
                    └─→ Cart Icon Updates
```

### 3. Placing an Order

```
User Submits Order
    │
    └─→ React Component
            │
            └─→ POST https://your-backend.railway.app/api/orders
                    │
                    └─→ Express.js Route Handler
                            │
                            ├─→ Validate Order Data
                            ├─→ Generate Order ID
                            ├─→ Calculate Loyalty Points
                            ├─→ Store in Memory (dbStore)
                            └─→ Return Order Confirmation
                                    │
                                    └─→ React Updates UI
                                            │
                                            └─→ Shows Success Message
```

### 4. AI Product Search

```
User Types Search Query
    │
    └─→ POST https://your-backend.railway.app/api/ai-search
            │
            └─→ Express.js AI Search Handler
                    │
                    ├─→ Check if GEMINI_API_KEY exists
                    │
                    ├─→ YES: Call Gemini API
                    │       │
                    │       └─→ POST https://generativelanguage.googleapis.com/...
                    │               │
                    │               └─→ Gemini AI Processing
                    │                       │
                    │                       ├─→ Match Products
                    │                       └─→ Generate Style Advice
                    │                               │
                    │                               └─→ Return { matchedIds, reply }
                    │
                    └─→ NO: Fallback Keyword Matching
                            │
                            └─→ Return Matched Products
                                    │
                                    └─→ React Displays Results
```

---

## 🗂️ Component Architecture

### Frontend (React)

```
App.tsx (Main Router)
│
├─ Navbar
│  ├─ Cart Icon (count badge)
│  ├─ Search Button
│  └─ Navigation Links
│
├─ Hero Section
│  ├─ Banner Image
│  └─ CTA Buttons
│
├─ Categories Grid
│  └─ CategoryCard × 7
│
├─ Product Grid
│  └─ ProductCard × N
│      ├─ Image
│      ├─ Title
│      ├─ Price
│      └─ Quick Add Button
│
├─ ProductPage (PDP)
│  ├─ Image Gallery
│  ├─ Product Info
│  ├─ Size/Color Selector
│  ├─ Add to Cart/Buy Now
│  └─ Related Products
│
├─ Cart (Side Panel)
│  ├─ CartItem × N
│  ├─ Subtotal
│  └─ Checkout Button
│
├─ Checkout
│  ├─ Shipping Form
│  ├─ Payment Method
│  └─ Order Summary
│
├─ AISearch (Modal)
│  ├─ Search Input
│  ├─ Voice Search
│  └─ Results Display
│
├─ UserAccount
│  ├─ Order History
│  ├─ Wishlist
│  └─ Loyalty Points
│
└─ AdminDashboard
   ├─ Orders Management
   ├─ Inventory Control
   └─ Coupons Management
```

### Backend (Express.js)

```
server.ts
│
├─ Middleware
│  ├─ CORS Handler
│  ├─ JSON Body Parser
│  └─ Error Handler
│
├─ In-Memory Database
│  ├─ orders[]
│  ├─ reviews[]
│  ├─ coupons[]
│  └─ loyaltyPoints
│
├─ API Routes
│  ├─ /api/orders
│  │  ├─ GET    - Fetch all orders
│  │  ├─ POST   - Create order
│  │  └─ PATCH  - Update status
│  │
│  ├─ /api/reviews
│  │  ├─ GET    - Fetch reviews
│  │  └─ POST   - Create review
│  │
│  ├─ /api/coupons
│  │  ├─ GET    - Fetch coupons
│  │  └─ POST   - Create coupon
│  │
│  ├─ /api/loyalty
│  │  └─ GET    - Fetch loyalty data
│  │
│  └─ /api/ai-search
│     └─ POST   - AI product search
│
└─ Gemini AI Client
   ├─ Lazy Initialization
   ├─ Prompt Engineering
   └─ Fallback Logic
```

---

## 🔐 Security Architecture

```
┌─────────────────────────────────────────┐
│  Security Layers                       │
├─────────────────────────────────────────┤
│                                         │
│  1. HTTPS Everywhere                   │
│     • Vercel auto HTTPS                │
│     • Railway/Render auto HTTPS        │
│                                         │
│  2. CORS Protection                    │
│     • Whitelist origins                │
│     • Block unauthorized domains       │
│                                         │
│  3. Environment Variables              │
│     • API keys not in code             │
│     • Server-side only                 │
│                                         │
│  4. Input Validation                   │
│     • JSON schema validation           │
│     • Type checking                    │
│                                         │
│  5. Rate Limiting (TODO)               │
│     • Prevent API abuse                │
│     • DDoS protection                  │
│                                         │
└─────────────────────────────────────────┘
```

---

## 📊 Data Flow

### Cart Management (Frontend Only)

```
User Action → React State → localStorage → UI Update
(No backend involved)
```

### Order Creation (Full Stack)

```
User Submits
    ↓
Frontend Validation
    ↓
API Call (POST /api/orders)
    ↓
Backend Validation
    ↓
Store in Memory
    ↓
Return Order Confirmation
    ↓
Update React State
    ↓
Clear Cart
    ↓
Show Success Screen
```

---

## 🚀 Deployment Flow

### Continuous Deployment

```
Developer Workflow:
    │
    ├─→ git commit -m "feature"
    │
    └─→ git push origin main
            │
            ├─────────────────────────────────┐
            │                                 │
            ▼                                 ▼
    Vercel Webhook              Railway/Render Webhook
            │                                 │
            ▼                                 ▼
    Build Frontend                    Build Backend
    • npm install                     • npm install
    • npm run build                   • npm run build
            │                                 │
            ▼                                 ▼
    Deploy to CDN                     Deploy Container
    • Global edge nodes               • Start Express server
    • HTTPS enabled                   • Health check
            │                                 │
            ▼                                 ▼
    ✅ Live in ~2 min                 ✅ Live in ~3 min
```

---

## 💾 Data Persistence (Current)

```
┌─────────────────────────────────────────┐
│  In-Memory Storage (Temporary)         │
├─────────────────────────────────────────┤
│                                         │
│  dbStore = {                           │
│    orders: [...],      // Resets       │
│    reviews: [...],     // On restart   │
│    coupons: [...],     // Or deploy    │
│    loyaltyPoints: 350  //              │
│  }                                      │
│                                         │
│  ⚠️ Not suitable for production        │
│  ✅ Good for demo/testing               │
│                                         │
└─────────────────────────────────────────┘
```

### Future: Persistent Database

```
Backend (Railway)
    ↓
MongoDB Atlas / Supabase / PostgreSQL
    ↓
Persistent Storage
    • Orders survive restarts
    • Scalable
    • Backups
```

---

## 📱 Responsive Design Breakpoints

```
Mobile First Approach:

xs: < 640px   (Mobile)
    • Single column
    • Hamburger menu
    • Touch-optimized

sm: 640px+    (Large Mobile / Tablet)
    • 2 columns
    • Expanded navigation

md: 768px+    (Tablet)
    • 3 columns
    • Side cart

lg: 1024px+   (Desktop)
    • 4 columns
    • Full features

xl: 1280px+   (Large Desktop)
    • Wide layouts
    • Max content width
```

---

## 🎨 State Management

```
React State (Local Component State)
    ├─ currentView
    ├─ selectedProduct
    ├─ searchQuery
    └─ UI toggles

React Context (None - Using Props)
    └─ Could add for auth, theme, etc.

Local Storage (Persistent)
    ├─ devine_cart
    ├─ devine_wishlist
    └─ devine_orders

Session Storage (None currently)
    └─ Could add for temp data
```

---

## 🔌 API Integration Points

| Frontend | Backend | External |
|----------|---------|----------|
| React App | Express API | Gemini AI |
| Vercel | Railway | Google Cloud |
| Static | Dynamic | ML Processing |
| Client-side | Server-side | API Service |

---

## 📈 Performance Optimization

```
Frontend (Vercel):
    • Code splitting
    • Tree shaking
    • Image optimization
    • CDN delivery
    • Gzip compression

Backend (Railway):
    • JSON responses
    • Lazy AI client init
    • Fallback logic
    • Error handling
```

---

This architecture provides a solid foundation for a production-ready e-commerce platform with room to scale! 🚀
