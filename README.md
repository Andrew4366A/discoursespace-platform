# DiscourseSpace - Hybrid Community Platform

A full-stack hybrid community forum and blogging platform built with React and Express.js.

## 🚀 Features

- **Blog Posts**: Create, read, update, and delete blog posts
- **Discussions**: Engage in community discussions
- **User Profiles**: Customizable user profiles with saved posts
- **Admin Panel**: Complete admin dashboard for content management
- **Authentication**: JWT-based authentication with admin support
- **Bookmarks**: Save your favorite posts
- **Comments**: Comment on blogs and discussions
- **Categories**: Organize content by categories (Technology, Science, Art, etc.)

## 📁 Project Structure

```
hybrid-platform/
├── src/                    # React frontend
│   ├── components/         # Reusable components
│   ├── context/           # React Context providers
│   ├── pages/              # Page components
│   └── ...
├── backend/               # Express.js backend
│   ├── config/            # Configuration files
│   ├── controllers/       # Business logic
│   ├── models/            # Mongoose models
│   ├── routes/            # API routes
│   └── middleware/        # Custom middleware
└── public/                # Static assets
```

## 🛠️ Tech Stack

### Frontend
- React 19
- React Router DOM
- React Icons
- Bootstrap

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- bcryptjs

## 📦 Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)

### Frontend Setup

```bash
cd hybrid-platform
npm install
npm start
```

### Backend Setup

```bash
cd hybrid-platform/backend
npm install

# Create .env file
cp .env.example .env

# Update .env with your MongoDB connection string
# MONGODB_URI=your-mongodb-connection-string

npm run dev
```

## 🔧 Environment Variables

### Backend (.env)
```
PORT=4000
NODE_ENV=development
JWT_SECRET=your-secret-key
MONGODB_URI=mongodb://localhost:27017/discoursespace
```

### Frontend
Set `REACT_APP_API_URL` in your environment or it defaults to `http://localhost:4000/api`

## 📡 API Endpoints

- `GET /api/blogs` - Get all blogs
- `POST /api/blogs` - Create blog
- `GET /api/discussions` - Get all discussions
- `POST /api/discussions` - Create discussion
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- And more...

See `backend/README.md` for complete API documentation.

## 👤 Default Admin Credentials

- Email: `admin@discoursespace.com`
- Password: `admin123`

## 🚀 Deployment

1. Build the frontend: `npm run build`
2. Set production environment variables
3. Deploy backend to your server (Heroku, Railway, etc.)
4. Deploy frontend to Netlify, Vercel, etc.

## 📝 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

