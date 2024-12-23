import { Dado } from "./dado";
import Jogador from "./jogador";

export default interface Jogo {
  jogadores: Jogador[];
  ordemJogadores: number[];
  dados: Dado[];
  turno: number;
  vencedor: Jogador | null;
}
