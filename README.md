# 🚗 Cars E-Commerce Website

A modern, responsive, and user-friendly Cars E-Commerce Website built using React and Tailwind CSS.

This project provides an e-commerce-style shopping experience inspired by popular platforms like Amazon and Flipkart. Users can browse cars, search products, apply filters, sort products by price, view product details, manage their cart and wishlist, and navigate through products using pagination.

The project uses local JavaScript data instead of an external API.

---

## ✨ Features

* User Login
* User Signup
* Forgot Password
* Protected Routes
* User Dashboard
* Responsive Navbar
* Product Listing
* Local Product Data
* Real-Time Product Search
* Filter Products by Brand
* Filter Products by Category
* Filter Products by Price Range
* Sort Price: Low to High
* Sort Price: High to Low
* Sort by Rating
* Sort by Name
* Product Pagination
* Product Details Page
* Add to Cart
* Remove from Cart
* Increase / Decrease Product Quantity
* Wishlist Functionality
* Responsive Design
* Modern E-Commerce UI

---

## 🛠️ Technologies Used

* React.js
* JavaScript
* Tailwind CSS
* React Router DOM
* React Hooks
* Context API
* Vite

---

## 📂 Project Structure

```text
src/
├── assets/
│   └── images/
│
├── components/
│   ├── Navbar.jsx
│   ├── Sidebar.jsx
│   ├── SearchBar.jsx
│   ├── FilterPanel.jsx
│   ├── SortDropdown.jsx
│   ├── ProductCard.jsx
│   ├── ProductGrid.jsx
│   ├── Pagination.jsx
│   └── Footer.jsx
│
├── data/
│   └── products.js
│
├── pages/
│   ├── Dashboard.jsx
│   ├── ProductDetails.jsx
│   ├── Cart.jsx
│   └── Wishlist.jsx
│
├── context/
│   └── ShopContext.jsx
│
├── layouts/
│   └── MainLayout.jsx
│
├── routes/
│   └── AppRoutes.jsx
│
├── App.jsx
├── main.jsx
└── index.css
```

---

## 📦 Installation

Clone the repository:

```bash
git clone YOUR_REPOSITORY_URL
```

Open the project folder:

```bash
cd YOUR_PROJECT_NAME
```

Install the required dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

---

## 🔍 Search Functionality

Users can search for cars using:

* Car Name
* Brand
* Category

The search functionality works in real-time and is case-insensitive.

---

## 🎯 Filter Functionality

Users can filter products based on:

* Brand
* Category
* Price Range
* Stock Availability
* Featured Products

---

## ↕️ Sorting Functionality

Products can be sorted using:

* Default
* Price: Low to High
* Price: High to Low
* Rating: High to Low
* Name: A to Z

---

## 📄 Pagination

The product listing includes pagination functionality.

Features include:

* Previous Page Button
* Next Page Button
* Page Number Buttons
* Limited Products Per Page
* Automatic Page Reset after Search, Filter, or Sort Changes

---

## 🛒 Shopping Cart

Users can:

* Add Products to Cart
* Remove Products from Cart
* Increase Product Quantity
* Decrease Product Quantity
* View Cart Item Count
* View Subtotal
* View Total Price

---

## ❤️ Wishlist

Users can:

* Add Products to Wishlist
* Remove Products from Wishlist
* View Wishlist Products
* View Wishlist Item Count

---

## 💾 Product Data

This project does not use any external API.

All car product data is stored locally inside:

```text
src/data/products.js
```

The product data is stored using JavaScript arrays and objects.

---

## 🔄 Application Data Flow

The product processing flow used in this project is:

```text
Original Products
       ↓
Search
       ↓
Filter
       ↓
Sort
       ↓
Pagination
       ↓
Display Products
```

This approach keeps the product search, filtering, sorting, and pagination functionality organized and prevents conflicting state management.

---

## 📱 Responsive Design

The website is fully responsive and optimized for:

* Mobile Devices
* Tablets
* Laptops
* Desktop Screens

---

## 🚀 Future Improvements

Future features that can be added:

* Backend Integration
* User Authentication API
* Payment Gateway
* Order Management
* User Profile Management
* Product Reviews
* Admin Dashboard
* Database Integration
* Order Tracking

---

## 👩‍💻 Author

**Vaishnavi Chaudhari**

Frontend Developer

---

## 📄 License

This project is created for educational and learning purposes.
