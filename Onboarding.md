# Onboarding Guide

## Project Summary

This is a full-stack **E-Commerce Application** that supports two user roles — **Sellers** and **Customers**.

- **Sellers** can list, view, and update products; manage orders and their statuses; add account/payment details; and apply discounts.
- **Customers** can browse products, add items to a cart, place orders, and view their order history.

The application follows a standard client-server architecture with a REST API backend and a single-page application frontend.

---

## Tech Stack

### Backend
| Technology | Purpose |
|---|---|
| **Node.js** | JavaScript runtime |
| **Express 5** | Web framework / REST API |
| **MongoDB** (Atlas) | NoSQL database |
| **Mongoose 9** | MongoDB ODM for data modeling |
| **bcrypt** | Password hashing |
| **jsonwebtoken (JWT)** | Authentication & authorization |
| **nodemon** | Auto-restart server during development |

### Frontend
| Technology | Purpose |
|---|---|
| **React 19** | UI library |
| **Vite 7** | Build tool & dev server |
| **React Router DOM 7** | Client-side routing |
| **Bootstrap 5 / React-Bootstrap** | UI components & styling |
| **ESLint** | Code linting |

### Database Models
- **User** — name, email, password, userType, phone, createdAt
- **Product** — name, description, productImage, price, discount, discountValidFrom/To, sellerId, inventoryQuantity, createdAt
- **Order** — productList, amount, status (PENDING → INPROGRESS → DISPATCHED → DELIVERED), customerId, sellerId
- **Account** — sellerId, accountNumber, IFSCCode, UPIId, qrCodeImage, balance

---

## Prerequisites

- **Node.js** (v18 or later) — [https://nodejs.org](https://nodejs.org)
- **npm** (comes with Node.js)
- **Git**
- A **MongoDB Atlas** connection string (or a local MongoDB instance)

---

## Setup Instructions

### 1. Clone the Repository

```bash
git clone <repository-url>
cd project
```

### 2. Backend Setup

```bash
cd backend
npm install
```

**Configure the database connection:**

Open `db.js` and replace the connection string with your own MongoDB Atlas URI (or set it via an environment variable for better security).

**Start the backend server:**

```bash
npx nodemon app.js
```

The API will be available at **http://localhost:5000**.

### 3. Frontend Setup

Open a new terminal:

```bash
cd frontend
npm install
```

**Start the development server:**

```bash
npm run dev
```

The frontend will be available at **http://localhost:5173** (default Vite port).

---

## API Routes

| Prefix | Description |
|---|---|
| `/auth` | Register, Login, Profile |
| `/products` | CRUD operations for products |
| `/orders` | Create & view orders |

---

## Project Structure

```
project/
├── backend/
│   ├── app.js              # Express app entry point (port 5000)
│   ├── db.js               # MongoDB connection
│   ├── authMiddleware.js   # JWT authentication middleware
│   ├── models/             # Mongoose schemas (User, Product, Order, Account)
│   └── routes/             # Route handlers (auth, product, order)
├── frontend/
│   ├── src/
│   │   ├── App.jsx         # Root component with routes
│   │   ├── main.jsx        # React entry point
│   │   └── components/     # Login, Register, Product, Cart
│   ├── index.html          # HTML shell
│   └── vite.config.js      # Vite configuration
├── Requirement.md          # Feature requirements & DB schema
└── Onboarding.md           # This file
```
