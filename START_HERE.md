# START HERE

This folder is the completed ShopSphere CodeAlpha Task 1 implementation based on the supplied reference document.

## First run
1. Install Node.js and MongoDB Atlas/local MongoDB.
2. In `server/`, create `.env` from `.env.example`, then run `npm install` and `npm run seed`.
3. Start backend with `npm run dev`.
4. In `client/`, create `.env` from `.env.example`, run `npm install`, then `npm run dev`.
5. Open the Vite URL shown in the terminal.
6. Register an account, browse products, add items, checkout and open My Orders.

## Important
The archive intentionally does not contain `node_modules/` or real `.env` files. Install dependencies locally and add your own MongoDB/JWT values.

## Acceptance checklist
- Product listing + search/category filter
- Product details
- Registration/login with bcrypt + JWT
- Protected cart with add/update/remove
- Server-side total and stock checks at checkout
- Order creation + cart clearing
- Order history + order detail/confirmation
- MongoDB models and seed data
- API docs + testing matrix + project report
