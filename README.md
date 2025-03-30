# **API Core Backend**

**API Core Backend** is a centralized backend system built with **Node.js** and **Express** to support Wouessi's projects, including the **Main Portal Project (MPP)** and the **Employee Management System (EMS)**. It provides a robust, scalable API infrastructure to handle shared services and business logic for multiple frontend applications.

---

## **Key Features**
- **Unified API**: Centralized backend supporting multiple frontend applications.
- **Scalable Architecture**: Designed to grow with additional modules and projects.
- **Node.js + Express**: Lightweight and efficient RESTful API framework.
- **Core Business Logic**: Shared services like user management, authentication, and more.
- **Modular Codebase**: Organized for easy maintenance and extension.

---

## **Tech Stack**
- **Backend Framework**: [Node.js](https://nodejs.org/) with [Express](https://expressjs.com/)
- **Database**: [MongoDB]
- **Authentication**: [JSON Web Tokens (JWT)](https://jwt.io/) / OAuth (if applicable)
- **Deployment**: [Docker](https://www.docker.com/) | Vercel

---

## **Current Integrations**
- **Main Portal Project (MPP)** frontend
- **Employee Management System (EMS)** frontend

---

## **Setup Instructions**
---

## 📦 Feature: Secure Authentication and Role-Based Access

This backend includes robust **authentication and authorization** logic used across all integrated applications. It ensures that only authenticated users can access protected endpoints and only users with the correct roles can perform sensitive actions.

---

### 🔐 Key Highlights

- **JWT Authentication**: Access tokens are issued on successful login and stored in HTTP-only cookies.
- **Refresh Tokens**: Long-lived refresh tokens automatically issue new access tokens when they expire.
- **Redis-Powered Session Management**: User sessions are verified using session IDs stored in Redis.
- **Role-Based Authorization**: Middleware checks user roles (e.g., `Admin`, `HR`, `Developer`) to restrict access to protected routes.
- **Secure Logout Flow**: Clears sessions and invalidates refresh tokens in Redis.
- **Automated Emails**: On employee creation, credentials are securely emailed to the user using SMTP (Gmail by default).

---

### 🔧 Setup & Environment Configuration

Make sure your `.env` file includes the following (required for authentication, session, and mailing):

```env
# JWT
JWT_SECRET_KEY=your_secret_key
JWT_REFRESH_SECRET_KEY=your_refresh_key
JWT_ACCESS_EXPIRY=20m
JWT_REFRESH_EXPIRY=3d

# Redis
REDIS_HOST=127.0.0.1
REDIS_PORT=6379
REDIS_PASSWORD=your_password

# Session
COOKIE_SECRET=your_cookie_secret
SESSION_EXPIRY=1800000
SESSION_TIMEOUT=86400000

# Email (SMTP)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
SMTP_FROM=your_email@gmail.com
SMTP_RECEIVE=receiver@example.com

🚀 Auth Endpoints Summary

Method	     Endpoint	                   Description
POST	     /api/auth/authenticate	       User login (returns JWT tokens)
POST	     /api/auth/refresh	           Refresh access token
POST	     /api/auth/logout	           Logout and clear session

✅ Example Login Flow

    1. POST /api/auth/authenticate with credentials

    2. Receives accessToken and refreshToken (stored as cookies)

    3. Use accessToken to call protected endpoints

    4. If token expires, call POST /api/auth/refresh

    5. To log out, call POST /api/auth/logout

✅ Feature Acceptance

    Role-based access enforced across secure routes

    Sessions stored and validated in Redis

    Emails sent securely on employee onboarding

    Setup and usage clearly documented in this README

### **Clone the Repository**
```bash
git clone https://github.com/wouessi/api-core-backend.git
