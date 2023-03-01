import Jogador, { Estrategia } from "../entities/Jogador";
import { Factory } from "./Factory";

export class JogadorFactory extends Factory<Jogador> {
    public criar(estrategia: Estrategia, jogadorCompraOuNao: Jogador["jogadorCompraOuNao"]): Jogador {
        return new Jogador(estrategia, jogadorCompraOuNao);
    }
}