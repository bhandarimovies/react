# Quick Start Guide

## ⚡ 3-Minute Setup

### Prerequisites
- Node.js installed
- MongoDB running (`mongod`)
- Ports 5000 (backend) and 5173 (frontend) available

---

## Step 1: Backend Setup (2 minutes)

```bash
# Navigate to backend
cd portfolio\portfolio-backend

# Check dependencies are installed
npm install

# Create/Update .env file
# PORT=5000
# MONGO_URI=mongodb://localhost:27017/portfolio
# JWT_SECRET=your_secret_key_here

# Start server
npm run dev
```

**Expected:** "Server running on port 5000" ✅

---

## Step 2: Frontend Setup (1 minute)

```bash
# In another terminal, navigate to frontend
cd portfolio

# Install dependencies (if needed)
npm install

# Start frontend
npm run dev
```

**Expected:** "Local: http://localhost:5173" ✅

---

## Step 3: Test the App

1. Open browser → `http://localhost:5173/auth`
2. Click "Register" tab
3. Fill in details:
   - Name: `Test User`
   - Email: `test@example.com`
   - Password: `password123`
4. Click "Register"
5. You'll see success message
6. Switch to "Login" tab
7. Enter same email/password
8. Click "Login"
9. See "Welcome" message with token
10. Click "Verify Token & Access Dashboard" button

---

## 📌 Common Commands

```bash
# Backend
cd portfolio-backend
npm run dev          # Development (with auto-reload)
npm start           # Production

# Frontend
cd portfolio
npm run dev         # Development

# Database
mongod              # Start MongoDB (in separate terminal)
```

---

## 🔗 Endpoints

| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/api/auth/register` | Create new user |
| POST | `/api/auth/user-login` | User login |
| GET | `/api/auth/verify` | Check token validity |

---

## 💡 Tips

- Token stored in `localStorage` (persists on refresh)
- Logout clears localStorage
- Token expires in 7 days
- Password is hashed (not stored plain text)
- All endpoints require `Content-Type: application/json`

---

## ❌ Issues?

| Problem | Solution |
|---------|----------|
| "Connection refused" | Start backend: `npm run dev` |
| "MongoDB error" | Start MongoDB: `mongod` |
| "Port already in use" | Change PORT in .env |
| "CORS error" | Backend must be running on 5000 |

---

## 📂 Files Created/Modified

✅ **Created:**
- `src/pages/AuthPage.jsx` - Login/Registration component
- `portfolio-backend/models/User.js` - User database schema

✅ **Modified:**
- `portfolio-backend/routes/authRoutes.js` - Added user endpoints

---

## 🎯 What to Do Next

1. Test registration & login
2. Check MongoDB for saved users: `mongosh` → `use portfolio` → `db.users.find()`
3. Try token verification
4. Integrate AuthPage into your App.jsx
5. Create protected routes using the token

---

**Status:** Ready to test! 🚀
