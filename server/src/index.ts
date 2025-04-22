import express, { Request, Response, NextFunction } from "express";
import userRoute from "./routes/UserRoute";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { resturentRoute } from "./routes/ResturentRoutes";
import orderRoute from "./routes/orderRoute";
import menuRoute from "./routes/MenuRoute";
import connectDB from "./utils/DB";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
dotenv.config();

connectDB();

const app = express();
const PORT = process.env.PORT || 5200;

// const _dirname = path.resolve();

app.use(bodyParser.json({ limit: "10mb" })); // Parses JSON requests
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "https://app-1-production-37ee.up.railway.app",
    credentials: true,
  })
);

app.use("/api/v1/auth", userRoute);
app.use("/api/v1/resturent", resturentRoute);
app.use("/api/v1/menu", menuRoute);
app.use("/api/v1/order", orderRoute);

app.use(express.static(path.resolve(__dirname, "../../front/dist")));

// Handle all other routes by serving the React app
app.get("*", (req: Request, res: Response, next: NextFunction) => {
  res.sendFile(
    path.resolve(__dirname, "../../front/dist", "index.html"),
    (err) => {
      if (err) {
        next(err);
      }
    }
  );
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;
