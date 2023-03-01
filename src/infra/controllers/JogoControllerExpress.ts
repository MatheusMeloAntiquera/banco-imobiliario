import { Request, Response } from "express";
import SimularJogo from "../../domain/usecases/jogo/SimularJogo";

export class JogoControllerExpress {
    public async simular(request: Request, response: Response): Promise<Response> {
        return response.json(await new SimularJogo().executar());
    }
}