# Task Manager Frontend

A modern React frontend for a Task Manager app with authentication, protected routes, task creation/editing, filtering, and role-based task actions.

> This README is for **frontend only**.

---

## 📌 Project Overview

This frontend allows users to:

- Register and login
- Access a protected dashboard
- Create personal tasks or assign tasks to other users
- View tasks with status and ownership filters
- Edit/Delete tasks based on permissions
- Logout securely

---

## 🛠 Tech Stack

- **React 18+**
- **Vite**
- **React Router DOM**
- **Axios**
- **Tailwind CSS**
- **React Hot Toast**
- **Lucide React Icons**

---

## 📁 Folder Structure (example)

```bash
src/
  api/
    client.js
    auth.api.js
    task.api.js
  components/
    dashboard/
    ui/
    Navbar.jsx
    TaskFilters.jsx
    TaskForm.jsx
    TaskList.jsx
    TaskCard.jsx
  context/
    AuthContext.jsx
  pages/
    LoginPage.jsx
    RegisterPage.jsx
    DashboardPage.jsx
  routes/
    ProtectedRoute.jsx
    PublicRoute.jsx
  utils/
    constants.js
    taskPermissions.js
    formatDate.js
  App.jsx
  main.jsx
```

---

## ✅ Prerequisites

Install these before running:

- [Node.js](https://nodejs.org/) (v18 or above recommended)
- npm (comes with Node)

Check versions:

```bash
node -v
npm -v
```

---

## 🚀 Getting Started (Local Setup)

### 1) Clone repository

```bash
git clone https://github.com/Zaheer872004/task_management_frontend.git
cd task_management_frontend
```

### 2) Install dependencies

```bash
npm install
```

### 3) Create environment file

Create a `.env` file in project root:

```env
VITE_API_URL=http://localhost:8000
```

> Use your backend URL/port here.

### 4) Run development server

```bash
npm run dev
```

Vite will start on something like:

```bash
http://localhost:5173
```

---

## 🔐 Environment Variables

| Variable        | Required | Description                     |
|----------------|----------|---------------------------------|
| `VITE_API_URL` | Yes      | Backend base URL for API calls  |

Example:

```env
VITE_API_URL=http://localhost:8000
```

---

## 📜 Available Scripts

```bash
npm run dev      # Start local development server
npm run build    # Build production bundle
npm run preview  # Preview production build locally
npm run lint     # Run lint checks (if configured)
```

---

## 🔗 API Expectations (Frontend)

This frontend expects backend endpoints like:

- `POST /api/v1/auth/login`
- `POST /api/v1/auth/register`
- `POST /api/v1/auth/logout`
- `GET /api/v1/auth/me`
- `GET /api/v1/tasks`
- `POST /api/v1/tasks`
- `PATCH /api/v1/tasks/:id`
- `DELETE /api/v1/tasks/:id`


---

## 👤 Authentication Flow (Current)

- Access token is stored in `localStorage`
- Protected routes require authenticated state
- On login, token is saved and user is set in context
- On logout, local token/user data is cleared

---

## 🎯 Main Features

- Clean dashboard UI
- Ownership sections:
  - Created by me
  - Assigned to me
- Status filtering:
  - To Do
  - In Progress
  - Done
- Search by title/description
- Task modal for create/update
- Permission-aware actions (Edit/Delete)

---

## 🧪 Build for Production

```bash
npm run build
```

Output will be generated in:

```bash
dist/
```

Deploy `dist` to any static hosting (Vercel, Netlify, Nginx, etc.).

---

## ⚠️ Common Issues

### 1) API URL undefined
If requests go to `/undefined/...`, check `.env`:

```env
VITE_API_URL=http://localhost:8000
```

Then restart dev server.

### 2) CORS errors
Backend must allow frontend origin, e.g. `http://localhost:5173`.

### 3) 401 Unauthorized
Check:
- access token exists in localStorage
- backend auth middleware
- valid login flow

---



## 📄 License

This project is for assignment/demo use (update as needed).

---

## 👨‍💻 Author

Zaheer (Frontend Task Manager)