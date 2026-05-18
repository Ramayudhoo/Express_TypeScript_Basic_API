import express, { Application } from "express";
import mainRoute from "./routes/index";
import { logMiddleware } from "./middleware/logMiddleware";
import { apiKeyMiddleware } from "./middleware/apikeyMiddleware";
import { errorHandler } from "./middleware/errorHandler";

const app: Application = express();
const PORT = 3000;

app.use(express.json());
app.use(logMiddleware);
app.use(apiKeyMiddleware);
app.use("/", mainRoute);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
