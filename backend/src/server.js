import express from "express";
import "./db/mongoose.js";
import userRouter from "./routers/user.js";

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

import cors from "cors";

app.use(cors());

app.use(userRouter);

app.listen(port, () => {
  console.log("Server is on port", port);
});
