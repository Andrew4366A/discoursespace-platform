const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/discoursespace';
    
    const conn = await mongoose.connect(mongoURI, {
      // These options are recommended for newer versions of Mongoose
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    console.log(`📊 Database: ${conn.connection.name}`);
  } catch (error) {
    console.error(`❌ Error connecting to MongoDB: ${error.message}`);
    console.error(`⚠️  Make sure MongoDB is running and your connection string is correct in .env file`);
    console.error(`⚠️  Server will continue but database operations will fail`);
    // Don't exit - allow server to start without DB for development
    // process.exit(1);
  }
};

module.exports = connectDB;

