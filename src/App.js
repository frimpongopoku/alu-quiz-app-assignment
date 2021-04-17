import {
  Redirect,
  Route,
  BrowserRouter as Router,
  Switch,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import LandingPage from "./pages/LandingPage";
import Play from "./pages/Play";
import CompletionPage from "./pages/CompletionPage";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/home" component={LandingPage} />
          <Route exact path="/" render={() => <Redirect to="/home" />} />
          <Route exact path="/play" component={Play} />
          <Route exact path="/complete" component={CompletionPage} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
