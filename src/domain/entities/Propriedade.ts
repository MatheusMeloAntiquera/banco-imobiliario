import Jogador from "./Jogador";

export default class Propriedade {

    proprietario?: Jogador;
    valorCompra: number;
    valorAluguel: number;

    constructor(valorCompra: number, valorAluguel: number) {
        this.valorCompra = valorCompra;
        this.valorAluguel = valorAluguel;
    }
}