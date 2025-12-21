const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();

// CORS for frontend
app.use(
  cors({
    origin: ["http://localhost:8080"],
    credentials: true,
  })
);

// basic security
app.use(helmet());
app.disable('x-powered-by');

// logging (dev)
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// body parser
app.use(express.json());
app.use("/api/users", require("./routes/userRoutes"));




// rate limit for auth endpoints
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: 'Too many requests from this IP, please try again later'
});

app.use('/api/auth', authLimiter);

// routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

// health check
app.get('/', (req, res) => {
  res.json({ message: 'WasteZero API up and running' });
});

// global error handler (simple)
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  const status = err.statusCode || 500;
  const msg =
    process.env.NODE_ENV === 'production'
      ? 'Server error'
      : err.message || 'Server error';
  res.status(status).json({ message: msg });
});

const PORT = process.env.PORT || 2000;
app.listen(PORT, () =>
  console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`)
);