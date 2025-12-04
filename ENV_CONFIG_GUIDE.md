# Environment Configuration Guide

## 📝 How to Configure the API URL

The frontend uses a centralized configuration system that makes it easy to switch between development and production environments.

### 🔧 Quick Setup

**All you need to do is edit the `.env` file in the root of the frontend project.**

### For Local Development

```env
VITE_API_URL=http://localhost:5001/
```

### For Production

```env
VITE_API_URL=https://your-backend-url.com/
```

---

## 🏗️ How It Works

### 1. Environment File (`.env`)
The `.env` file contains the API URL:
```env
VITE_API_URL=http://localhost:5001/
```

### 2. Config File (`src/config/index.js`)
This file imports the environment variable and exports it for use throughout the app:
```javascript
export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5001/";
```

### 3. API Service (`src/services/api.js`)
All API calls use the centralized `API_URL` from the config file:
```javascript
import { API_URL } from "../config";
```

---

## ✅ Benefits

1. **Single Source of Truth** - Change the URL in one place (`.env`)
2. **Environment Aware** - Different URLs for dev/prod
3. **Fallback Default** - Uses localhost if env var is missing
4. **Easy Deployment** - Just update `.env` on your hosting platform

---

## 🚀 Deployment Steps

### Vercel
1. Go to Project Settings → Environment Variables
2. Add: `VITE_API_URL` = `https://your-backend-url.com/`
3. Redeploy

### Netlify
1. Go to Site Settings → Build & Deploy → Environment
2. Add: `VITE_API_URL` = `https://your-backend-url.com/`
3. Redeploy

### Other Platforms
Add the environment variable through your platform's dashboard and redeploy.

---

## 🧪 Testing Different Environments

### Local Backend
```env
VITE_API_URL=http://localhost:5001/
```

### Staging Backend
```env
VITE_API_URL=https://staging.your-backend.com/
```

### Production Backend
```env
VITE_API_URL=https://api.your-backend.com/
```

---

## ⚠️ Important Notes

1. **Always include trailing slash** - `http://localhost:5001/` (not `http://localhost:5001`)
2. **Use HTTPS in production** - Never use HTTP in production
3. **Don't commit secrets** - The `.env` file is in `.gitignore`
4. **Restart dev server** - After changing `.env`, restart `npm run dev`

---

## 🔍 Troubleshooting

### Issue: API calls fail with CORS error
**Solution:** Make sure your backend URL is correct and the backend has CORS enabled.

### Issue: Getting 404 errors
**Solution:** Check that the URL has a trailing slash: `http://localhost:5001/`

### Issue: Changes to .env not working
**Solution:** Restart the Vite dev server (`npm run dev`)

### Issue: Works locally but not in production
**Solution:** Verify environment variable is set in your hosting platform's dashboard.

---

## 📚 Related Files

- **Environment Config**: `.env`
- **Config Module**: `src/config/index.js`
- **API Service**: `src/services/api.js`
- **All Page Components**: Use the API service automatically

---

## 💡 Example: Switching Environments

**Development:**
```bash
# Edit .env
VITE_API_URL=http://localhost:5001/

# Restart dev server
npm run dev
```

**Production Deploy:**
```bash
# Edit .env (or set in hosting platform)
VITE_API_URL=https://capstone-2-backend-3hno.onrender.com/

# Build and deploy
npm run build
# Deploy dist/ folder
```

---

That's it! Your API URL is now centralized and easy to manage. 🎉
