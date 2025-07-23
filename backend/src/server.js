import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routes/NotesRoutes.js";
import { connectDb } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";

const app = express();

dotenv.config();

// Midddleware
app.use(express.json());
app.use((req, res, next) => {
  console.log(`Req method is ${req.method} & Req URL is ${req.url}`);
  next();
});
app.use(rateLimiter);
app.use(cors({
  origin : "http://localhost:5173",
}))

app.use("/api/notes", router);

connectDb().then(() =>
  app.listen(process.env.PORT, () => {
    console.log("Server Started at port : ", process.env.PORT);
    console.log(
      "Visit the URL : http://localhost:5001/api/notes  to get into the main page!!"
    );
  })
);
