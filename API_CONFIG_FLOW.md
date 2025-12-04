# 🔄 API URL Configuration Flow

## Visual Overview

```
┌─────────────────────────────────────────────────────────────┐
│                         .env FILE                           │
│  ┌───────────────────────────────────────────────────────┐  │
│  │  VITE_API_URL=http://localhost:5001/                  │  │
│  └───────────────────────────────────────────────────────┘  │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                  src/config/index.js                        │
│  ┌───────────────────────────────────────────────────────┐  │
│  │  export const API_URL =                               │  │
│  │    import.meta.env.VITE_API_URL ||                    │  │
│  │    "http://localhost:5001/";                          │  │
│  └───────────────────────────────────────────────────────┘  │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                  src/services/api.js                        │
│  ┌───────────────────────────────────────────────────────┐  │
│  │  import { API_URL } from "../config";                 │  │
│  │                                                        │  │
│  │  // All API functions use API_URL                     │  │
│  │  - signup(userData)                                   │  │
│  │  - login(credentials)                                 │  │
│  │  - getProfile()                                       │  │
│  │  - uploadBook(formData)                               │  │
│  │  - getBooks()                                         │  │
│  │  - getBookSummary(bookId)                             │  │
│  │  - deleteBook(bookId)                                 │  │
│  └───────────────────────────────────────────────────────┘  │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                    ALL PAGE COMPONENTS                      │
│  ┌───────────────────────────────────────────────────────┐  │
│  │  import { signup, login, ... } from "../services/api" │  │
│  │                                                        │  │
│  │  - Login.jsx                                          │  │
│  │  - Signup.jsx                                         │  │
│  │  - BooksList.jsx                                      │  │
│  │  - Upload.jsx                                         │  │
│  │  - BookDetails.jsx                                    │  │
│  │  - Profile.jsx                                        │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

## 🎯 Single Point of Change

To change the API URL, you only need to edit **ONE FILE**:

```
.env
```

Change this:
```env
VITE_API_URL=http://localhost:5001/
```

To this (for production):
```env
VITE_API_URL=https://your-backend-url.com/
```

**That's it!** All pages and API calls will automatically use the new URL.

---

## 📋 File Responsibilities

| File | Purpose | Edit Required? |
|------|---------|----------------|
| `.env` | Store environment variables | ✅ **YES** - Edit this to change API URL |
| `src/config/index.js` | Import and export config | ❌ No - Leave as is |
| `src/services/api.js` | API functions | ❌ No - Leave as is |
| `src/pages/*.jsx` | UI components | ❌ No - Leave as is |

---

## 🔍 How It Works

### Step 1: Environment Variable (`.env`)
Vite automatically loads variables from `.env` file that start with `VITE_`

### Step 2: Config Module (`src/config/index.js`)
- Imports the environment variable using `import.meta.env.VITE_API_URL`
- Provides a fallback default value
- Exports it for use across the app

### Step 3: API Service (`src/services/api.js`)
- Imports `API_URL` from config
- Uses it in all fetch calls
- Prepends it to all endpoint paths

### Step 4: Pages
- Import API functions
- Call them without worrying about URLs
- URLs are handled automatically

---

## 🚀 Example API Call Flow

When you call `getBooks()` from a component:

```javascript
// In BooksList.jsx
import { getBooks } from "../services/api";

const books = await getBooks();
```

Behind the scenes:
```javascript
// api.js uses API_URL from config
const response = await fetch(`${API_URL}api/books`, {
  headers: getAuthHeaders(),
});

// Actual URL called:
// http://localhost:5001/api/books (in development)
// or
// https://your-backend.com/api/books (in production)
```

---

## ✅ Verification

To verify it's working correctly:

1. **Check the .env file:**
   ```bash
   cat .env
   # Should show: VITE_API_URL=http://localhost:5001/
   ```

2. **Check browser Network tab:**
   - Open DevTools → Network
   - Look at API calls
   - URL should match your `.env` setting

3. **Test switching environments:**
   - Edit `.env` to use production URL
   - Restart dev server: `npm run dev`
   - API calls should now go to production

---

## 💡 Benefits of This Approach

✅ **Single source of truth** - One file to rule them all  
✅ **Environment-aware** - Different configs for dev/staging/prod  
✅ **Type-safe** - Centralized config reduces typos  
✅ **Easy deployment** - Just set env var in hosting platform  
✅ **Clean code** - No hardcoded URLs in components  
✅ **Flexible** - Easy to add more config values later  

---

## 🎓 Best Practices

1. **Always use the config module** - Never hardcode URLs
2. **Keep .env in .gitignore** - Don't commit secrets
3. **Provide .env.example** - Help others set up the project
4. **Document changes** - Update this file if you add new config
5. **Restart after changes** - Vite needs restart to pick up .env changes

---

This centralized approach makes your frontend configuration clean, maintainable, and production-ready! 🎉
