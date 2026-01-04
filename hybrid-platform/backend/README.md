# DiscourseSpace Backend API

Backend API server for the DiscourseSpace platform built with Express.js and MongoDB.

## Features

- RESTful API endpoints for blogs, discussions, users, comments, and bookmarks
- MongoDB database integration with Mongoose
- JWT-based authentication
- Admin panel support
- Data validation and error handling

## Installation

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file (copy from `.env.example`):
```bash
cp .env.example .env
```

4. Update `.env` with your MongoDB connection string:
```
PORT=4000
NODE_ENV=development
JWT_SECRET=your-secret-key-change-in-production
MONGODB_URI=mongodb://localhost:27017/discoursespace
```

## MongoDB Connection String

### Using MongoDB Compass Connection String:

1. Open MongoDB Compass
2. Click "Connect" or use an existing connection
3. Click the connection name → "Copy connection string"
4. The connection string will look like:
   ```
   mongodb://localhost:27017/
   ```
   or for MongoDB Atlas (cloud):
   ```
   mongodb+srv://username:password@cluster.mongodb.net/discoursespace?retryWrites=true&w=majority
   ```

5. Paste it in your `.env` file:
   ```
   MONGODB_URI=mongodb://localhost:27017/discoursespace
   ```
   (Add your database name at the end, e.g., `/discoursespace`)

### Local MongoDB:
```
MONGODB_URI=mongodb://localhost:27017/discoursespace
```

### MongoDB Atlas (Cloud):
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/discoursespace?retryWrites=true&w=majority
```

## Running the Server

### Development mode (with auto-reload):
```bash
npm run dev
```

### Production mode:
```bash
npm start
```

The server will run on `http://localhost:4000` by default.

## API Endpoints

### Blogs
- `GET /api/blogs` - Get all blogs (supports query: ?category=Technology&search=ai&sortBy=likes)
- `GET /api/blogs/:id` - Get blog by ID
- `POST /api/blogs` - Create new blog
- `PUT /api/blogs/:id` - Update blog
- `DELETE /api/blogs/:id` - Delete blog
- `POST /api/blogs/:id/like` - Toggle like on blog (body: { userId: "user123" })

### Discussions
- `GET /api/discussions` - Get all discussions
- `GET /api/discussions/:id` - Get discussion by ID
- `POST /api/discussions` - Create new discussion
- `PUT /api/discussions/:id` - Update discussion
- `DELETE /api/discussions/:id` - Delete discussion
- `POST /api/discussions/:id/like` - Toggle like on discussion

### Users
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `GET /api/users/username/:username` - Get user by username
- `POST /api/users` - Create new user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Comments
- `GET /api/comments/post/:postId/:postType` - Get comments for a post
- `POST /api/comments/post/:postId/:postType` - Create comment
- `PUT /api/comments/:id` - Update comment
- `DELETE /api/comments/:id` - Delete comment
- `POST /api/comments/:id/like` - Toggle like on comment

### Bookmarks
- `GET /api/bookmarks/user/:userId` - Get user bookmarks
- `POST /api/bookmarks/toggle` - Toggle bookmark (body: { userId, postId, postType })
- `GET /api/bookmarks/check` - Check if post is bookmarked (?userId=123&postId=456&postType=blog)
- `DELETE /api/bookmarks/:id` - Delete bookmark

### Authentication
- `POST /api/auth/register` - Register new user (body: { username, email, password })
- `POST /api/auth/login` - Login user (body: { email, password, isAdmin? })
- `GET /api/auth/verify` - Verify JWT token (header: Authorization: Bearer <token>)

### Health Check
- `GET /api/health` - Server health check

## Project Structure

```
backend/
├── config/
│   └── database.js          # MongoDB connection
├── controllers/             # Business logic
│   ├── blogController.js
│   ├── discussionController.js
│   ├── userController.js
│   ├── commentController.js
│   ├── bookmarkController.js
│   └── authController.js
├── models/                  # Mongoose schemas
│   ├── BlogModel.js
│   ├── DiscussionModel.js
│   ├── UserModel.js
│   ├── CommentModel.js
│   └── BookmarkModel.js
├── routes/                  # API routes
│   ├── blogRoutes.js
│   ├── discussionRoutes.js
│   ├── userRoutes.js
│   ├── commentRoutes.js
│   ├── bookmarkRoutes.js
│   └── authRoutes.js
├── middleware/              # Custom middleware
│   └── authMiddleware.js
├── server.js                # Server entry point
├── package.json             # Dependencies
├── .env                     # Environment variables (not in git)
└── .env.example             # Environment variables template
```

## Database Models

### Blog
- title, content, author, category, tags
- likes, likedBy, comments, views
- timestamps (createdAt, updatedAt)

### Discussion
- Same structure as Blog

### User
- username, email, password (hashed)
- isAdmin, bio, location, credibility
- followers, following, communities

### Comment
- postId, postType, author, content
- likes, likedBy

### Bookmark
- userId, postId, postType

## Notes

- Passwords are automatically hashed using bcrypt before saving
- JWT tokens expire after 7 days
- Admin credentials for demo: `admin@discoursespace.com` / `admin123`
- All timestamps are automatically managed by Mongoose
- Database connection is established on server start

## Troubleshooting

### MongoDB Connection Issues:

1. **Make sure MongoDB is running:**
   - Local: Check if MongoDB service is running
   - Atlas: Verify your IP is whitelisted and credentials are correct

2. **Check connection string format:**
   - Local: `mongodb://localhost:27017/discoursespace`
   - Atlas: `mongodb+srv://user:pass@cluster.mongodb.net/dbname`

3. **Verify database name:**
   - The database will be created automatically if it doesn't exist

4. **Check firewall/network:**
   - Ensure port 27017 is open (local) or network access is allowed (Atlas)

## Next Steps

1. Add input validation using express-validator
2. Add rate limiting
3. Add request logging
4. Add comprehensive error handling
5. Add API documentation (Swagger/OpenAPI)
6. Add pagination for list endpoints
7. Add file upload support for images
