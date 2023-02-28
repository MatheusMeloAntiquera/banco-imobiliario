import { Request, Response } from "express";

export class JogoControllerExpress {
    public async simular(request: Request, response: Response): Promise<Response> {
        return response.json({ success: true });
    }
}