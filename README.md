# 💸 SettleSphere

A full-stack expense-sharing platform that helps friends, roommates, and travel groups split expenses, track balances, and settle payments effortlessly.

---

## ✨ Features

- 🔐 Secure user authentication with JWT
- 👥 Add and manage friends
- 🏠 Create and manage expense groups
- 💰 Record shared expenses
- ⚖️ Split expenses among multiple members
- 📊 Track who paid and who owes whom
- 🤝 Settle outstanding balances
- 📜 View complete group activity history
- 📱 Responsive UI for desktop and mobile
- 🎨 Modern purple-themed interface

---

## 🛠️ Tech Stack

### Frontend
- React
- TypeScript
- Vite
- Tailwind CSS
- React Query
- React Router

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcrypt
- Cookie Parser

### Deployment
- Vercel (Frontend)
- Render / Railway (Backend)

---

## 📂 Project Structure

```text
SettleSphere
│
├── frontend
│   ├── public
│   ├── src
│   │   ├── _auth
│   │   ├── _root
│   │   ├── components
│   │   ├── context
│   │   ├── hooks
│   │   ├── lib
│   │   └── types
│   ├── package.json
│   └── vite.config.ts
│
├── backend
│   ├── src
│   │   ├── config
│   │   ├── controllers
│   │   ├── middleware
│   │   ├── models
│   │   ├── routes
│   │   ├── utils
│   │   ├── app.js
│   │   └── server.js
│   ├── package.json
│   └── .env.example
│
├── README.md
└── vercel.json
