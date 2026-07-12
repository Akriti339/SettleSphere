# 💸 SettleSphere

> **A full-stack expense sharing platform that helps friends, roommates, and travel groups split expenses, track balances, and settle payments effortlessly.**

SettleSphere simplifies managing shared expenses by allowing users to create groups, add friends, record expenses, split bills fairly, and settle outstanding balances—all through a clean and intuitive interface.

---

## ✨ Features

### 🔐 Authentication
- Secure user registration and login
- JWT-based authentication
- Protected API routes
- Persistent user sessions

### 👥 Friend Management
- Search users by username
- Add and manage friends
- View friend list

### 👨‍👩‍👧‍👦 Group Management
- Create expense groups
- Add members to groups
- Manage group participants

### 💰 Expense Management
- Add shared expenses
- Split expenses among multiple members
- Track who paid
- Calculate individual shares

### 📊 Settlements
- View outstanding balances
- Settle debts between users
- Track settlement history

### 📜 Activity Feed
- View complete expense history
- Monitor group activities
- Recent transactions overview

### 🎨 User Experience
- Responsive design
- Modern UI
- Mobile-friendly
- Smooth navigation

---

# 🛠 Tech Stack

## Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- React Router
- TanStack React Query
- React Hook Form
- Zod

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcrypt
- Cookie Parser
- CORS

## Deployment

- **Frontend:** Vercel
- **Backend:** Render / Railway
- **Database:** MongoDB Atlas

---

# 📂 Project Structure

```text
SettleSphere
│
├── frontend
│   ├── public
│   │   └── assets
│   │
│   ├── src
│   │   ├── _auth
│   │   ├── _root
│   │   ├── components
│   │   ├── context
│   │   ├── hooks
│   │   ├── lib
│   │   ├── constants
│   │   ├── types
│   │   ├── App.tsx
│   │   └── main.tsx
│   │
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
│   │
│   ├── package.json
│   └── .env.example
│
├── README.md
└── vercel.json
```

---

# 🚀 Getting Started

## 1. Clone the Repository

```bash
git clone https://github.com/Akriti339/SettleSphere.git

cd SettleSphere
```

---

## 2. Install Dependencies

### Frontend

```bash
cd frontend

npm install
```

### Backend

```bash
cd ../backend

npm install
```

---


# ▶️ Run the Application

### Start Backend

```bash
cd backend

npm run dev
```

Backend runs at

```
http://localhost:5000
```

---

### Start Frontend

```bash
cd frontend

npm run dev
```

Frontend runs at

```
http://localhost:5173
```

---

# 📡 API Endpoints

## Authentication

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login |
| POST | `/api/auth/logout` | Logout |
| GET | `/api/auth/me` | Get current user |

---

## Groups

| Method | Endpoint |
|---------|----------|
| GET | `/api/groups` |
| POST | `/api/groups` |
| GET | `/api/groups/:id` |
| PATCH | `/api/groups/:id/members` |
| DELETE | `/api/groups/:id` |

---

## Expenses

| Method | Endpoint |
|---------|----------|
| POST | `/api/expenses` |
| DELETE | `/api/expenses/:id` |

---

## Users

| Method | Endpoint |
|---------|----------|
| GET | `/api/users` |
| GET | `/api/users/friends` |
| GET | `/api/users?username=` |
| POST | `/api/users/:id/friends` |

---

## Settlements

| Method | Endpoint |
|---------|----------|
| GET | `/api/settlements` |
| POST | `/api/settlements` |

---

# 📸 Screenshots

> Add screenshots of your application here.

Example:

```
Home Page

Login Page

Expense Dashboard

Group Details

Settlement Screen
```

---

# 🌟 Future Improvements

- ✅ Email verification
- ✅ Password reset
- ✅ Push notifications
- ✅ Expense analytics dashboard
- ✅ Monthly spending reports
- ✅ Multi-currency support
- ✅ UPI integration
- ✅ Payment gateway integration
- ✅ Export reports (PDF/CSV)
- ✅ Dark mode
- ✅ Progressive Web App (PWA)

---

# 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create a feature branch

```bash
git checkout -b feature-name
```

3. Commit your changes

```bash
git commit -m "Add new feature"
```

4. Push to your branch

```bash
git push origin feature-name
```

5. Open a Pull Request

---

# 👩‍💻 Author

**Akriti Gupta**

- 🎓 B.Tech, IIT (BHU) Varanasi
- 💼 Aspiring Software Development Engineer
- 🔗 GitHub: https://github.com/Akriti339

---

# 📄 License

This project is licensed under the MIT License.

---

# ⭐ Show Your Support

If you found this project helpful, consider giving it a ⭐ on GitHub.

It helps others discover the project and motivates further development.
