import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoute.js";
import doctorRouter from "./routes/doctorRoute.js";
import adminRouter from "./routes/adminRoute.js";

// Load env variables
dotenv.config();

// Connect to DBs
connectDB();
connectCloudinary();

// App setup
const app = express();
const port = process.env.PORT || 4000;

// ✅ Allowed Origins for frontend
const allowedOrigins = [
  'https://care-link-admin.vercel.app',
  'https://carelink-beta.vercel.app'
];

// ✅ CORS config
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

// ✅ Middleware: CORS must be before routes
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

// ✅ Middleware: body parser
app.use(express.json());

// ✅ Routes
app.use("/api/user", userRouter);
app.use("/api/admin", adminRouter);
app.use("/api/doctor", doctorRouter);

// ✅ Health check
app.get("/", (req, res) => {
  res.send("API Working 🚀");
});

// Start server
app.listen(port, () => console.log(`✅ Server started on PORT: ${port}`));
