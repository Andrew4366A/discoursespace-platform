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

## 📸 Screenshots
![blog1](https://github.com/user-attachments/assets/ee41dcc0-bc31-4f8d-afca-3616e8686468)
![blog2](https://github.com/user-attachments/assets/a64126a5-7a1d-4582-8574-cd8eea708e41)
![blog3](https://github.com/user-attachments/assets/977b7295-6d94-4e1d-b535-cfd59e3d74e4)
![blog4](https://github.com/user-attachments/assets/aa9d36ea-0f78-48fb-8df4-1f42107dc116)
![blog5](https://github.com/user-attachments/assets/715eb042-f56a-4623-b55a-4a65a3ba0580)
![blog6](https://github.com/user-attachments/assets/9a4323de-468b-43ed-b503-b3ab618fc9fe)
![blog7](https://github.com/user-attachments/assets/d52d4325-ce55-4907-a7b0-bf02611aa187)
![blog8](https://github.com/user-attachments/assets/23249459-40d4-47c8-90b8-9eb2fbfec3a6)
![blog9](https://github.com/user-attachments/assets/f992f17b-8997-4a23-9f31-49a5c263b700)
![blog10](https://github.com/user-attachments/assets/29e84c75-df99-45e4-bbf5-a365c5ee9032)
![blog11](https://github.com/user-attachments/assets/4fbde076-5cf7-48dd-a80b-b8bb85ff90ac)


---

## 🧠 What I Learned
- Full-stack application architecture
- REST API design and integration
- MongoDB schema modeling
- Authentication & authorization using JWT
- React component structure and state management
- Handling real-world CRUD operations

---

