import Propriedade from "../entities/Propriedade";
import Tabuleiro from "../entities/Tabuleiro";
import { Factory } from "./Factory";

export class TabuleiroFactory extends Factory<Tabuleiro> {
    public criar(): Tabuleiro {
        const tabuleiro = new Tabuleiro();
        tabuleiro.casas = this.criarCasas();

        return tabuleiro;
    }

    private criarCasas(): Array<Propriedade> {
        return [
            new Propriedade(20, 10),
            new Propriedade(50, 30),
            new Propriedade(15, 10),
            new Propriedade(80, 50),
            new Propriedade(100, 80),
            new Propriedade(120, 80),
            new Propriedade(60, 55),
            new Propriedade(20, 15),
            new Propriedade(20, 12),
            new Propriedade(80, 75),
            new Propriedade(55, 20),
            new Propriedade(75, 45),
            new Propriedade(40, 25),
            new Propriedade(10, 5),
            new Propriedade(30, 20),
            new Propriedade(150, 90),
            new Propriedade(180, 100),
            new Propriedade(90, 85),
            new Propriedade(45, 20),
            new Propriedade(20, 10)
        ];
    }
}