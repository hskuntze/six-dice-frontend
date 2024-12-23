import { Dado } from "types/dado";
import Jogador from "../types/jogador";

export const imagensDado: { [key: number]: string } = {
  1: "Dado1.svg",
  2: "Dado2.svg",
  3: "Dado3.svg",
  4: "Dado4.svg",
  5: "Dado5.svg",
  6: "Dado6.svg",
};

// Gera um lançamento de dado aleatório e retorna o objeto Dado
export const lancarDado = (): Dado => {
  const valor = Math.floor(Math.random() * 6) + 1; // Gera um número de 1 a 6
  return {
    valor,
    imagem: imagensDado[valor], // Acessa a imagem correspondente ao valor do dado
  };
};

// Avalia a pontuação com base nas regras
export const calcularPontuacao = (dados: Dado[]): number => {
  let pontos = 0;

  // Contagem de faces
  const contagem = new Array(6).fill(0);
  dados.forEach((dado) => contagem[dado.valor - 1]++);

  // Sequência 1 a 6
  if (contagem.every((c) => c === 1)) {
    pontos += 1000;
    return pontos;
  }

  // Trincas e faces de 1 ou 5
  contagem.forEach((quantidade, i) => {
    if (quantidade >= 3) {
      pontos += i === 0 ? 1000 : (i + 1) * 100; // Trinca de 1 = 1000, outras = valor * 100
      quantidade -= 3;
    }
    if (i === 0) pontos += quantidade * 100; // Face 1
    if (i === 4) pontos += quantidade * 50; // Face 5
  });

  return pontos;
};

// Define a ordem dos jogadores
export const definirOrdemJogadores = (jogadores: Jogador[]): number[] => {
  const resultados = jogadores.map((jogador) => ({
    id: jogador.id,
    resultado: lancarDado(),
  }));

  // Ordena pela proximidade do valor 1
  resultados.sort(
    (a, b) => Math.abs(a.resultado.valor - 1) - Math.abs(b.resultado.valor - 1)
  );

  return resultados.map((r) => r.id);
};
