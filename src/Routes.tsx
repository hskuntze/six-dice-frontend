import Home from "pages/Home";
import Jogo from "pages/Jogo";
import { BrowserRouter, Route, Routes as Switch } from "react-router-dom";

const Routes = () => {
  return (
    <BrowserRouter>
      <main id="content">
        <Switch>
          <Route path="/" element={<Home />} />
          <Route path="/jogo" element={<Jogo />} />
        </Switch>
      </main>
    </BrowserRouter>
  );
};

export default Routes;
