import express from "express";
import checkAuth from "../middleware/authMiddleware.js";
import {
  actualizarPerfil,
  autenticar,
  comprobarToken,
  confirmar,
  nuevoPassword,
  olvidePassword,
  perfil,
  registrar,
} from "../controllers/UserController.js";

const router = express.router();

//public routes
router.post("/", registrar);
router.get("/confirmar/:token", confirmar);
router.post("/login", autenticar);
router.post("/olvide-password", olvidePassword);
router.route("/olvide-password/:token").get(comprobarToken).post(nuevoPassword);

//private routes
router.get("/perfil", checkAuth, perfil);
router.put("/perfil/:id", checkAuth, actualizarPerfil);
router.put("/actulizar-password", checkAuth, actualizarPerfil);

export default router;
