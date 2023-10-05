import express from "express";
import dotenv from "dotenv"
import mainRouter from "./routes/mainRoutes.js";
import cors from "cors"

const app = express();
const port = 4000;

/**
 * middlewares 
 */
app.use(cors())
app.use(express.json());
app.use(mainRouter);



/**
 * server
 */

app.listen(4000, ()=> {
    console.log("***** SERVIDOR CORRIENDO EN PUERTO ",port, "*****" )
});