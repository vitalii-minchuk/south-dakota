import express from "express";
import dotenv from "dotenv";
import router from "./routes";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(router);

app.get("/", (req, res) => {
  res.send("Hello World!!");
});

app.listen(PORT, () => {
  console.log("Server is running on port: " + PORT);
});
