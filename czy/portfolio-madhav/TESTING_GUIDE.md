# Testing Guide - JWT Authentication System

## 🧪 Unit Testing Scenarios

### Test 1: User Registration

**Setup:**
- Backend running on http://localhost:5000
- MongoDB connected

**Steps:**
1. Go to `http://localhost:5173/auth`
2. Ensure "Register" tab is active
3. Fill form:
   - Name: `Alice Test`
   - Email: `alice@test.com`
   - Password: `password123`
4. Click "Register"

**Expected Result:**
- ✅ Success message appears
- ✅ Page redirects to login tab automatically
- ✅ User saved in MongoDB

**Verify in MongoDB:**
```bash
mongosh
use portfolio
db.users.find()
```

---

### Test 2: Duplicate Email Registration

**Steps:**
1. Register with `alice@test.com` (from Test 1)
2. Try registering again with same email

**Expected Result:**
- ❌ Error: "User already exists with this email"

---

### Test 3: User Login - Success

**Setup:** User `alice@test.com` already registered (from Test 1)

**Steps:**
1. Go to `http://localhost:5173/auth`
2. Ensure "Login" tab is active
3. Fill form:
   - Email: `alice@test.com`
   - Password: `password123`
4. Click "Login"

**Expected Result:**
- ✅ Success message: "Login successful"
- ✅ Token displayed
- ✅ User info shown (name, email)
- ✅ Two buttons appear: "Verify Token & Access Dashboard" and "Logout"

**Verify in Console:**
```javascript
// Open DevTools (F12) → Console
console.log(localStorage.getItem("userToken"))
// Shows JWT token

console.log(JSON.parse(localStorage.getItem("user")))
// Shows: { id, name, email }
```

---

### Test 4: User Login - Wrong Password

**Steps:**
1. Try login with correct email but wrong password
   - Email: `alice@test.com`
   - Password: `wrongpassword`
2. Click "Login"

**Expected Result:**
- ❌ Error: "Invalid password"

---

### Test 5: User Login - Non-existent Email

**Steps:**
1. Try login with email that doesn't exist
   - Email: `nonexistent@test.com`
   - Password: `password123`
2. Click "Login"

**Expected Result:**
- ❌ Error: "User not found"

---

### Test 6: Token Verification

**Prerequisites:** User logged in (Test 3 completed)

**Steps:**
1. After successful login, user info is displayed
2. Click "Verify Token & Access Dashboard"

**Expected Result:**
- ✅ Success message: "Welcome to your dashboard, [email]!"
- ✅ Token verified successfully

---

### Test 7: Logout

**Prerequisites:** User logged in

**Steps:**
1. User info displayed on page
2. Click "Logout" button

**Expected Result:**
- ✅ localStorage cleared
- ✅ Page shows login form again
- ✅ All token data removed

**Verify:**
```javascript
// DevTools Console
localStorage.getItem("userToken")      // null
localStorage.getItem("user")           // null
```

---

### Test 8: Page Refresh While Logged In

**Prerequisites:** User logged in

**Steps:**
1. After successful login, refresh page (F5)
2. Wait for page reload

**Expected Result:**
- ✅ User info still displayed
- ✅ Token and user data persisted from localStorage
- ✅ No re-login needed

---

### Test 9: Expired/Invalid Token

**Steps:**
1. Log in successfully
2. In DevTools Console, corrupt the token:
   ```javascript
   localStorage.setItem("userToken", "invalid.token.here")
   ```
3. Refresh page
4. Click "Verify Token & Access Dashboard"

**Expected Result:**
- ❌ Error: "Token invalid or expired" OR "Invalid token"

---

### Test 10: Backend Offline

**Steps:**
1. Stop backend server (Ctrl+C in terminal)
2. Try to register or login

**Expected Result:**
- ❌ Error: "Something went wrong! Make sure backend is running on port 5000"

---

## 🔍 Database Verification

### Check Registered Users

```bash
# Start MongoDB shell
mongosh

# Select database
use portfolio

# View all users
db.users.find()

# View specific user
db.users.findOne({ email: "alice@test.com" })

# Count total users
db.users.countDocuments()

# Delete test user (optional)
db.users.deleteOne({ email: "alice@test.com" })
```

### Sample User Document
```json
{
  "_id": ObjectId("60d5ec49c1234567890abcde"),
  "name": "Alice Test",
  "email": "alice@test.com",
  "password": "$2a$10$...hashed_password...",
  "createdAt": ISODate("2024-01-15T10:30:00.000Z")
}
```

---

## 🔐 JWT Token Analysis

### Decode JWT Token

```javascript
// Copy your token from localStorage
const token = localStorage.getItem("userToken");

// Paste in: https://jwt.io (online JWT debugger)
// Or decode manually:

const parts = token.split('.');
const header = JSON.parse(atob(parts[0]));
const payload = JSON.parse(atob(parts[1]));

console.log("Header:", header);
// { "alg": "HS256", "typ": "JWT" }

console.log("Payload:", payload);
// { "id": "...", "email": "alice@test.com", "iat": 1234567890, "exp": 1234571490 }
```

### Token Expiration Check

```javascript
const token = localStorage.getItem("userToken");
const parts = token.split('.');
const payload = JSON.parse(atob(parts[1]));
const expiresAt = new Date(payload.exp * 1000);

console.log("Token expires at:", expiresAt);
console.log("Time remaining:", (expiresAt - new Date()) / 1000, "seconds");
```

---

## 📱 API Testing with Postman/cURL

### Register via cURL

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Bob Test",
    "email": "bob@test.com",
    "password": "password456"
  }'
```

**Expected Response:**
```json
{
  "success": true,
  "message": "User registered successfully!"
}
```

### Login via cURL

```bash
curl -X POST http://localhost:5000/api/auth/user-login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "alice@test.com",
    "password": "password123"
  }'
```

**Expected Response:**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "60d5ec49c1234567890abcde",
    "name": "Alice Test",
    "email": "alice@test.com"
  },
  "message": "Login successful"
}
```

### Verify Token via cURL

```bash
curl -X GET http://localhost:5000/api/auth/verify \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

**Expected Response:**
```json
{
  "valid": true,
  "admin": {
    "id": "60d5ec49c1234567890abcde",
    "email": "alice@test.com"
  }
}
```

---

## ✔️ Test Checklist

- [ ] Test 1: User Registration
- [ ] Test 2: Duplicate Email Registration
- [ ] Test 3: User Login - Success
- [ ] Test 4: User Login - Wrong Password
- [ ] Test 5: User Login - Non-existent Email
- [ ] Test 6: Token Verification
- [ ] Test 7: Logout
- [ ] Test 8: Page Refresh While Logged In
- [ ] Test 9: Expired/Invalid Token
- [ ] Test 10: Backend Offline

---

## 🐛 Debugging Tips

### Check Console Logs

**Frontend (Browser DevTools):**
```javascript
// See all stored data
console.log("Token:", localStorage.getItem("userToken"));
console.log("User:", localStorage.getItem("user"));

// Monitor fetch calls
// Network tab → Click on auth request → view headers and response
```

**Backend (Terminal):**
```
Look for errors:
- "DB connection error"
- "Registration error"
- "Login error"
```

### Network Monitoring

1. Open DevTools (F12)
2. Go to "Network" tab
3. Register/Login
4. Click on the `/api/auth/...` request
5. Check:
   - Status code (201 for registration, 200 for login)
   - Request body (email, password)
   - Response body (token, message)

---

## 🎯 What's Working

✅ User registration with password hashing
✅ User login with JWT token generation
✅ Token storage in localStorage
✅ Token verification endpoint
✅ Error handling for all scenarios
✅ Page persistence on refresh
✅ Logout functionality
✅ Success/error message display

---

## 🚀 Next Features (Optional)

- [ ] Refresh token implementation
- [ ] Email verification
- [ ] Password reset
- [ ] Two-factor authentication (2FA)
- [ ] Social login (Google, GitHub)
- [ ] Rate limiting
- [ ] Account deletion
- [ ] Profile update functionality

---

**Last Updated:** January 2025
**Test Status:** Ready for QA ✅
