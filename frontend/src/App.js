import './App.css'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Nav from "./Components/Nav"
import Food from "./Components/Food"
import Results from "./Components/Results"


function App() {
  return (
    <div className="App">
      <Router>
        <Nav/>
        <Switch>
        <Route>
          <Food exact path ="/"/>
        </Route>
        <Route exact path='/results'>
          <Results/>
        </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
