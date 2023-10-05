import express from "express";
import {
  getTramites,
  getTramite,
  addTramite,
  updateTramite,
} from "../controllers/tramites.controller.js";
import { validateAuth } from "../domain/crypto.js";

const tramitesRouter = express.Router();

// ValidateAuth es el middleware que valida rutas con autenticacion

tramitesRouter.get("/tramites/", validateAuth, getTramites);
tramitesRouter.get("/tramite/:id", validateAuth, getTramite);
tramitesRouter.post("/tramites/", validateAuth, addTramite);
tramitesRouter.put("/tramite/:id", validateAuth, updateTramite);

export default tramitesRouter;

