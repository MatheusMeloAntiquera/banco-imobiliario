import { Router } from "express";
import JogoRouter from "./RotasJogo";

const routes = Router();
routes.use("/jogo", JogoRouter);

export default routes;