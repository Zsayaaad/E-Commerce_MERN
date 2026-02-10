# E-commerce MERN

Full-stack e-commerce app with an Express + MongoDB API and a React + Vite frontend.

## Tech stack

- Backend: Node.js, Express, MongoDB (Mongoose), TypeScript
- Frontend: React, Vite, TypeScript, MUI
- Auth: JWT

## Features

- User authentication
- Product catalog
- Cart management
- Orders workflow

## Project structure

```
backend/   # Express API
frontend/  # React app
```

## Prerequisites

- Node.js 18+ (recommended)
- MongoDB connection string

## Environment variables

Create a backend env file based on the example:

```
backend/.env
```

Required keys:

```
JWT_SECRET=your_secret
DATABASE_URL=mongodb+srv://...
```

## Install

```
cd backend
npm install

cd ../frontend
npm install
```

## Run locally

Start the API:

```
cd backend
npm run dev
```

Start the frontend:

```
cd frontend
npm run dev
```

The API runs on `http://localhost:5000` and seeds initial products on startup.

## Scripts

Backend:

- `npm run dev` - run API with nodemon

Frontend:

- `npm run dev` - run Vite dev server
- `npm run build` - build for production
- `npm run preview` - preview production build
- `npm run lint` - run ESLint

## Notes

- The API enables CORS for local frontend development.
- Initial products are seeded on server start if none exist.

## License

ISC
