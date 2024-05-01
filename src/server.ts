import express from "express";
import http from "http";
import createError from "http-errors";
import path from "path";
import logger from "morgan";
import dotenv from "dotenv";
import { auth } from "express-openid-connect";

const routerFile = require("./routes/index");

dotenv.load();

const app = express();

//trabajamos con ejs
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.static(path.join(__dirname, "public")));

app.use(express.json());

const config = {
  authRequired: false,
  auth0Logout: true,
  baseURL:
    process.env.BASE_URL || `http://localhost:${process.env.PORT || 3000}`,
};

app.use(auth(config));

app.use(function (req: express.Request, res: express.Response, next: express.NextFunction) {
  res.locals.user = req.oidc.user;
  next();
});

//trae las rutas
app.use("/", routerFile);

//====MANEJO DE ERRORES====//
//====NO ENCONTRADO====//
app.use(function (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  next(createError(404, "No Encontrado"));
});

app.use(function (
  err: ErrorWithStatus,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  res.status(err.status || 500);
  res.render("error", {
    message: err.message,
    error: process.env.NODE_ENV !== "production" ? err : {},
  });
});

const server = http.createServer(app);
server.listen(process.env.PORT || 3000, () => {
  console.log(`Listening on ${config.baseURL}`);
});
