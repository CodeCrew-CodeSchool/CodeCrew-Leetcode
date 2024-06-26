import appConfig from "./config/appConfig";
const express = require("express");
const cors = require("cors");
import problemsRouter from "./routes/problemRoutes"
import gameRoomRouter from "./routes/gameRoomRoutes"
import sessionMiddleware from "./middleware/sessionMiddleware"
const app = express();
appConfig.ENVIRONMENT === "PRODUCTION" && app.set('trust proxy', 1) // trust first proxy

app.use(cors({
  origin: appConfig.CORS_URLS,
  credentials: true
}));

app.use(express.json());
app.use(sessionMiddleware);
app.use(problemsRouter);
app.use(gameRoomRouter);

export default app;