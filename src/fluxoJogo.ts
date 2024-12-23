import { Dado } from "types/dado";
import Jogador from "types/jogador";
import Jogo from "types/jogo";
import {
  calcularPontuacao,
  definirOrdemJogadores,
  imagensDado,
  lancarDado,
} from "utils/functions";

const escolherDados = (dadosLancados: Dado[]): Dado[] => {
  // Simulando a escolha dos dados pelo jogador (exemplo: escolher dados com valor 1 ou 5)
  return dadosLancados.filter((dado) => dado.valor === 1 || dado.valor === 5);
};

// Função para gerar o Dado
const gerarDado = (valor: number): Dado => ({
  valor,
  imagem: imagensDado[valor],
});

export const iniciarJogo = (nomesJogadores: string[]): Jogo => {
  const jogadores: Jogador[] = nomesJogadores.map((nome, index) => ({
    id: index,
    nome,
    pontuacao: 0,
    turnoAtual: false,
  }));

  const dados: Dado[] = [1, 2, 3, 4, 5, 6].map(gerarDado);

  return {
    jogadores,
    ordemJogadores: definirOrdemJogadores(jogadores),
    dados: dados,
    turno: 0,
    vencedor: null,
  };
};

export const jogarTurno = (jogo: Jogo): void => {
  const jogadorAtual =
    jogo.jogadores[jogo.ordemJogadores[jogo.turno % jogo.jogadores.length]];

  // Lançar os dados
  const dadosLancados = jogo.dados.map(() => lancarDado());
  console.log(`${jogadorAtual.nome} lançou: ${dadosLancados.map(dado => dado.valor)}`);

  // O jogador escolhe quais dados vão ficar
  const dadosEscolhidos = escolherDados(dadosLancados); // Função que simula a escolha dos dados
  if (dadosEscolhidos.length === 0) {
    console.log(`${jogadorAtual.nome} decidiu não continuar ou não escolheu dados.`);
    jogo.turno++; // Avançar para o próximo jogador
    return;
  }

  console.log(`${jogadorAtual.nome} escolheu os dados: ${dadosEscolhidos.map(dado => dado.valor)}`);

  // Calcular pontuação com base nos dados escolhidos
  const pontos = calcularPontuacao(dadosEscolhidos);
  console.log(`Pontuação obtida: ${pontos}`);

  // Condição para zerar a pontuação se for o primeiro turno do jogador e pontos < 500
  if (jogo.turno === 0 && pontos < 500) {
    console.log(`${jogadorAtual.nome} perdeu a vez e a pontuação foi zerada.`);
    jogadorAtual.pontuacao = 0; // Zera a pontuação do jogador
    jogo.turno++; // Avançar para o próximo jogador
    return;
  }

  if (pontos === 0) {
    console.log(`${jogadorAtual.nome} perdeu a vez.`);
    jogo.turno++; // Avançar para o próximo jogador
    return;
  }

  // Atualiza a pontuação do jogador
  jogadorAtual.pontuacao += pontos;

  // Verifica se o jogador atingiu 5000 pontos
  if (jogadorAtual.pontuacao >= 5000) {
    console.log(`${jogadorAtual.nome} atingiu 5000 pontos!`);
    jogo.vencedor = jogadorAtual;
    return;
  }

  // Atualizar os dados restantes para a próxima jogada
  const dadosRestantes = jogo.dados.length - dadosEscolhidos.length;
  jogo.dados = Array(dadosRestantes > 0 ? dadosRestantes : 6).fill(1).map(() => gerarDado(1)); // Preenche com dados padrão

  console.log(
    `Jogador ${jogadorAtual.nome} continuará com ${jogo.dados.length} dados.`
  );
};

export const finalizarJogo = (jogo: Jogo): void => {
  console.log(`O vencedor é: ${jogo.vencedor?.nome}`);
};
