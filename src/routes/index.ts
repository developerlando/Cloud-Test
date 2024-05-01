import express from "express";
import { requiresAuth } from "express-openid-connect";
import axios from "axios";

const router = express.Router();

router.get("/", function (req: express.Request, res: express.Response, next: express.NextFunction) {
  res.render("index", {
    title: "Pagina de Inicio",
    isAuthenticated: req.oidc.isAuthenticated(),
  });
});

router.get(
  "/profile",
  requiresAuth(),
  function (req: express.Request, res: express.Response, next: express.NextFunction) {
    res.render("profile", {
      userProfile: JSON.stringify(req.oidc.user, null, 2),
      title: "Perfil Pagina",
    });
  }
);

//ruta para trabajar con api
router.get(
  "/starwar",
  requiresAuth(),
  async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
      const {
        data: { results: starwarsPeople },
      } = await axios.get("https://swapi.dev/api/people/");

      res.render("startwar", {
        title: "Personajes de Star Wars",
        starwarsPeople,
        error: "",
      });
    } catch (error) {
      console.error(error);
      res.render("startwar", {
        title: "Personajes de Star Wars",
        starwarsPeople: [],
        error: "Fallo la carga de personajes",
      });
    }
  }
);

module.exports = router;
