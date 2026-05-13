import express, { Application } from "express";
import mainRoute from "./routes/index";

const app: Application = express();
const PORT = 3000;

app.use(express.json());

app.use("/", mainRoute);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
