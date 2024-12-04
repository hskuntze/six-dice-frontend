import Home from "pages/Home";
import { BrowserRouter, Route, Routes as Switch } from "react-router-dom";

const Routes = () => {
  return (
    <BrowserRouter>
      <main id="content">
        <Switch>
          <Route path="/" element={<Home />} />
        </Switch>
      </main>
    </BrowserRouter>
  );
};

export default Routes;
