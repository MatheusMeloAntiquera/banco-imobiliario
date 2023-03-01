import Propriedade from "./Propriedade";

export default class Jogador {
    constructor(estrategia: Estrategia, jogadorCompraOuNao: Jogador["jogadorCompraOuNao"]) {
        this.estrategia = estrategia;
        this.jogadorCompraOuNao = jogadorCompraOuNao;
    }

    public estrategia: Estrategia;
    public saldo: number = 300;
    posicao: number = 0;
    ordemDeJogada: number;
    jogadorCompraOuNao: (saldo: number, propriedade: Propriedade) => boolean;
}

export enum Estrategia {
    CAUTELOSO = 'cauteloso',
    ALEATORIO = 'aleatorio',
    EXIGENTE = 'exigente',
    IMPULSIVO = 'impulsivo'
}