"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_openid_connect_1 = require("express-openid-connect");
const axios_1 = __importDefault(require("axios"));
const router = express_1.default.Router();
router.get("/", function (req, res, next) {
    res.render("index", {
        title: "Pagina de Inicio",
        isAuthenticated: req.oidc.isAuthenticated(),
    });
});
router.get("/profile", (0, express_openid_connect_1.requiresAuth)(), function (req, res, next) {
    res.render("profile", {
        userProfile: JSON.stringify(req.oidc.user, null, 2),
        title: "Perfil Pagina",
    });
});
//ruta para trabajar con api
router.get("/starwar", (0, express_openid_connect_1.requiresAuth)(), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { data: { results: starwarsPeople }, } = yield axios_1.default.get("https://swapi.dev/api/people/");
        res.render("startwar", {
            title: "Personajes de Star Wars",
            starwarsPeople,
            error: "",
        });
    }
    catch (error) {
        console.error(error);
        res.render("startwar", {
            title: "Personajes de Star Wars",
            starwarsPeople: [],
            error: "Fallo la carga de personajes",
        });
    }
}));
module.exports = router;
