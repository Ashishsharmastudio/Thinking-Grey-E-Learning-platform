const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/database');
const authRoutes = require('./routes/authRoutes');
const courseRoutes = require('./routes/courseRoutes');
const quizRoutes = require('./routes/quizRoutes');
const reportRoutes = require('./routes/reportRoutes');
const errorHandler = require('./middleware/errorHandler');
const userRoutes = require('./routes/userRoutes');
const cors = require('cors');


const app = express();
dotenv.config();
connectDB();

// Flexible CORS configuration
app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "PUT", "DELETE", "POST"],
    credentials: true,
  })
);

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/quizzes', quizRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/users', userRoutes);

app.get("/", (req,res,next) => {
  return res.status(200).json({
    success: true,
    message: "Hello World!"
  });
});

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



































// const express = require('express');
// const dotenv = require('dotenv');
// const connectDB = require('./config/database');
// const authRoutes = require('./routes/authRoutes');
// const courseRoutes = require('./routes/courseRoutes');
// const quizRoutes = require('./routes/quizRoutes');
// const reportRoutes = require('./routes/reportRoutes');
// const errorHandler = require('./middleware/errorHandler');
// const userRoutes = require('./routes/userRoutes');

// dotenv.config();
// connectDB();

// const app = express();

// app.use(express.json());

// app.use('/api/auth', authRoutes);
// app.use('/api/courses', courseRoutes);
// app.use('/api/quizzes', quizRoutes);
// app.use('/api/reports', reportRoutes);
// app.use('/api/users', userRoutes);

// app.use(errorHandler);

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
