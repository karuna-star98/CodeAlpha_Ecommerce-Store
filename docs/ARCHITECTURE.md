# Architecture

## End-to-end flow
```text
Customer
   ↓
React Pages + Reusable Components
   ↓
API Service (fetch)
   ↓ HTTP / JSON
Express Router
   ↓
Authentication + Validation Middleware
   ↓
Controller / Business Rules
   ↓
Mongoose Models
   ↓
MongoDB
   ↓
JSON Response
   ↓
React UI State Update
```

## Main modules
Authentication, products, product details, cart, checkout/order processing, order history.

## Frontend
- Pages: Home, ProductDetails, Login, Register, Cart, Checkout, Orders, OrderConfirmation
- Context: AuthContext, CartContext
- Reusable UI: Navbar, Footer, ProductCard, ProtectedRoute, LoadingState, ErrorMessage
- API calls: centralized in `src/services/api.js`

## Backend
- Routes define HTTP endpoints.
- Middleware handles authentication and basic validation.
- Controllers handle application rules.
- Models define MongoDB structure and references.
- Server-side checkout reloads current products, validates stock and calculates the authoritative total.
