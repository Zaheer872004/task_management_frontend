# Task Manager Application - Frontend

A modern React frontend for a full-stack, role-based Task Management system where users can create tasks, assign them to others, and track progress. The application enforces strict authorization checks, ensuring users can only edit or delete tasks based on their permissions (Creator vs. Assignee).

## 🔗 Project Links
- **Live Application (Frontend):** [https://task-management-frontend-roan-zeta.vercel.app](https://task-management-frontend-roan-zeta.vercel.app)
- **Live API (Backend):** [https://task-management-backend-1-kwpm.onrender.com](https://task-management-backend-1-kwpm.onrender.com)
- **Backend Repository:** [GitHub - Backend](https://github.com/Zaheer872004/task_management_backend.git)

---

## 🔐 Sample User Credentials
To fully test the role-based permissions and task assignment features, please use the following pre-configured test accounts:

**User 1 (Test Task Creation & Assignment)**
- **Email:** `zaheer@gmail.com` 
- **Password:** `123456`

**User 2 (Test Assignee Permissions)**
- **Email:** `faisal@gmail.com` 
- **Password:** `123456`


---

## ✨ Key Features
- **Authentication & Authorization:** Secure login/registration using access tokens. Protected routes prevent unauthorized dashboard access.
- **Role-Based Permissions:** 
  - **Creators** can edit all fields and delete their created tasks.
  - **Assignees** can only update the task `status` (To Do, In Progress, Done).
- **Task Assignment:** Fetch a list of registered users and assign tasks dynamically.
- **Clean UI & UX:** Dashboard with ownership filters ("Created by me" vs "Assigned to me") and status filters.
- **Error Handling:** User-friendly toast notifications for all actions.

---

## 🛠 Tech Stack
- **React 18+ (Vite)**
- **React Router DOM** (Protected & Public Routing)
- **Tailwind CSS** (Responsive UI)
- **Axios** (API Client with Interceptors)
- **React Hot Toast & Lucide React** (UI/UX)

---

## 🚀 Local Setup Instructions

### 1) Clone repository
```bash
git clone https://github.com/Zaheer872004/task_management_frontend.git
cd task_management_frontend
```

### 2) Install dependencies
```bash
npm install
```

### 3) Configure Environment Variables
Create a `.env` file in the project root:
```env
VITE_API_URL=http://localhost:8000
```
*(Change to your deployed backend URL if testing production API locally)*

### 4) Run development server
```bash
npm run dev
```
The app will start on `http://localhost:5173`.

---

## 📁 Folder Structure
```bash
src/
  api/          # Axios client and API endpoints
  components/   # Reusable UI components (Navbar, Modals, TaskCards)
  context/      # React Context (Auth context)
  pages/        # Page views (Login, Register, Dashboard)
  routes/       # Route guards (Protected & Public)
  utils/        # Helper functions
```

---
*Developed with a focus on code quality, clarity, and clean UI design.*