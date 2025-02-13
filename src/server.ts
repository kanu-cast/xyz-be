import dotenv from "dotenv";
dotenv.config();
import { dbConnect } from "./config/db.config";
import express from "express";
import userRoutes from "./routes/userRoutes";
import inventoryRoutes from "./routes/inventoryRoutes";
import borrowingRoutes from "./routes/borrowingRoutes";
import peopleRoutes from "./routes/peopleRoutes";
import damageReportsRoutes from "./routes/damageReportsRoutes";
import systemLogsRoutes from "./routes/systemLogsRoutes";
import { sequelize } from "./config/db.config";
import { errorHandler } from "./middlewares/errorHandler";

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/api/auth", userRoutes);
app.use("/api/inventory", inventoryRoutes);
app.use("/api/borrowing", borrowingRoutes);
app.use("/api/people", peopleRoutes);
app.use("/api/damage-reports", damageReportsRoutes);
app.use("/api/logs", systemLogsRoutes);

// Error handling middleware
app.use(errorHandler);

// Sync database and start server
sequelize
  .sync()
  .then(() => {
    console.log("Database synced");
    app.listen(3000, () => {
      console.log("Server is running on http://localhost:3000");
    });
  })
  .catch((error) => {
    console.error("Failed to sync database:", error);
  });
dbConnect();
