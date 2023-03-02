import Jogador from "../../entities/Jogador";
import Jogo from "../../entities/Jogo";
import Propriedade from "../../entities/Propriedade";
import { JogoFactory } from "../../factories/JogoFactory";

export default class SimularJogo {
    private jogo: Jogo;

    constructor() {
        this.jogo = new JogoFactory().criar();
    }

    public async executar() {
        const jogadoresAtivos = this.jogo.jogadores.map((x) => Object.assign({}, x));
        let rodadaMaxAlcancada = false;

        //Continua o jogo até restar um jogador ou a rodada máxima foi alcançada
        while (jogadoresAtivos.length > 1 && !rodadaMaxAlcancada) {
            jogadoresAtivos.forEach((jogador, indice) => {

                const proximaCasa = this.defineProximaCasa(jogador);

                this.jogadorCompraOuAluga(jogador, proximaCasa, this.jogo.tabuleiro.casas[proximaCasa]);

                //Jogador com saldo negativo é eliminado do jogo
                if (jogador.saldo < 0) {
                    jogadoresAtivos.splice(indice, 1);
                    this.jogo.tabuleiro.casas = this.jogo.tabuleiro.casas.map((propriedade) => {
                        if (propriedade.proprietario == jogador) {
                            propriedade.proprietario = undefined;
                        }
                        return propriedade;
                    })
                }

                jogador.posicao = proximaCasa;

                //Rodada máxima também finaliza o jogo
                if (this.jogo.rodada == 1000) {
                    rodadaMaxAlcancada = true;
                } else {
                    this.jogo.rodada++;
                }
            })
        }
        const vencedor: Jogador = rodadaMaxAlcancada ? this.defineVencedorMaxRodadas(jogadoresAtivos) : jogadoresAtivos[0];
        this.jogo.jogadores.sort(this.ordernarPorSaldo)

        return {
            vencendor: vencedor.estrategia,
            rodadasJogadas: this.jogo.rodada,
            jogadores: this.jogo.jogadores.map((jogador) => { return { estrategia: jogador.estrategia, saldo: jogador.saldo, ordemDeJogada: jogador.ordemDeJogada + 1} }),
        }
    }

    private jogarDado(): number {
        return Math.floor(Math.random() * 5) + 1;
    }

    private defineVencedorMaxRodadas(jogadoresFinalista: Array<Jogador>): Jogador {
        //Primeiro ordena por saldo
        jogadoresFinalista.sort(this.ordernarPorSaldo);
        let max: number = 0;
        max = jogadoresFinalista.reduce((max, jogadorAtual) => {
            return Math.max(max, jogadorAtual.saldo)
        }, max);
        let vencedor = Object.assign({}, jogadoresFinalista[0]);
        return jogadoresFinalista.reduce(
            (vencedor, jogadorAtual) => jogadorAtual.saldo == max && jogadorAtual.ordemDeJogada < vencedor.ordemDeJogada ? jogadorAtual : vencedor,
            vencedor)
    }

    private ordernarPorSaldo(jogadorA: Jogador, jogadorB: Jogador): 1 | -1 | 0 {
        if (jogadorA.saldo < jogadorB.saldo) {
            return 1;
        }
        return jogadorA.saldo > jogadorB.saldo ? -1 : 0;
    }

    private defineProximaCasa(jogador: Jogador) {
        let proximaCasa = this.jogarDado() + jogador.posicao;
        if (proximaCasa > 19) {
            proximaCasa = proximaCasa - 19;
            jogador.saldo += 100;
        }

        return proximaCasa - 1;
    }

    public jogadorCompraOuAluga(jogador: Jogador, proximaCasa: number, propriedade: Propriedade) {
        //Verifica se a propriedade tem dono
        if (propriedade.proprietario == undefined) {
            //Não tem proprietário, então verifica se o jogador irá comprar a propriedade ou não
            if (jogador.jogadorCompraOuNao(jogador.saldo, propriedade)) {
                this.jogo.tabuleiro.casas[proximaCasa].proprietario = jogador;
                jogador.saldo = jogador.saldo - propriedade.valorCompra;

            }
        } else {
            //A propriedade não está vazia e o proprietário não é o jogador atual, então cobra o aluguel
            if (propriedade.proprietario !== jogador) {
                jogador.saldo -= propriedade.valorAluguel
                propriedade.proprietario.saldo += propriedade.valorAluguel
            }
        }

        //Atualiza o saldo inicial do jogador
        this.jogo.jogadores[jogador.ordemDeJogada].saldo = jogador.saldo
    }

    public eliminaJogador(jogadoresAtivos: Array<Jogador>, posicaoDoJogador: number) {
        const jogador = jogadoresAtivos[posicaoDoJogador];
        jogadoresAtivos.splice(posicaoDoJogador, 1);
        this.jogo.tabuleiro.casas = this.jogo.tabuleiro.casas.map((propriedade) => {
            if (propriedade.proprietario == jogador) {
                propriedade.proprietario = undefined;
            }
            return propriedade;
        })

    }
}