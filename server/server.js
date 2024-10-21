const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/database');
const authRoutes = require('./routes/authRoutes');
const courseRoutes = require('./routes/courseRoutes');
const quizRoutes = require('./routes/quizRoutes');
const reportRoutes = require('./routes/reportRoutes');
const userRoutes = require('./routes/userRoutes');
const errorHandler = require('./middleware/errorHandler');
const cors = require('cors');
const cron = require('node-cron');
const https = require('http');

const app = express();
dotenv.config();
connectDB();

// CORS configuration
app.use(cors({
  origin: [process.env.FRONTEND_URL],
  methods: ["GET", "PUT", "DELETE", "POST"],
  credentials: true,
}));

app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/quizzes', quizRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/users', userRoutes);

// Home route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Hello World!"
  });
});

// Ping route for self-pinging
app.get('/ping', (req, res) => {
  res.send('Pong!');
  console.log('Ping received');
  message: "ping received"
});

// Error Handling Middleware
app.use(errorHandler);

// Server port from environment or default to 5000
const PORT = process.env.PORT || 5000;

// Starting the server
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Self-ping cron job setup to keep the server alive
cron.schedule('*/10 * * * *', () => {
  console.log('Self-pinging to keep the server alive...');

  const options = {
    hostname: process.env.APP_URL || 'localhost', // Use environment variable or fallback to localhost
    port: PORT,
    path: '/ping',
    method: 'GET'
  };

  const req = https.request(options, res => {
    console.log(`Self-ping response: ${res.statusCode}`);
    res.on('data', (chunk) => {
      console.log(`Response body: ${chunk}`);
    });
  });

  req.on('error', error => {
    console.error('Self-ping failed:', error.message);
    console.error('Error details:', error);
  });

  req.end();
});