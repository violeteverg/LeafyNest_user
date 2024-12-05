
# LeafyNest


![](https://github.com/violeteverg/LeafyNest_user/blob/master/public/project.gif)


LeafyNest is an online marketplace for plant lovers, offering convenient options for local pickup or home delivery. Our standout features include personalized plant care recommendations and seamless delivery fee calculation based on your location.

## 📑 Table of Contents
1. [Tech Stack](#tech-stack)
2. [🌿 Features](#-features)
   - [Authentication](#authentication)
   - [Search Products](#search-products)
   - [My Cart](#my-cart)
   - [My Orders](#my-orders)
3. [👨‍💼 Admin Dashboard](#-admin-dashboard)
4. [🌐 Environment Variables](#-enviroment)
5. [🚀 Getting Started](#getting-started)
   - [Prerequisites](#prerequisites)
   - [Clone Repository](#1-clone-repository)
   - [Install Dependencies](#2-install-dependencies)
   - [Setup Environment](#3-setup-enviroment)
   - [Running Apps](#4-running-apps)
6. [🎥 Demo Project](#demo-project)

# Tech Stack

![Picture](https://res.cloudinary.com/dmjd9rohb/image/upload/v1733375230/Teks_paragraf_Anda_tvmpo7.jpg)


# 🌿 Features


### *Authentication*
- Sign In, Sign Up, Login with Google.
- Forgot Password, Reset Password, Email Verification.

### *Search Products*
- Search for plants by name or category.
- View detailed product descriptions, including care tips and availability.

### *My Cart*
- Add or remove plants from your cart.
- Update plant quantities in your cart.
- View total price.

### *My Orders*
- View order history with detailed order information.
- Track the status of current orders.
- Export individual order details to PDF.

## 👨‍💼 Admin Dashboard

LeafyNest comes with a separate admin panel for managing the marketplace. The admin dashboard provides comprehensive tools for:
- Product management
- Order processing
- User management
- Analytics and reporting

👉 [Access Admin Repository](https://github.com/violeteverg/Final_Project_FE_Adm)
👉 [Access Backend Repository](https://github.com/violeteverg/Final_project_BE)

---

## 🌐 Enviroment
This project uses the following environment variables:

```bash

VITE_JWT_SECRET="your_jwt_secret"
VITE_MIDTRANS_CLIENT_KEY="your_midtrans_client_key"

VITE_FIREBASE_API_KEY="your_firebase_api_key"
VITE_FIREBASE_AUTH_DOMAIN="your_firebase_auth_domain"
VITE_FIREBASE_PROJECT_ID="your_firebase_project_id"
VITE_FIREBASE_STORAGE_BUCKET="your_firebase_storage_bucket"
VITE_FIREBASE_MESSAGING_SENDER_ID="your_firebase_messaging_sender_id"
VITE_FIREBASE_APP_ID="your_firebase_app_id"
  ```

## 🚀 Getting Started

### Prerequisites
- You need to have **Firebase** account & **midtrans** account

### 1. Clone Repository

```bash
git clone https://github.com/violeteverg/LeafyNest_user.git
cd LeafyNest_user
```

### 2. Install dependencies

```bash
npm Install
```

### 3. Setup Enviroment
Create a .env file at the root directory and configure Firebase, Midtrans, and other required keys. You can use the .env.example file as a reference.

### 4. Running apps

```bash
npm run dev
```
Open http://localhost:5173 with your browser to see the result.

## 🎥 Demo Project
You can view the demo of the project by following this link: 👉 [Demo Vidio](https://www.loom.com/share/6c175a39d9c64deeb551055d25781d89?sid=0f336ae4-2c6f-42d1-bd60-1c750f03d0a4).


