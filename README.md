# 🏆 Competitive Programming Contest Tracker

A comprehensive tool designed to help programmers stay updated with upcoming and past coding contests from popular competitive programming platforms, integrated with curated YouTube learning resources.

## 🎥 Demo
[Watch Demo Video](https://drive.google.com/file/d/1RvpqlBERtg3mkUbc2LOMGXy8hEiivEE8/view?usp=sharing)

## ✨ Key Features

- **📅 Multi-Platform Contest Tracking**
  - CodeChef
  - LeetCode
  - Codeforces

- **🎓 Learning Resources**
  - YouTube playlist integration for tutorials
  - Solution explanations

- **🔔 Smart Notifications**
  - Gmail reminders for bookmarked contests
  - 30-minute advance notifications

## 🛠️ API Integration

### CodeChef
- **Endpoint:** `https://www.codechef.com/api/list/contests/all`
- Fetches comprehensive contest details including name, timing, and URLs

### LeetCode
- **Endpoint:** `https://leetcode.com/graphql`
- GraphQL-based API for retrieving contest information

### Codeforces
- **Endpoint:** `https://codeforces.com/api/contest.list`
- Provides past, ongoing, and upcoming contest details

### YouTube
- **Endpoint:** `https://youtube.googleapis.com/youtube/v3/playlistItems`
- Retrieves curated educational content from specific playlists

## 🚀 Getting Started

### Standard Setup

#### Frontend Setup
```bash
git clone https://github.com/Ameerjafar/TLE-Assignment.git
cd frontend
npm install
cp .env.sample .env
npm run dev
```

#### Backend Setup
```bash
cd backend
npm install
cp .env.sample .env
tsc -b
node dist/index.js
```

### 🐳 Docker Setup
```bash
cd frontend
cp .env.sample .env  # Update environment variables
cd backend
cp .env.sample .env  # Update environment variables
docker-compose up --build
```

## 🌐 Port Configuration
- Frontend: `8080`
- Backend: `3000`

## 👥 Contributors
<!-- CONTRIBUTORS_START -->
- [Ameerjafar](https://github.com/Ameerjafar)
<!-- CONTRIBUTORS_END -->

## ℹ️ Note
Contest data availability is limited to events present in the associated YouTube playlists.