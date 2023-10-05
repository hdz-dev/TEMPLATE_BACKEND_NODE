import express from "express";
import userRoutes from "./user.routes.js";
import tramitesRoutes from "./tramites.routes.js";



const mainRouter = express.Router();

// mainRouter.use("/", (req, res) => {
//   res.send("hola");
//   console.log("index");
// });

mainRouter.use("/", userRoutes);
mainRouter.use("/", tramitesRoutes);



// Resto de las rutas y enrutadores

export default mainRouter;
