import { config } from "dotenv";
if (process.env.NODE_ENV !== "production") {
  config(); //loads the .env file into `process.env`
}

import express from "express";
import mongoose from "mongoose";
import session from "express-session";
import MongoStore from "connect-mongo";
import passport from "passport";
import cors from "cors";
import helmet from "helmet";
import expressMongoSanitize from "express-mongo-sanitize";
import { Strategy as LocalStrategy } from "passport-local";

import User from "./models/User.js";

import userRoutes from "./routes/userRoutes.js";
import currencyRoutes from "./routes/currencyRoutes.js";

const app = express();
const port = process.env.PORT!;

mongoose.set("strictQuery", true);
mongoose
  .connect(process.env.DB_URL! || process.env.local_DB_URL!)
  .then(() => {
    console.log("Database connected.");
  })
  .catch((err) => {
    console.log("DB connection error: ", err);
  });

const allowedOrigins = [
  process.env.FRONTEND_URL,
  process.env.local_FRONTEND_URL,
  process.env.local_preview_FRONTEND_URL,
].filter(Boolean); //removes any undefined values

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true); //allow request
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(express.json()); //parse JSON request bodies
app.use(express.urlencoded({ extended: true }));

const store = MongoStore.create({
  mongoUrl: process.env.DB_URL! || process.env.local_DB_URL!,
  touchAfter: 24 * 60 * 60,
  crypto: {
    secret: process.env.SECRET!,
  },
});
store.on("error", function (e) {
  console.log("SESSION STORE ERROR", e);
});

const sessionConfig = {
  store,
  name: "session",
  secret: process.env.SECRET!,
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    // secure: process.env.NODE_ENV === "production", // only allow cookies over HTTPS, may cause errors in prod
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
};
app.use(session(sessionConfig));
app.use(expressMongoSanitize());
app.use(helmet());

/* define passport behavior */
app.use(passport.initialize());
app.use(passport.session()); //maintain session and handle cookies

passport.use(
  new LocalStrategy(
    {
      usernameField: "email", //use email instead of username
      passwordField: "password",
    },
    User.authenticate()
  )
);

passport.serializeUser(User.serializeUser()); //store user info in cookie, after successful login
passport.deserializeUser(User.deserializeUser()); //fetches the req.user info from db if an active session exists
/* */

app.use("/currencies", currencyRoutes);
app.use("/", userRoutes);

app.use(
  (
    err: any,
    _req: express.Request,
    res: express.Response,
    _next: express.NextFunction
  ) => {
    if (!err.message) err.message = "Something Went Wrong!";
    res.status(err.statusCode || 500).json({ error: err.message });
  }
);

app.listen(port, () => {
  console.log(`Serving on port ${port}.`);
});
