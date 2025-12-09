# SkillSync - Student-Teacher Skill Exchange Platform

SkillSync is a full-stack web application that connects students with trainers for 1-on-1 skill learning sessions.

## Features

- **User Roles**: Separate flows for Students and Trainers.
- **Skill Marketplace**: Search and filter skills by category and keyword.
- **Booking System**: Request and manage sessions.
- **Real-time Chat**: Message trainers/students directly.
- **Reviews & Ratings**: Rate trainers after sessions.

## Tech Stack

- **Frontend**: React, Vite, TailwindCSS, React Router, Axios
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose)
- **Auth**: JWT, bcrypt

## Setup Instructions

### Prerequisites
- Node.js (v14+)
- MongoDB Atlas Account (or local MongoDB)

### 1. Backend Setup

1. Navigate to `server` directory:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create `.env` file:
   ```bash
   cp .env.example .env
   ```
   *Update `MONGO_URI` and `JWT_SECRET` in `.env`*

4. Start server:
   ```bash
   npm run dev
   ```
   Server runs on http://localhost:5000

### 2. Frontend Setup

1. Navigate to `client` directory:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start development server:
   ```bash
   npm run dev
   ```
   Frontend runs on http://localhost:5173

## Deployment

- **Frontend**: Ready for Vercel deployment.
- **Backend**: Ready for Render/Railway deployment.
# skillsync
