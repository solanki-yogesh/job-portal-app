🧑‍💼 Job Portal Application

A role-based Job Portal built using React, TypeScript, Redux Toolkit, TanStack Query, Material UI, and JSON Server.

This application allows Admins to create and manage job postings and Candidates to view and apply for jobs.

🔗 Repository:
https://github.com/solanki-yogesh/job-portal-app

🚀 Tech Stack

⚛️ React (Vite)

📘 TypeScript

🗃️ Redux Toolkit (Authentication State Management)

🔄 TanStack Query (Server State Management)

🎨 Material UI (UI Components)

🗄️ JSON Server (Mock Backend API)

✨ Features
🔐 Authentication

Role-based login (Admin / Candidate)

Protected routes

Logout functionality

Redux-managed authentication state

Password not stored in Redux

👨‍💼 Admin Panel

Create new job postings

View list of created jobs

View applicants per job

Applicants dialog displays:

Candidate Name

Candidate Email

Applied Date

Form validation

Snackbar notifications

👩‍💻 Candidate Panel

View all available jobs

Apply for a job

Cannot apply twice for the same job

Cannot apply if job is expired

Disabled apply button if:

Already applied

Job expired

Status indicators (Expired / Already Applied)

Loading states for async operations

🧠 Best Practices Implemented

Strict TypeScript typing (no any)

Separate database models and auth models

No optional id in database models

No inline object types

Proper query invalidation after mutations

Type-only imports where required

Clean folder structure

Reusable API layer

Snackbar feedback system

Loading indicators

🧪 Test Credentials
👨‍💼 Admin

Email: admin@mail.com

Password: 123456

👩‍💻 Candidate

Email: candidate@mail.com

Password: 123456

🛠 Installation & Setup
1️⃣ Clone the Repository
git clone https://github.com/solanki-yogesh/job-portal-app.git
cd job-portal-app
2️⃣ Install Dependencies
npm install
3️⃣ Start Frontend (Vite)
npm run dev

Frontend runs at:

http://localhost:5173

4️⃣ Start JSON Server
npx json-server --watch db.json --port 3001

Backend runs at:

http://localhost:3001

🌐 API Endpoints (JSON Server)

GET /users

GET /jobs

POST /jobs

GET /applications

POST /applications

📁 Project Structure
src/
 ├── app/
 │    ├── store.ts
 │    ├── hooks.ts
 │
 ├── features/
 │    ├── auth/
 │    ├── jobs/
 │    ├── applications/
 │
 ├── routes/
 ├── types/
 ├── components/
 └── main.tsx
📌 Future Improvements

Pagination for job listings

Search & filtering

Deployment (Vercel + Render)

Unit testing (Jest / React Testing Library)

Backend integration (Node.js / Express)

Dark mode support

👤 Author

Yogesh Solanki
GitHub: https://github.com/solanki-yogesh

📄 License

This project was built for learning and assignment purposes.