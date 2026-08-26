# Production Architecture, Cost & Capacity Guide

**Client**: Sawriya Seth Properties (SS Properties) — Ronak Khatik  
**Target Infrastructure**: Maximum ₹0 Recurring Infrastructure Cost Architecture  

---

## 📊 Infrastructure Stack & Free-Tier Quotas

| Component | Provider | Free Plan Quotas | Client Capacity | Cost |
| :--- | :--- | :--- | :--- | :---: |
| **Domain** | Custom `.in` Domain | N/A (ICANN Registry Fee) | Permanent Brand Address | **~₹499 / year** |
| **Hosting** | Render Free Web Service | 512 MB RAM, 100 GB Bandwidth/mo | 10–100 visitors/day | **₹0 / forever** |
| **Database** | Supabase / Neon PostgreSQL | 500 MB Storage, Daily Backups | 50,000+ listings & leads | **₹0 / forever** |
| **Image CDN** | Cloudinary Free CDN | 25 Credits (~25 GB Bandwidth/mo) | 1,000+ property photos | **₹0 / forever** |
| **SSL** | Render TLS / Let's Encrypt | Unlimited Free SSL Certificates | Auto-renewing HTTPS | **₹0 / forever** |
| **Auth** | Custom JWT + Cookie | Unlimited Local Auth Session | 1 Admin User | **₹0 / forever** |

---

## 🔒 Production Security & Safeguards

1. **Zero Accidental Billing**:
   - Cloudinary Free account does NOT require a credit card on file.
   - Render Free Web Service automatically caps free usage without credit card charges.
   - Supabase Free tier automatically pauses after 7 days of 0 activity (prevented by 1 daily site visit or free UptimeRobot ping).
2. **Data Safety & Redeploy Security**:
   - Property data & customer leads reside permanently in Cloud PostgreSQL.
   - Property images reside permanently in Cloudinary CDN.
   - **`render.yaml` build command updated**: `npm install && npx prisma generate && npx prisma db push && npm run build` (Ensures redeploys NEVER execute `db seed` or reset client data!).

---

## 🛠️ Step-by-Step Go-Live Deployment Checklist

### Step 1: Create Free Accounts (Zero Credit Card Needed)
- **Supabase**: [https://supabase.com](https://supabase.com) (Create new project, copy `DATABASE_URL`).
- **Cloudinary**: [https://cloudinary.com](https://cloudinary.com) (Copy `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`).

### Step 2: Render Environment Variables
Add these keys in Render Web Service Dashboard (`Settings` -> `Environment`):

```env
NODE_ENV=production
DATABASE_URL=postgresql://postgres:[PASSWORD]@db.[PROJECT].supabase.co:5432/postgres
JWT_SECRET=production_random_super_secure_jwt_secret_9511397967
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

### Step 3: Connect Custom Domain
In Render Web Service dashboard, click **Settings** -> **Custom Domains** -> Add `sawriyasethproperties.in` and update CNAME / A-records at your domain registrar.
