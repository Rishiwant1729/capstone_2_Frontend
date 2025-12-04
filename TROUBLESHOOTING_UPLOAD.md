# 🔧 Troubleshooting "Route Not Found" Error

## Current Status

✅ **Backend:** Running on http://localhost:5001  
✅ **Frontend:** Running on http://localhost:5173  
✅ **API URL:** Configured as `http://localhost:5001/`  
✅ **Upload Route:** `/api/books/upload` exists and working  

---

## Common Issues & Solutions

### 1. **Missing Authentication Token**

**Error:** `Missing or invalid token`  
**Cause:** You're not logged in or token expired  

**Solution:**
1. Go to http://localhost:5173
2. Click "Login" (or "Sign Up" if you don't have an account)
3. Enter credentials
4. After login, try uploading again

---

### 2. **CORS Issues**

**Error:** `CORS policy` or `blocked by CORS`  
**Cause:** Backend not allowing frontend origin  

**Solution:** Already configured in `app.js`:
```javascript
app.use(cors()); // Allows all origins
```

---

### 3. **Wrong API URL**

**Error:** `Route not found` or `Failed to fetch`  
**Cause:** Frontend calling wrong URL  

**Check:**
```javascript
// Open browser console (F12) and run:
console.log(import.meta.env.VITE_API_URL);
// Should show: http://localhost:5001/
```

**Fix:** Restart frontend server if .env was changed:
```bash
# Stop frontend (Ctrl+C)
cd capstone_2_Frontend-rishi
npm run dev
```

---

### 4. **File Too Large**

**Error:** `Request Entity Too Large`  
**Cause:** PDF file exceeds 15MB limit  

**Solution:** Use a smaller PDF file (< 15MB)

---

### 5. **Invalid PDF File**

**Error:** `Invalid PDF file`  
**Cause:** File is not a valid PDF or is corrupted  

**Solution:** Try a different PDF file

---

## Debug Steps

### Step 1: Check Browser Console
1. Open http://localhost:5173
2. Press `F12` to open DevTools
3. Go to "Console" tab
4. Try uploading - check for errors

### Step 2: Check Network Tab
1. In DevTools, go to "Network" tab
2. Try uploading
3. Look for the request to `/api/books/upload`
4. Check:
   - **Status Code:** Should be 200 (success) or 401 (unauthorized)
   - **Request URL:** Should be `http://localhost:5001/api/books/upload`
   - **Headers:** Should include `Authorization: Bearer <token>`

### Step 3: Verify Authentication
```javascript
// In browser console:
localStorage.getItem('token')
// Should return a JWT token like: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

If null, you need to login first.

### Step 4: Test Backend Directly
```bash
# In terminal:
curl -X GET http://localhost:5001/health
# Should return: {"status":"ok"}
```

---

## Testing the Upload Flow

### 1. Create Account
```
Navigate to: http://localhost:5173
Click: "Sign Up"
Fill:
  - Email: test@example.com
  - Password: test1234
  - Name: Test User
Submit
```

### 2. Login
```
Click: "Login"
Enter credentials
You should be redirected to dashboard
```

### 3. Upload a Book
```
Click: "Upload Book" or navigate to /upload
Fill:
  - Title: Test Book
  - Author: Test Author
  - Description: A test book
  - PDF: Select a PDF file
Click: "Upload Book"
```

### 4. Watch Console Logs

**Backend Terminal:**
```
📚 Book upload request: { title: 'Test Book', author: 'Test Author', hasFile: true }
🔍 Starting PDF text extraction...
✅ Text extracted successfully: 5234 characters
🤖 Generating AI summary with Gemini...
✅ AI summary generated successfully
```

**Frontend Browser Console:**
```
POST http://localhost:5001/api/books/upload 200 OK
```

---

## Expected Response

### Success (200)
```json
{
  "book": {
    "id": 1,
    "title": "Test Book",
    "author": "Test Author",
    "description": "A test book",
    "status": "completed",
    "pdfPath": "src/uploads/pdf-1733317200000.pdf"
  },
  "summary": {
    "id": 1,
    "content": "AI-generated summary...",
    "highlights": "Preview text..."
  },
  "message": "Book uploaded and processed successfully"
}
```

### Unauthorized (401)
```json
{
  "error": "Missing or invalid token"
}
```

**Fix:** Login first

### Not Found (404)
```json
{
  "error": "Route not found"
}
```

**Fix:** Check if backend is running and API URL is correct

---

## Quick Checklist

Before uploading, verify:

- [ ] Backend running: `lsof -i :5001` shows node process
- [ ] Frontend running: `lsof -i :5173` shows node process  
- [ ] Logged in: `localStorage.getItem('token')` returns a token
- [ ] .env file has: `VITE_API_URL=http://localhost:5001/`
- [ ] PDF file is valid and < 15MB

---

## Still Not Working?

### Check the exact error in browser console:

1. **"Failed to fetch"**
   - Backend is not running
   - Wrong API URL
   - Network issue

2. **"Missing or invalid token"**
   - Not logged in
   - Token expired (login again)

3. **"Route not found"**
   - Backend not running
   - Wrong API URL in .env
   - Frontend not restarted after .env change

4. **"Invalid PDF file"**
   - File is corrupted
   - File is not a PDF
   - Try a different file

---

## Contact Points

### Check Backend Logs
```bash
# Terminal where backend is running
# Look for errors or stack traces
```

### Check Frontend Network Requests
```
Browser DevTools → Network Tab → Filter: XHR
Look at the failed request details
```

---

## Most Likely Issue

**You're not logged in!**

The upload route requires authentication. If you see "Route not found", it's likely because:
1. You're not logged in (no token)
2. The request is being blocked before reaching the route

**Solution:** 
1. Go to http://localhost:5173
2. Login with your credentials
3. Try uploading again

---

## Test Without Frontend

```bash
# 1. Login and get token
curl -X POST http://localhost:5001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test1234"}'

# Response will have: {"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."}

# 2. Upload with token
curl -X POST http://localhost:5001/api/books/upload \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -F "title=Test Book" \
  -F "author=Test Author" \
  -F "pdf=@/path/to/your/test.pdf"
```

This will help isolate if the issue is frontend or backend.

---

## Summary

The most common cause of "Route not found" when uploading is:
1. **Not being logged in** (missing auth token)
2. **Wrong API URL** (check .env and restart frontend)
3. **Backend not running** (check port 5001)

Follow the debug steps above to identify and fix the issue! 🚀
