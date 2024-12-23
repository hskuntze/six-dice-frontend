import { Link } from "react-router-dom";
import "./styles.css";

const Home = () => {
  return (
    <section className="home-container">
      <h2 className="neon-title">Six Dice</h2>
      <div className="home-buttons">
        <Link to={"/jogo"}>
          <button type="button" className="button neon-font home-button">
            New Game
          </button>
        </Link>
        <button type="button" className="button neon-font home-button">
          Leaderboard
        </button>
        <button type="button" className="button neon-font home-button">
          Configurations
        </button>
      </div>
    </section>
  );
};

export default Home;
