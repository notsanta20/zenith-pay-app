# 🖥️ Zenith Pay – Frontend

![React](https://img.shields.io/badge/React-18-blue?logo=react)
![Vite](https://img.shields.io/badge/Vite-Build%20Tool-purple?logo=vite)
![TypeScript](https://img.shields.io/badge/TypeScript-Strict-blue?logo=typescript)
![Tailwind](https://img.shields.io/badge/TailwindCSS-Utility--First-38bdf8?logo=tailwindcss)

---

## 🏗️ Overview

The **Zenith Pay Frontend** is a **secure React single-page application** designed to interact with the Zenith Pay backend through an API Gateway.

The frontend focuses on **auth correctness, backend-driven onboarding, responsive design, and predictable server-state management**.

---

## ⚙️ Tech Stack

- **Frontend:** React, TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS, shadcn/ui
- **Routing:** React Router
- **State Management:** React Context
- **Server State:** TanStack Query
- **Forms & Validation:** TanStack Form, Zod
- **HTTP Client:** Axios

---

## 📸 Screenshots

> Add screenshots under `/screenshots` directory.

- Login Page
- Register Page
- Create Profile
- Create Account
- Dashboard
- Profile & Settings

---

## 🔐 Authentication Flow

- JWT stored in **HttpOnly cookies**
- No token stored in localStorage or sessionStorage
- Auth state derived from backend using `verify-user` API
- Logout clears cookies via backend API

---

## 🧭 Routing & Onboarding

Routing is **state-driven** based on backend bootstrap data:

1. Profile not completed → Create Profile
2. Account not created → Create Account
3. Fully onboarded → Application Dashboard

Public routes:
- `/`
- `/login`
- `/register`

All other routes are protected.

---

## 📱 Responsive Design

- Mobile-first UI design
- Tailwind CSS responsive utilities
- Optimized layouts for:
  - Mobile
  - Tablet
  - Desktop

---

## ⚙️ Environment Configuration

The frontend is environment-driven.

### `.env` file

```env
VITE_BACKEND_SERVER_URL="http://gateway-host:8089"
```

---

## 🚀 Start service

```
npm install
npm run dev
```
