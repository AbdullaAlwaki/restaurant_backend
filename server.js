const express = require("express");
const { router } = require("./router/user.router.js");
const { db } = require("./helper/db");

db();
const app = express();
const port = process.env.PORT || 5000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", router);

// .use(cors)
app.listen(port, () =>
  console.log(`Listening on port http://localhost:${port}`)
);
