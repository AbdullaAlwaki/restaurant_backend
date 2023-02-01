import express, { json, urlencoded } from "express";
import router  from "./router/user.router.js";
import { db }  from "./helper/db.js";
import cors from "cors";

db();
const app = express();
const port = process.env.PORT || 5000;
app.use(json());
app.use(urlencoded({ extended: true }));

const corsOption = {
  origin: ["http://localhost:3000", "https://abdullaalwaki.github.io"],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
};
app.use(cors(corsOption));
app.use(cors())
app.use("/api", router);
app.listen(port, () =>
  console.log(`Listening on port http://localhost:${port}`)
);
