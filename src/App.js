import {
  Redirect,
  Route,
  BrowserRouter as Router,
  Switch,
} from "react-router-dom";
import "./App.css";
import LandingPage from "./pages/LandingPage";
import Play from "./pages/Play";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/home" component={LandingPage} />
          <Route exact path="/" render={() => <Redirect to="/home" />} />
          <Route exact path="/play" component={Play} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
