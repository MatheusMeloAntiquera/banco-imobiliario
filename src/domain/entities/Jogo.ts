import Jogador from "./Jogador";
import Tabuleiro from "./Tabuleiro";

export default class Jogo {

    jogadores: Array<Jogador>;
    tabuleiro: Tabuleiro;
    rodada: number = 1;
}