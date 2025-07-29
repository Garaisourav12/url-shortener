# 🔗 URL Shortener API - NestJS

A secure, scalable URL shortener API built using **NestJS**, supporting user authentication, custom short codes, expiration, and detailed Swagger documentation.

---

## 📄 Live Documentation

- **Swagger UI:** [https://your-backend-domain.com/api-docs](https://your-backend-domain.com/api-docs)

---

## 🚀 Features

- ✅ User registration & login with JWT (stored in cookies)
- 🔒 Private routes protected using guards
- 🔗 URL shortening with optional custom alias
- ⏳ Expiry & max click limits
- 📈 URL statistics tracking
- 🧾 Fully documented via Swagger

---

## 🛠️ Tech Stack

- **Backend:** [NestJS](https://nestjs.com) (TypeScript)
- **Auth:** JWT (via cookie or Authorization header)
- **Database:** MongoDB (Mongoose)
- **Validation:** class-validator
- **Docs:** Swagger (`@nestjs/swagger`)
- **Dev Tools:** Docker (optional), Postman, Swagger UI

---

## 📦 Installation & Run (Local)

### 1. Clone & Setup

```bash
git clone https://github.com/your-username/url-shortener-api.git
cd url-shortener-api
cp .env.example .env
```

Fill in your Mongo URI, JWT secret, and environment variables.

### 2. Install dependencies

Using **Yarn**:

```bash
yarn install
```

Or with **NPM**:

```bash
npm install
```

### 3. Run the app

#### With Yarn:

```bash
# Development
yarn start:dev

# Build
yarn build

# Production
yarn start:prod
```

#### With NPM:

```bash
# Development
npm run start:dev

# Build
npm run build

# Production
npm run start:prod
```

- API base: `http://localhost:3000`
- Swagger docs: `http://localhost:3000/api-docs`

---

## 🐳 Run with Docker

### 1. Build Docker Image

```bash
docker build -t nest-url-shortener .
```

### 2. Run Container

```bash
docker run -d -p 3000:3000 --env-file .env nest-url-shortener
```

---

## 🧪 Swagger API Docs

> View and test APIs interactively via Swagger UI.

### 🔐 Auth Endpoints

| Method | Endpoint            | Description                |
| ------ | ------------------- | -------------------------- |
| POST   | `/auth/register`    | Register new user          |
| POST   | `/auth/login`       | Login & receive JWT cookie |
| GET    | `/auth/logout`      | Logout (clear cookie)      |
| GET    | `/auth/verifyToken` | Verify JWT token (private) |

### 🔗 URL Endpoints (Authenticated)

| Method | Endpoint               | Description                   |
| ------ | ---------------------- | ----------------------------- |
| POST   | `/api/shorten`         | Shorten URL with options      |
| GET    | `/api/stat/:shortCode` | Get analytics for a short URL |

### 🌐 Redirect

| Method | Endpoint        | Description              |
| ------ | --------------- | ------------------------ |
| GET    | `/r/:shortCode` | Redirect to original URL |

### ✅ Misc

| Method | Endpoint        | Description        |
| ------ | --------------- | ------------------ |
| GET    | `/`             | Entry route        |
| GET    | `/check-health` | Health check route |

---

## 🔐 Authentication

- JWT stored in `HttpOnly` cookie (`accessToken`)
- Swagger supports Authorization via `@ApiBearerAuth()`
- Alternatively, you can send JWT in the `Authorization: Bearer <token>` header

---

## 📽️ Video Explanation

🎥 [Watch Project Overview on Loom / Google Drive](https://drive.google.com/your-demo-link)

---

## ✅ Bonus Features Completed

- ✅ Custom short codes
- ✅ Expiration & max click limit
- ✅ Full Swagger integration
- ✅ Docker support
- ✅ Logout & token verification API
- ✅ Token support in cookies and headers

---

## 👤 Author

**Sourav Garai**
🔗 [GitHub](https://github.com/Garaisourav12) | ✉️ [youremail@example.com](mailto:youremail@example.com)

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
