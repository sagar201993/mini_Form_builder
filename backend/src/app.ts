import express from "express";
import dotenv from "dotenv";
import authRouter from "./routes/authRoute.js";
import formRouter from "./routes/formRoute.js";
import { prisma } from "./prisma/client.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

// Routes
app.use("/api/auth", authRouter);
app.use("/api/forms", formRouter);

// Database connection
prisma
  .$connect()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((error: any) => {
    console.error("Database connection failed:", error);
    process.exit(1);
  });
