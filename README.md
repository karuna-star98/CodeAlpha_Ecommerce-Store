# ShopSphere - CodeAlpha Task 1

A beginner-friendly full-stack e-commerce store built for the CodeAlpha Full Stack Development internship. The implementation follows the supplied reference: product catalogue, product details, registration/login, persistent cart, checkout/order processing, order history, MongoDB persistence, API testing, documentation and deployment readiness.

## Stack
- Frontend: React + JavaScript + CSS + React Router
- Backend: Node.js + Express.js
- Database: MongoDB + Mongoose
- Auth: bcrypt + JWT
- API: REST + JSON

## Core user journey
Home → Product Details → Add to Cart → Login/Register → Cart → Checkout → Order Confirmation → My Orders

## Project structure
```text
ShopSphere_CodeAlpha_Task1/
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── styles.css
│   ├── .env.example
│   ├── index.html
│   └── package.json
├── server/
│   ├── config/db.js
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── seed/seed.js
│   ├── server.js
│   ├── .env.example
│   └── package.json
├── docs/
│   ├── API.md
│   ├── DATABASE.md
│   ├── TESTING.md
│   └── ARCHITECTURE.md
├── screenshots/
└── .gitignore
```

## 1. Prerequisites
Install Node.js, Git, VS Code and either MongoDB locally or a MongoDB Atlas database.

## 2. Backend setup
```bash
cd server
npm install
copy .env.example .env
```

Fill `.env`:
```env
PORT=5000
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>/<database>?retryWrites=true&w=majority
JWT_SECRET=replace_with_a_long_random_secret
CLIENT_URL=http://localhost:5173
```

Seed demo products:
```bash
npm run seed
```

Start the API:
```bash
npm run dev
```

Verify:
`http://localhost:5000/api/health`

## 3. Frontend setup
Open another terminal:
```bash
cd client
npm install
copy .env.example .env
npm run dev
```

Default client API URL:
`http://localhost:5000/api`

## Demo account
The seed script only creates products. Register a new account through the UI, then use that account to test cart and orders.

## API overview
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`
- `GET /api/products`
- `GET /api/products/:id`
- `GET /api/cart`
- `POST /api/cart/items`
- `PATCH /api/cart/items/:productId`
- `DELETE /api/cart/items/:productId`
- `POST /api/orders`
- `GET /api/orders`
- `GET /api/orders/:id`

See `docs/API.md` for request/response examples.

## Security notes
Passwords are hashed with bcrypt. JWT secrets and MongoDB credentials stay in `.env`, which is ignored by Git. The backend recalculates order totals from database product prices and rechecks stock during checkout rather than trusting browser totals.

## Testing
Use the browser for the end-to-end flow and Postman for the REST API. A manual test matrix is included in `docs/TESTING.md`.

## GitHub commit progression
Recommended commits:
1. `Initial project setup with React and Express`
2. `Connect MongoDB and add database configuration`
3. `Add product model, seed data and product API`
4. `Build product listing and product details pages`
5. `Implement registration, login and JWT middleware`
6. `Implement authenticated cart operations`
7. `Add checkout and order processing`
8. `Add validation and error handling`
9. `Add API testing and responsive polish`
10. `Complete README and documentation`

## Future improvements
Admin dashboard, online payments, inventory management, order-status management, image upload, email notifications, advanced search and production monitoring.
