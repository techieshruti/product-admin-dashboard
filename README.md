# Product Admin Dashboard

A responsive Product Admin Dashboard built with Next.js, React, Tailwind CSS, Axios, and DummyJSON.

The application allows authenticated users to view, search, filter, sort, add, edit, and delete products through a responsive admin interface.

## 🚀 Live Demo

Add your deployed Vercel/Netlify URL here.

## 📂 GitHub Repository

[GitHub repository](https://github.com/techieshruti/product-admin-dashboard)

---

## 🛠️ Tech Stack

- Next.js
- React
- JavaScript
- Tailwind CSS
- Axios
- DummyJSON API
- LocalStorage
- Git & GitHub

---

## ✨ Features

### Authentication

- Login using DummyJSON authentication API
- Protected product routes
- Access token stored in LocalStorage
- Axios automatically attaches the token to API requests
- Logout functionality
- Login error handling
- Duplicate login requests prevented

### Product Dashboard

- Responsive desktop table
- Responsive mobile product cards
- Product image, title, category, price, rating, and stock
- Product details navigation
- Recently added products section

### Search

- Product search using DummyJSON search API
- Debounced search input
- Search resets pagination to page 1
- Search requests are cancelled when a newer request is made
- Prevents older search results from replacing newer results

### Filtering & Sorting

- Category filtering
- Sort by:
  - Price
  - Rating
  - Title
- Sorting order support

### Pagination

- Server-side pagination using `limit` and `skip`
- Page navigation
- Previous/Next controls
- Page size options:
  - 10
  - 20
  - 50
- Displays the current item range and total number of products
- Handles invalid URL page parameters safely

### Product Details

- Product information
- Product images
- Horizontal image scrolling for products with multiple images
- Centered image display for products with a single image
- Product description
- Price and rating
- Stock information
- Customer reviews
- Edit product navigation
- Product Not Found state for invalid product IDs

### Add Product

- Product creation form
- Form validation
- Loading state
- Success feedback
- Duplicate submission prevention

### Edit Product

- Loads existing product information
- Form validation
- Update functionality
- Loading state
- Success feedback
- Duplicate submission prevention

### Delete Product

- Delete confirmation modal
- Delete API integration
- UI update after deletion

### UI States

The application includes:

- Loading states
- Error states
- Empty states
- Retry functionality
- Authentication checking state
- Product Not Found state

---

## 🔗 API

This project uses the DummyJSON API for authentication and product data.

The API is used for:
- Authentication
- Product listing
- Product search
- Categories
- Product details
- Add, update, and delete operations

## 🔐 Demo Login

Use the following credentials to access the dashboard:

```text
Username: emilys
Password: emilyspass

## 📁 Project Structure

```text
src/
├── app/
│   ├── login/
│   │   └── page.js
│   │
│   ├── products/
│   │   ├── [id]/
│   │   │   ├── edit/
│   │   │   │   └── page.js
│   │   │   ├── not-found.js
│   │   │   └── page.js
│   │   │
│   │   ├── new/
│   │   │   └── page.js
│   │   │
│   │   └── page.js
│   │
│   └── page.js
│
├── components/
│   └── products/
│       ├── DeleteModal.jsx
│       ├── Pagination.jsx
│       ├── ProductCard.jsx
│       ├── ProductFilters.jsx
│       ├── ProductForm.jsx
│       ├── ProductTable.jsx
│       └── RecentlyAddedProducts.jsx
│
├── hooks/
│   ├── useAuth.js
│   └── useDebounce.js
│
├── lib/
│   └── axios.js
│
└── services/
    ├── authApi.js
    └── productApi.js