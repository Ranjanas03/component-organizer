# 🧩 React Component Library Manager

A powerful and minimal web-based tool to **create, edit, store, manage, and preview** reusable React components (in JSX format). Built with **React**, **Node.js**, **Express**, and **MongoDB**.

---
Live Demo - 

## 🚀 Features

- ✨ Add new reusable UI components with JSX code
- 📝 Edit existing components
- 🔍 Search components by name
- 🔧 Live preview of each component
- 🗃️ Store metadata like tags and title
- ❌ Delete components
- 💾 Persistent backend using MongoDB

---

## 🧱 Tech Stack

- **Frontend:** React, Tailwind CSS
- **Backend:** Node.js, Express
- **Database:** MongoDB
- **API Testing:** Thunder Client

---

## 📁 Folder Structure

```bash
├── backend/
│   ├── models/Component.js
│   ├── controllers/componentController.js
│   ├── routes/componentRoutes.js
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Sidebar.jsx
│   │   │   ├── ComponentDetails.jsx
│   │   │   └── AddEditForm.jsx
│   │   ├── api/api.js
│   │   └── App.jsx
│   └── index.css
├── package.json
└── README.md

🛠️ Installation & Setup
1. Clone the repository
git clone- 

2. setup backend
cd backend
npm install

3. Create .env file inside /backend
PORT=5000
MONGO_URI=your_mongodb_connection_string
start the backend server - node server.js

4. Setup Frontend
cd ../frontend
npm install
npm run dev
