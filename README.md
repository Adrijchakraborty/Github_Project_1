# GitHub OAuth Application

## Overview

This project is a GitHub OAuth application that allows users to authenticate via GitHub, select multiple repositories, and display repository branches in a visually appealing manner. The frontend is built using React with Tailwind CSS for styling and Zustand for state management. The backend is powered by Express with Passport.js for authentication.

## Tech Stack

### **Frontend:**

- React (with Vite)
- Tailwind CSS
- Zustand (State Management)
- React Router
- Framer Motion (Animations)

### **Backend:**

- Node.js with Express
- Passport.js (GitHub Authentication)
- Express-Session
- dotenv (Environment Variable Management)

## Setup Instructions

### **Prerequisites**

Ensure you have the following installed:

- Node.js (>=16.x)
- GitHub Developer Account (for OAuth App setup)

### **Clone the Repository**

```sh
git clone https://github.com/Adrijchakraborty/Github_Project_1
cd Github_Project_1
```

### **Backend Setup**

1. Navigate to the backend folder:
   ```sh
   cd Backend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file in the `backend` directory and add the following:
   ```env
   GITHUB_CLIENT_ID=your_github_client_id
   GITHUB_CLIENT_SECRET=your_github_client_secret
   SESSION_SECRET=your_session_secret
   CALLBACK_URL=http://localhost:5000/auth/github/callback
   ```
4. Start the backend server:
   ```sh
   npm run dev
   ```
   The backend will be running on `http://localhost:4400`.

### **Frontend Setup**

1. Navigate to the frontend folder:
   ```sh
   cd Frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the frontend development server:
   ```sh
   npm run dev
   ```
   The frontend will be running on `http://localhost:3000`.

## Usage

1. Open `http://localhost:3000` in your browser.
2. Click on "Login with GitHub" to authenticate using GitHub OAuth.
3. Select multiple repositories from your GitHub account.
4. View the repository branches in an animated and structured format.

## Architecture & Design Decisions

- **OAuth Authentication:** Implemented using `passport-github2` for seamless GitHub login.
- **State Management:** Zustand is used for managing authentication state and repository selection.
- **Animations & UI:** Framer Motion ensures smooth transitions and animations.
- **Session Handling:** Express-session is used for secure user session management.

## Future Enhancements

- Implement real-time updates for repository changes.
- Add visualization for repository activity.

