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

app.use(cors());
app.use(express.json());


// basic security
app.use(helmet());
app.disable('x-powered-by');


// logging (dev)
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}


// CORS for frontend
app.use(
  cors({
    origin: [process.env.CLIENT_URL || 'http://localhost:3000', 'http://localhost:8080', 'http://localhost:5173'],
    credentials: true
  })
);



// rate limit for auth endpoints
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: 'Too many requests from this IP, please try again later'
});


app.use('/api/auth', authLimiter);


// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

app.use('/api/opportunities', require('./routes/opportunityRoutes'));

app.get("/", (req, res) => {
  res.send("Backend is working!");
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

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>  console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`));