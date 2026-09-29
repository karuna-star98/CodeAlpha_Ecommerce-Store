# Database Design

MongoDB collections are represented by Mongoose models.

## Users
`_id, name, email, passwordHash, role, createdAt, updatedAt`

Passwords are stored only as bcrypt hashes.

## Products
`_id, name, description, price, imageUrl, category, stock, createdAt, updatedAt`

## Carts
`_id, userId, items[{ productId, quantity }], createdAt, updatedAt`

A cart belongs to one authenticated user.

## Orders
`_id, userId, items[{ productId, name, price, quantity }], totalAmount, status, shippingAddress, createdAt, updatedAt`

Order items deliberately snapshot the purchased product name and price so later catalogue changes do not rewrite historical order data.

## Relationship view
```text
User 1 ───── 1 Cart
  │
  └────────< Orders
                 │
                 └────< OrderItems ────> Product
CartItems ─────────────────────────────> Product
```
