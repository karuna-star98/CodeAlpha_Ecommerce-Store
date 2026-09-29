# ShopSphere API Reference

Base URL: `http://localhost:5000/api`

All request and response bodies use JSON.

## Health
`GET /health`

Response:
```json
{ "ok": true, "message": "ShopSphere API is running" }
```

## Authentication

### Register
`POST /auth/register`
```json
{ "name": "Asha", "email": "asha@example.com", "password": "secret123" }
```

### Login
`POST /auth/login`

Returns a JWT and public user data. Send the token to protected endpoints as:
`Authorization: Bearer <token>`

### Current user
`GET /auth/me` (protected)

## Products
`GET /products`

Optional query parameters: `search`, `category`

`GET /products/:id`

## Cart (protected)
`GET /cart`

`POST /cart/items`
```json
{ "productId": "<mongo-id>", "quantity": 2 }
```

`PATCH /cart/items/:productId`
```json
{ "quantity": 3 }
```

`DELETE /cart/items/:productId`

## Orders (protected)
`POST /orders`
```json
{ "shippingAddress": "12 Main Road, Jalgaon, Maharashtra 425001" }
```

`GET /orders`

`GET /orders/:id`

## Status codes
- `200` successful read/update
- `201` resource created
- `400` invalid input or business rule failure
- `401` missing/invalid authentication
- `404` resource not found
- `409` duplicate registration
- `500` unexpected server/database error
