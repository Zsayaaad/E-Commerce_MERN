**Overview**
- **Purpose:** MERN e-commerce app with user auth, products, cart, and checkout.
- **Backend:** Express 5 + TypeScript, Mongoose, JWT auth.
- **Frontend:** React + Vite + TypeScript.

**Tech Stack**
- **Server:** Express, Mongoose, JWT, bcrypt, dotenv, ts-node, nodemon.
- **Client:** React, Vite, TypeScript, ESLint.

**Project Structure**
- **Backend:** see [backend/src/index.ts](backend/src/index.ts), routes in [backend/src/routes](backend/src/routes), models in [backend/src/models](backend/src/models), services in [backend/src/services](backend/src/services).
- **Frontend:** Vite React app entry at [frontend/src/main.tsx](frontend/src/main.tsx) and [frontend/src/App.tsx](frontend/src/App.tsx).

**Prerequisites**
- **Node.js:** v18+ recommended.
- **MongoDB:** connection string (Atlas or local).

**Setup**
- **Install deps (both apps):**

```bash
cd backend
npm install

cd ../frontend
npm install
```

- **Environment (backend):** create a `.env` file in `backend/` with:

```bash
DATABASE_URL=mongodb+srv://<user>:<pass>@<cluster>/<db>?retryWrites=true&w=majority
JWT_SECRET=replace-with-a-strong-secret
```

**Running**
- **Backend (dev):** uses nodemon to run ts-node with entry [backend/src/index.ts](backend/src/index.ts). Default port is 5000.

```bash
cd backend
npm run dev
```

- **Frontend (dev):** Vite dev server.

```bash
cd frontend
npm run dev
```

**API Overview**
- **Base URL:** `http://localhost:5000`
- **Routes registered:** see [backend/src/index.ts](backend/src/index.ts#L20-L33)
	- `/user` → [backend/src/routes/userRoute.ts](backend/src/routes/userRoute.ts)
	- `/products` → [backend/src/routes/productsRoute.ts](backend/src/routes/productsRoute.ts)
	- `/cart` → [backend/src/routes/cartRoute.ts](backend/src/routes/cartRoute.ts)

- **Auth & Tokens:**
	- JWT generated in [backend/src/auth/jwt.ts](backend/src/auth/jwt.ts). Requires `JWT_SECRET`.
	- Protected routes use `Authorization: Bearer <token>` header via [backend/src/middlewares/auth.middleware.ts](backend/src/middlewares/auth.middleware.ts).

- **Users** ([backend/src/routes/userRoute.ts](backend/src/routes/userRoute.ts))
	- POST `/user/register` → body `{ firstName, lastName, email, password }` returns JWT.
	- POST `/user/login` → body `{ email, password }` returns JWT.

- **Products** ([backend/src/routes/productsRoute.ts](backend/src/routes/productsRoute.ts))
	- GET `/products/` → returns all products.
	- Seeds initial products on startup via [backend/src/services/products/productServices.ts](backend/src/services/products/productServices.ts#L1-L34).

- **Cart** ([backend/src/routes/cartRoute.ts](backend/src/routes/cartRoute.ts))
	- GET `/cart/` → get active cart for current user.
	- POST `/cart/items` → body `{ productId, quantity }` add item.
	- PUT `/cart/items` → body `{ productId, quantity }` update quantity.
	- DELETE `/cart/items/:productId` → remove item.
	- DELETE `/cart/` → clear all items.
	- POST `/cart/checkout` → body `{ address }` creates order from cart.

**Data Models**
- **User:** [backend/src/models/userModel.ts](backend/src/models/userModel.ts)
	- Fields: `firstName`, `lastName`, `email`, `password` (hashed with bcrypt).
- **Product:** [backend/src/models/productModel.ts](backend/src/models/productModel.ts)
	- Fields: `title`, `imageUrl`, `price`, `stock`.
- **Cart:** [backend/src/models/cartModel.ts](backend/src/models/cartModel.ts)
	- Fields: `userId`, `items[{ product, quantity, unitPrice }]`, `status`, `totalAmount`.
- **Order:** [backend/src/models/orderModel.ts](backend/src/models/orderModel.ts)
	- Fields: `userId`, `orderItems[{ productTitle, productQuantity, productPrice, productImage }]`, `total`, `address`.

**Auth Details**
- JWT helpers: [backend/src/auth/jwt.ts](backend/src/auth/jwt.ts) (`generateJWT`, `verifyToken`).
- Middleware attaches decoded token to `req.user`: [backend/src/types/extendedRequest.ts](backend/src/types/extendedRequest.ts) and [backend/src/middlewares/auth.middleware.ts](backend/src/middlewares/auth.middleware.ts).

**Quick API Examples**

```bash
# Register
curl -X POST http://localhost:5000/user/register \
	-H "Content-Type: application/json" \
	-d '{"firstName":"John","lastName":"Doe","email":"john@example.com","password":"secret"}'

# Login (get JWT)
curl -X POST http://localhost:5000/user/login \
	-H "Content-Type: application/json" \
	-d '{"email":"john@example.com","password":"secret"}'

# List products
curl http://localhost:5000/products/

# Add to cart (requires Bearer token)
curl -X POST http://localhost:5000/cart/items \
	-H "Authorization: Bearer <JWT>" \
	-H "Content-Type: application/json" \
	-d '{"productId":"<PRODUCT_ID>","quantity":2}'

# Checkout
curl -X POST http://localhost:5000/cart/checkout \
	-H "Authorization: Bearer <JWT>" \
	-H "Content-Type: application/json" \
	-d '{"address":"123 Main St"}'
```

**Scripts**
- **Backend:** [backend/package.json](backend/package.json)
	- `dev`: runs nodemon ([backend/nodemon.json](backend/nodemon.json)) → `ts-node ./src/index.ts`.
- **Frontend:** [frontend/package.json](frontend/package.json)
	- `dev`: Vite dev server.
	- `build`: TypeScript build then Vite build.
	- `preview`: Vite preview.
	- `lint`: ESLint.

**Notes**
- Default backend port is 5000; update in [backend/src/index.ts](backend/src/index.ts#L13-L16) if needed.
- Ensure `DATABASE_URL` and `JWT_SECRET` are set before running backend.
