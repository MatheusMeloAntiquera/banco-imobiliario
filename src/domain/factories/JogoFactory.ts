import Jogador, { Estrategia } from "../entities/Jogador";
import Jogo from "../entities/Jogo";
import Propriedade from "../entities/Propriedade";
import { Factory } from "./Factory";
import { JogadorFactory } from "./JogadorFactory";
import { TabuleiroFactory } from "./TabuleiroFactory";

export class JogoFactory extends Factory<Jogo> {
    public criar(): Jogo {
        const jogo = new Jogo();
        jogo.tabuleiro = new TabuleiroFactory().criar();
        jogo.jogadores = this.criarJogadores();

        return jogo;
    }

    private criarJogadores(): Array<Jogador> {
        const jogadorFactory = new JogadorFactory();

        const jogadores = [
            jogadorFactory.criar(Estrategia.IMPULSIVO, (saldo: number, propriedade: Propriedade) => true),
            jogadorFactory.criar(Estrategia.EXIGENTE, (saldo: number, propriedade: Propriedade) => propriedade.valorAluguel > 50),
            jogadorFactory.criar(Estrategia.CAUTELOSO, (saldo: number, propriedade: Propriedade) => (saldo - propriedade.valorCompra) >= 80),
            jogadorFactory.criar(Estrategia.ALEATORIO, (saldo: number, propriedade: Propriedade) => (Math.floor(Math.random() * 1)) > 0)
        ];

        //Gera uma ordem aletória de jogo
        for (let posicaoAtual = jogadores.length - 1; posicaoAtual > 0; posicaoAtual--) {
            const novaPosicao = Math.floor(Math.random() * (posicaoAtual + 1));
            [jogadores[posicaoAtual], jogadores[novaPosicao]] = [jogadores[novaPosicao], jogadores[posicaoAtual]];
        }

        return jogadores.map((jogador, indice) => {
            jogador.ordemDeJogada = indice;
            return jogador;
        });
    }
}