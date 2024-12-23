import { iniciarJogo, jogarTurno } from "fluxoJogo";
import { useState } from "react";
import Jogo from "types/jogo";

export const useJogoDeDados = () => {
  const [jogo, setJogo] = useState<Jogo | null>(null);

  const iniciar = (nomesJogadores: string[]) => setJogo(iniciarJogo(nomesJogadores));
  const jogar = () => {
    if (jogo) {
      const novoJogo = { ...jogo }; // Copiar o estado atual
      jogarTurno(novoJogo); // Modificar o estado no escopo local
      setJogo(novoJogo); // Atualizar o estado global
    }
  };

  return { jogo, iniciar, jogar };
};
