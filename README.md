# ShopHub — Backend

The backend API for **ShopHub**, an e-commerce platform. Built with **Express**, **TypeScript**, and **MongoDB**.

## 🚀 Tech Stack

- **Node.js** + **Express 5** — Web server & REST API framework
- **TypeScript** — Static typing
- **MongoDB** (via **Mongoose**) — NoSQL database & ODM
- **JWT (jsonwebtoken)** — Authentication & authorization
- **bcryptjs** — Password hashing
- **Multer** — File uploads (e.g. product images)
- **cookie-parser** — Cookie handling
- **cors** — Cross-Origin Resource Sharing
- **helmet** — Security headers
- **express-validator** — Request input validation
- **morgan** — HTTP request logging
- **dotenv** — Environment variable management

## 📦 Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- npm (comes with Node.js)
- A running **MongoDB** instance (local or MongoDB Atlas)

## 🔧 Installation & Usage

1. **Clone the repository**
   ```bash
   git clone https://github.com/mohammadmehdidalvandii/shophub-backend.git
   cd shophub-backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the root directory, for example:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/shophub
   JWT_SECRET=your_jwt_secret
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```
   This uses `nodemon` + `ts-node` to watch and auto-restart on file changes.

5. **Build for production**
   ```bash
   npm run build
   ```

6. **Run the production build**
   ```bash
   npm start
   ```

## 📁 Project Structure

```
shophub-backend/
├── src/
│   └── server.ts       # Application entry point
├── .gitignore
├── package.json         # Dependencies & scripts
└── tsconfig.json        # TypeScript configuration
```

## 🔐 Security Features

- Password hashing with **bcryptjs**
- **JWT**-based authentication
- HTTP security headers via **helmet**
- Input validation with **express-validator**
- File upload handling with **Multer** (e.g. product images)

## 📄 License

ISC
