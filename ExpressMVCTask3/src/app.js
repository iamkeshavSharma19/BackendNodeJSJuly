import dotenv from "dotenv";
dotenv.config({ quiet: true });
import express from "express";
import { connectDB } from "./config/database.js";
import wrestlerRoutes from "./routes/wrestlers-routes.js";

const PORT = process.env.PORT || 19;

const app = express();

app.use(express.json());
app.use("/api/v1", wrestlerRoutes);

connectDB()
  .then(() => {
    console.log("Database Connection Established Successfully");
    app.listen(PORT, (err) => {
      if (err) console.log(err);
      console.log(`Server is successfully listening on the port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Database connection cannot be established");
  });

  