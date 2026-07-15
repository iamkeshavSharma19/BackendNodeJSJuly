import dotenv from "dotenv";
dotenv.config({ quiet: true });
import express from "express";
import { connectDB } from "./config/database.js";
import bookRoutes from "./routes/book-routes.js";

const PORT = process.env.PORT || 9999;
const app = express();

app.use(express.json());
app.use("/api/v1", bookRoutes);

connectDB()
  .then(() => {
    console.log("Database Connection Established");
    app.listen(PORT, (err) => {
      if (err) {
        console.log(err);
      }
      console.log(`Server is listening on the port ${PORT}`);
    });
  })
  .catch(() => {
    console.log("Database cannot be connected");
  });
