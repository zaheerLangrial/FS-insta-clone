import express, { urlencoded } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { ConnectDB } from "./utils/db.js";
dotenv.config();
import userRoute from "./routes/user.route.js";
import postRoute from "./routes/post.route.js";
import messageRoute from "./routes/message.route.js";

const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(
  urlencoded({
    extended: true,
  })
);
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};

app.use(cors(corsOptions));

app.get("/", (_, res) => {
  return res.status(200).json({
    message: "I'm coming from backend",
    success: true,
  });
});

// Api Routes

app.use("/api/v1/user", userRoute);
app.use("/api/v1/post", postRoute);
app.use("/api/v1/message", messageRoute);

app.listen(process.env.PORT, () => {
  ConnectDB();
  console.log("Server listen at port " + process.env.PORT);
});
