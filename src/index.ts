import express, { json } from "express";
import dotenv from "dotenv";
import router from "./routes";

dotenv.config();
const PORT = process.env.PORT;

const app = express();

app.use(express.json());
app.use(router);

app.get("/", (req, res) => {
  res.send("Hello World!!");
});

app.listen(PORT, () => {
  console.log("Server is running on port: " + PORT);
});
