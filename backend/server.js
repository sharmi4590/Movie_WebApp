import express from "express";
import cookieParser from "cookie-parser";
import path from "path";
import cors from "cors"; // Import the CORS package


import authRoutes from "./routes/auth.route.js";

import { ENV_VARS } from "./config/envVars.js";
import { connectDB } from "./config/db.js";

const app = express();

const PORT = ENV_VARS.PORT;
const __dirname = path.resolve();

// // Use CORS middleware
// const corsOptions = {
//   origin: ENV_VARS.NODE_ENV === 'production' ? 'https://movie-web-app-flame.vercel.app' : 'http://localhost:3000',
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   credentials: true,
// };
const corsOptions = {
  origin: 'https://movie-webapp-frontend-f8cf.onrender.com',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
};
app.use(cors(corsOptions));

app.use(express.json()); // will allow us to parse req.body
app.use(cookieParser());

app.use("/api/v1/auth", authRoutes);

if (ENV_VARS.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log("Server started at http://localhost:" + PORT);
  connectDB();
});