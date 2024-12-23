import { useJogoDeDados } from "hooks/useJogoDados";
import Dado1 from "assets/images/Dado 1.svg";

const Jogo = () => {
  const { jogo, iniciar, jogar } = useJogoDeDados();

  return (
    <div>
      {!jogo ? (
        <button onClick={() => iniciar(["Hassan", "Marco"])}>
          Iniciar Jogo
        </button>
      ) : (
        <>
          <p>Turno: {jogo.turno + 1}</p>
          <button onClick={jogar}>Jogar</button>
          <ul>
            {jogo.jogadores.map((jogador) => (
              <li key={jogador.id}>
                {jogador.nome}: {jogador.pontuacao} pontos
              </li>
            ))}
          </ul>
          {jogo.vencedor && <p>Vencedor: {jogo.vencedor.nome}</p>}
        </>
      )}
      <div>
        {jogo &&
          jogo.dados.map((d) => (
            <img
              key={d.valor}
              src={`/images/Dado${d.valor}.svg`} // Caminho relativo para a imagem
              alt={`Dado ${d}`}
              style={{ width: "50px", height: "50px", margin: "5px" }}
            />
          ))}
      </div>
    </div>
  );
};

export default Jogo;
