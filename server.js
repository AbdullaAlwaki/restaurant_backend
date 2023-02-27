import express, { json, urlencoded } from "express";
import { db } from "./helper/db.js";
import cors from "cors";
import UserRouter from "./router/user.router.js";
import AddDishesRouter from "./router/addDishes.router.js";
import ContactRouter from "./router/contact.router.js";
import tableRouter from "./router/table.router.js";
import cookieParser from "cookie-parser";

// import morgan from "morgan";

db();
const app = express();
app.use(cookieParser());
app.use(json());
app.use(urlencoded({ extended: true }));

const corsOption = {
  origin: ["http://localhost:3000", "https://mern-restaurant.onrender.com"],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
};


// morgan("tiny");
app.use(cors(/* corsOption */));

app.use("/api", UserRouter);
app.use("/api", AddDishesRouter);
app.use("/api", ContactRouter);
app.use("/api", tableRouter);

const port = process.env.PORT || 5000;
app.listen(port, () =>
  console.log(`Listening on port http://localhost:${port}`)
);
