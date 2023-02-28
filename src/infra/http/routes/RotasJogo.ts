import { Router } from "express";
import { JogoControllerExpress } from "../../controllers";

const rotasJogo = Router();
const jogoControllerExpress = new JogoControllerExpress();

rotasJogo.get("/simular", jogoControllerExpress.simular);

export default rotasJogo;