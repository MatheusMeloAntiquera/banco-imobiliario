import { expect } from "chai"
import rewire from 'rewire';
import { stub } from "sinon";
import Jogador, { Estrategia } from "../../../src/domain/entities/Jogador";
import Propriedade from "../../../src/domain/entities/Propriedade";

//Necessário usar o rewire para testar metodo privados
const simulaJogoModule = rewire("../../../src/domain/usecases/jogo/SimularJogo").__get__('SimularJogo');
const simularJogo = new simulaJogoModule();

describe("Testar a jogada de um dado de 6 faces", function () {
    it("Deve retornar um número entre 1 e 6", () => {
        const valorDado = simularJogo.jogarDado();

        expect(valorDado).to.be.a('number');
        expect(valorDado).to.be.oneOf([1, 2, 3, 4, 5, 6]);
    });
});

describe("Testar a ordenação de jogadores por saldo", function () {
    const jogadorA = new Jogador(Estrategia.EXIGENTE, (saldo: number, propriedade: Propriedade) => propriedade.valorAluguel > 50);
    const jogadorB = new Jogador(Estrategia.IMPULSIVO, (saldo: number, propriedade: Propriedade) => true);
    it("JogadorA tem MENOS saldo que JogadorB, retorna 1", () => {

        jogadorA.saldo = 200;
        jogadorB.saldo = 300;

        const resultado = simularJogo.ordernarPorSaldo(jogadorA, jogadorB);

        expect(resultado).to.be.a('number');
        expect(resultado).to.be.equal(1);
    });

    it("JogadorA tem MAIS saldo que JogadorB, retorna -1", () => {

        jogadorA.saldo = 500;
        jogadorB.saldo = 300;

        const resultado = simularJogo.ordernarPorSaldo(jogadorA, jogadorB);

        expect(resultado).to.be.a('number');
        expect(resultado).to.be.equal(-1);
    });

    it("JogadorA e JogadorB tem o mesmo saldo, retorna 0", () => {

        jogadorA.saldo = 500;
        jogadorB.saldo = 500;

        const resultado = simularJogo.ordernarPorSaldo(jogadorA, jogadorB);

        expect(resultado).to.be.a('number');
        expect(resultado).to.be.equal(0);
    });

});

describe("Testar a função que determina o vencedor caso o jogo alcance o máximo de rodadas", function () {
    const jogadorExigente = new Jogador(Estrategia.EXIGENTE, (saldo: number, propriedade: Propriedade) => propriedade.valorAluguel > 50);
    const jogadorImpulsivo = new Jogador(Estrategia.IMPULSIVO, (saldo: number, propriedade: Propriedade) => true);

    it("Deve retorna o vencedor pelo saldo maior", () => {

        jogadorExigente.saldo = 800
        jogadorImpulsivo.saldo = 780

        const vencedor = simularJogo.defineVencedorMaxRodadas([
            jogadorExigente,
            jogadorImpulsivo
        ]);

        expect(vencedor).to.deep.equal(jogadorExigente);
        expect(vencedor).to.not.equal(jogadorImpulsivo);
    });

    it("Deve retorna o vencedor que estava na frente na ordem de jogada em caso de saldo empatado", () => {

        const jogadorExigente = new Jogador(Estrategia.EXIGENTE, (saldo: number, propriedade: Propriedade) => propriedade.valorAluguel > 50);
        const jogadorImpulsivo = new Jogador(Estrategia.IMPULSIVO, (saldo: number, propriedade: Propriedade) => true);

        jogadorExigente.saldo = 800
        jogadorExigente.ordemDeJogada = 2;

        jogadorImpulsivo.saldo = 800
        jogadorImpulsivo.ordemDeJogada = 0;

        let vencedor = simularJogo.defineVencedorMaxRodadas([
            jogadorExigente,
            jogadorImpulsivo
        ]);

        expect(vencedor).to.deep.equal(jogadorImpulsivo);
        expect(vencedor).to.not.equal(jogadorExigente);

        jogadorExigente.saldo = 800
        jogadorExigente.ordemDeJogada = 1;

        jogadorImpulsivo.saldo = 800
        jogadorImpulsivo.ordemDeJogada = 4;

        vencedor = simularJogo.defineVencedorMaxRodadas([
            jogadorExigente,
            jogadorImpulsivo
        ]);

        expect(vencedor).to.deep.equal(jogadorExigente);
        expect(vencedor).to.not.equal(jogadorImpulsivo);
    });
});

describe("Testar a função que termina a próxima casa onde o jogador deverá ir", function () {
    const jogador = new Jogador(Estrategia.IMPULSIVO, (saldo: number, propriedade: Propriedade) => true);
    const simularJogo = new simulaJogoModule();

    stub(simularJogo, 'jogarDado').callsFake(() => 4)

    it("Ao cair em uma casa MENOR que 20 - Jogador está na casa 0 e deverá ir para casa 4", () => {
        const proximaCasa = simularJogo.defineProximaCasa(jogador);
        expect(proximaCasa).to.be.a('number');
        expect(proximaCasa).to.be.equal(3);
    });

    it("Ao cair em uma casa MAIOR que 20 - Jogador está na casa 20 e deverá ir para casa 4", () => {
        jogador.posicao = 19;
        const proximaCasa = simularJogo.defineProximaCasa(jogador);
        expect(proximaCasa).to.be.a('number');
        expect(proximaCasa).to.be.equal(3);
    });

});