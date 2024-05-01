"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const http_errors_1 = __importDefault(require("http-errors"));
const path_1 = __importDefault(require("path"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_openid_connect_1 = require("express-openid-connect");
const routerFile = require("./routes/index");
dotenv_1.default.load();
const app = (0, express_1.default)();
//trabajamos con ejs
app.set("views", path_1.default.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.static(path_1.default.join(__dirname, "public")));
app.use(express_1.default.json());
const config = {
    authRequired: false,
    auth0Logout: true,
    baseURL: process.env.BASE_URL || `http://localhost:${process.env.PORT || 3000}`,
};
app.use((0, express_openid_connect_1.auth)(config));
app.use(function (req, res, next) {
    res.locals.user = req.oidc.user;
    next();
});
//trae las rutas
app.use("/", routerFile);
//====MANEJO DE ERRORES====//
//====NO ENCONTRADO====//
app.use(function (req, res, next) {
    next((0, http_errors_1.default)(404, "No Encontrado"));
});
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render("error", {
        message: err.message,
        error: process.env.NODE_ENV !== "production" ? err : {},
    });
});
const server = http_1.default.createServer(app);
server.listen(process.env.PORT || 3000, () => {
    console.log(`Listening on ${config.baseURL}`);
});
