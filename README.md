# SkillSwap AI – AI Powered Skill Exchange & Learning Platform

A full-stack MERN application that enables users to exchange skills, connect with learners and mentors, generate AI-powered study plans, manage learning sessions, communicate in real-time, and track their learning journey.

Built using React, Node.js, Express, MongoDB, Redux Toolkit, Socket.IO, and OpenAI API.

---

# 🌟 Features

## 🖥️ Frontend

### Modern Learning Platform UI

* Responsive SaaS-style interface
* Dark modern design
* Smooth animations using Framer Motion
* Mobile-friendly layout
* Interactive dashboard

### User Management

* User registration and login
* JWT authentication
* Protected routes
* Change password functionality
* User profile management

### Skill Exchange System

* Browse platform users
* View offered and wanted skills
* Send skill exchange requests
* Accept or reject requests
* Manage connections

### AI Study Planner

Generate personalized learning plans using AI.

Users can:

* Enter a skill to learn
* Define learning goals
* Generate structured study plans
* Receive AI-powered recommendations

### Session Management

* Schedule learning sessions
* Track upcoming sessions
* Manage completed sessions
* Monitor learning progress

### Notifications

* Real-time notification system
* Request notifications
* Session updates
* Platform alerts

### Real-Time Communication

* Socket.IO integration
* Instant messaging
* Live chat updates

---

# ⚙️ Backend API

Built with Express.js and MongoDB.

## Authentication APIs

* POST /api/auth/register
* POST /api/auth/login
* POST /api/auth/change-password

## User APIs

* GET /api/users
* GET /api/users/profile
* PUT /api/users/profile

## Match & Connection APIs

* POST /api/matches/request
* GET /api/matches/received
* GET /api/matches/connections
* PUT /api/matches/respond

## AI APIs

* POST /api/ai/study-plan

## Session APIs

* GET /api/sessions
* POST /api/sessions
* PUT /api/sessions/:id

## Notification APIs

* GET /api/notifications
* PUT /api/notifications/read

## Admin APIs

* User Management
* Session Monitoring
* Platform Analytics
* Connection Management
* Reports Management

---

# 👨‍💼 Admin Dashboard

Admin users can:

### User Management

* View all users
* Monitor activity
* Manage platform users

### Analytics

* Total users
* Total sessions
* Platform activity overview

### Session Monitoring

* View all sessions
* Track learning activity

### Connection Management

* View user connections
* Monitor platform engagement

### Reports

* Manage user reports
* Review platform issues

---

# 📦 Core Modules

### Authentication

* JWT Authentication
* Secure password hashing
* Protected API routes

### Skill Exchange

* User discovery
* Request system
* Connections management

### AI Learning

* AI-generated study plans
* Personalized recommendations

### Sessions

* Scheduling
* Tracking
* Progress monitoring

### Communication

* Real-time chat
* Instant notifications

---

# 🗄️ Database

MongoDB Atlas Integration

Collections:

* Users
* Matches
* Sessions
* Notifications
* Reviews

Features:

* Mongoose ODM
* Scalable architecture
* Cloud-hosted database
* Production-ready design

---

# 📁 Project Structure

SkillSwapAI/

├── client/

│ ├── src/

│ │ ├── api/

│ │ ├── components/

│ │ ├── pages/

│ │ ├── redux/

│ │ ├── routes/

│ │ └── socket.js

│

├── server/

│ ├── src/

│ │ ├── config/

│ │ ├── controllers/

│ │ ├── middleware/

│ │ ├── models/

│ │ ├── routes/

│ │ └── services/

│

└── README.md

---

# 🚀 Live Demo

Frontend:

https://skill-swap-ai-two.vercel.app

Backend API:

https://skillswapai-qknl.onrender.com

---

# 🛠️ Tech Stack

## Frontend

* React
* React Router
* Redux Toolkit
* Axios
* Tailwind CSS
* Framer Motion
* Lucide React

## Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* Socket.IO

## AI Integration

* OpenAI API

## Deployment

* Vercel (Frontend)
* Render (Backend)
* MongoDB Atlas (Database)

---

# ⚙️ Environment Variables

## Backend (.env)

PORT=

MONGO_URI=

JWT_SECRET=

OPENAI_API_KEY=

## Frontend (.env)

VITE_API_URL=

---

# 🚀 Getting Started

## Clone Repository

```bash
git clone https://github.com/manju-015/SkillSwapAI.git
cd SkillSwapAI
```

## Backend Setup

```bash
cd server
npm install
```

Create .env file:

```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret
OPENAI_API_KEY=your_openai_key
```

Run Backend:

```bash
npm start
```

## Frontend Setup

```bash
cd client
npm install
```

Create .env file:

```env
VITE_API_URL=http://localhost:5000/api
```

Run Frontend:

```bash
npm run dev
```

---

# 🔒 Security Features

* JWT Authentication
* Password Hashing
* Protected Routes
* Secure API Access
* Environment Variable Protection

---

# 💻 Commands

## Frontend

```bash
npm run dev
npm run build
```

## Backend

```bash
npm start
npm run dev
```

---

# 🎯 Future Enhancements

* Video Calling Integration
* AI Mentor Recommendations
* Gamification & Badges
* Learning Streak Tracking
* Skill Certification System
* Mobile Application
* Email Notifications
* Advanced Analytics

---

# 📸 Screenshots

Add project screenshots here:

### Dashboard

screenshots/dashboard.png

### User Discovery

screenshots/users.png

### AI Study Planner

screenshots/study-plan.png

### Admin Dashboard

screenshots/admin-dashboard.png

---

# 👨‍💻 Author

Manju M

GitHub:
https://github.com/manju-015

---

# 📄 License

This project is licensed under the MIT License.

---

Built using React, Node.js, Express, MongoDB, Redux Toolkit, Socket.IO & OpenAI API

✨ AI Powered | 🌐 MERN Stack | 🚀 Production Deployed | 🎯 Skill Exchange Platform
