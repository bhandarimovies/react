# JWT Authentication System - Complete Setup Guide

## 📋 Project Structure

```
portfolio/
├── src/
│   ├── pages/
│   │   ├── AuthPage.jsx          (NEW - Login/Registration component)
│   │   ├── AdminDashboard.jsx
│   │   └── ...
│   └── ...
└── portfolio-backend/
    ├── models/
    │   ├── User.js              (NEW - User model)
    │   ├── Admin.js
    │   └── ...
    ├── routes/
    │   ├── authRoutes.js        (UPDATED - Added user registration/login)
    │   └── ...
    ├── server.js
    └── package.json
```

## 🔧 Backend Setup

### 1. Install Dependencies

Navigate to the backend folder:

```bash
cd portfolio-backend
npm install
```

**Dependencies Already Installed:**
- ✅ express
- ✅ mongoose
- ✅ bcryptjs (for password hashing)
- ✅ jsonwebtoken (for JWT tokens)
- ✅ cors
- ✅ dotenv

### 2. Environment Configuration

Create or update `.env` file in `portfolio-backend/`:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/portfolio
JWT_SECRET=your_secret_key_change_this_in_production
NODE_ENV=development
```

### 3. MongoDB Setup

**Option A: Local MongoDB**

```bash
# Windows - Install MongoDB Community Edition
# Then start the MongoDB service:
mongod
```

**Option B: MongoDB Atlas (Cloud)**

1. Visit https://www.mongodb.com/cloud/atlas
2. Create a free cluster
3. Replace `MONGO_URI` in `.env` with your connection string

### 4. Start Backend Server

```bash
# Development mode (with nodemon - auto-reload)
npm run dev

# OR production mode
npm start
```

Expected output:
```
MongoDB Connected ✅
Server running on port 5000
```

---

## 🎨 Frontend Setup

### 1. Install Dependencies

Navigate to the frontend folder:

```bash
cd portfolio
npm install
```

### 2. Add AuthPage to App.jsx

Update your [App.jsx](../src/App.jsx) to include the AuthPage route:

```jsx
import AuthPage from "./pages/AuthPage";

// In your Routes component:
<Route path="/auth" element={<AuthPage />} />
```

### 3. Start Frontend Server

```bash
npm run dev
```

Expected output:
```
Local:   http://localhost:5173
```

---

## 🚀 Running the Complete System

### Step 1: Start MongoDB
```bash
mongod
```

### Step 2: Start Backend (in portfolio-backend folder)
```bash
npm run dev
# Server runs on http://localhost:5000
```

### Step 3: Start Frontend (in portfolio folder)
```bash
npm run dev
# App runs on http://localhost:5173 (or another port)
```

### Step 4: Access the Application

1. Open your browser
2. Navigate to `http://localhost:5173/auth`
3. You'll see the login/registration page

---

## 📝 API Endpoints

### Authentication Routes (Base: `/api/auth`)

#### 1. **Register a New User**
```
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123"
}

Response:
{
  "success": true,
  "message": "User registered successfully!"
}
```

#### 2. **User Login**
```
POST /api/auth/user-login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securePassword123"
}

Response:
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "64f5a2b1c8d9e1f2a3b4c5d6",
    "name": "John Doe",
    "email": "john@example.com"
  },
  "message": "Login successful"
}
```

#### 3. **Verify Token (Protected Route)**
```
GET /api/auth/verify
Authorization: Bearer <token>

Response:
{
  "valid": true,
  "admin": {
    "id": "64f5a2b1c8d9e1f2a3b4c5d6",
    "email": "john@example.com"
  }
}
```

---

## 🔐 Understanding JWT Authentication

### What is JWT?

JWT (JSON Web Token) is a compact, URL-safe token format for securely transmitting information between parties.

**Structure:** `header.payload.signature`

Example:
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyMzQ1Njc4OTAiLCJuYW1lIjoiSm9obiBEb2UifQ.dozjgNryP4J3jVmNHl0w5N_XgL0n3I9PlFUP0THsR8U
```

### JWT Components:

1. **Header**: Algorithm info (HS256)
   ```json
   { "alg": "HS256", "typ": "JWT" }
   ```

2. **Payload**: User data/claims
   ```json
   { "id": "user_id", "email": "user@example.com", "iat": 1234567890 }
   ```

3. **Signature**: Verification hash
   ```
   HMACSHA256(header.payload, "your_secret_key")
   ```

### How It Works:

```
1. User registers → Password hashed & stored in MongoDB
2. User logs in → Server verifies credentials
3. Server issues JWT token (expires in 7 days)
4. Frontend stores token in localStorage
5. For protected routes → Frontend sends: Authorization: Bearer <token>
6. Backend verifies token signature and expiration
```

---

## 💾 Frontend Features (AuthPage.jsx)

### State Management:
- `formType`: Toggle between "login" and "register"
- `formData`: User input (name, email, password)
- `token`: JWT token from server
- `user`: Logged-in user info
- `loading`: Submission state
- `error` / `success`: Messages

### Key Functions:

1. **handleChange()** - Updates form inputs
2. **handleSubmit()** - Sends login/register request
3. **handleLogout()** - Clears localStorage and resets state
4. **accessDashboard()** - Verifies token validity

### Data Persistence:
- Token stored in `localStorage.userToken`
- User info stored in `localStorage.user`
- Persists across page refreshes

---

## 🛡️ Security Best Practices

### Current Implementation:
✅ Passwords hashed with bcryptjs (salt: 10)
✅ JWT tokens signed with secret key
✅ CORS enabled for frontend-backend communication
✅ Password-protected routes

### Production Recommendations:
1. Move `JWT_SECRET` to environment variable (already in .env)
2. Use HTTPS for all requests
3. Implement refresh tokens (optional)
4. Add rate limiting to prevent brute force
5. Add email verification for new registrations
6. Implement token rotation
7. Add 2FA (Two-Factor Authentication)

---

## 🐛 Troubleshooting

### "Connection refused on port 5000"
- Make sure backend is running: `npm run dev` in portfolio-backend folder

### "MongoDB connection error"
- Ensure MongoDB service is running: `mongod`
- Check `MONGO_URI` in `.env`

### "Cannot POST /api/auth/register"
- Verify backend routes are imported in server.js
- Check CORS is enabled

### "Token invalid or expired"
- Token expires in 7 days
- User needs to login again
- Check JWT_SECRET matches between server and verification

### "localhost:3000" vs "localhost:5000"
- Backend runs on port **5000** (default)
- Frontend runs on port **5173** (Vite default)
- AuthPage.jsx already configured for these ports

---

## 📚 Database Schema

### User Model (MongoDB)
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  password: String (hashed),
  createdAt: Date (default: now)
}
```

### Sample User Document
```json
{
  "_id": { "$oid": "64f5a2b1c8d9e1f2a3b4c5d6" },
  "name": "John Doe",
  "email": "john@example.com",
  "password": "$2a$10$abcdef123456789...",
  "createdAt": { "$date": "2024-01-15T10:30:00.000Z" }
}
```

---

## ✨ Next Steps

1. ✅ Test registration with a new user
2. ✅ Test login and token generation
3. ✅ Verify token works for protected routes
4. ✅ Store token in localStorage
5. 🔄 Optional: Create protected dashboard route
6. 🔄 Optional: Add email verification
7. 🔄 Optional: Implement refresh token logic

---

## 🔗 Related Files

- Backend: [`portfolio-backend/routes/authRoutes.js`](./routes/authRoutes.js)
- Backend: [`portfolio-backend/models/User.js`](./models/User.js)
- Frontend: [`src/pages/AuthPage.jsx`](../src/pages/AuthPage.jsx)
- Backend: [`portfolio-backend/server.js`](./server.js)

---

**Last Updated:** January 2025
**Status:** Ready for Testing ✅
