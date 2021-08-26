import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Landing from './Components/Landing/Landing';
import Home from './Components/Home/Home';
import Nav from './Components/Nav/Nav';
import Details from './Components/Details/Details';
import NewGame from './Components/NewGame/NewGame';



function App() {
  return (
    <Router>
      <div className="App">

        <Switch>

          <Route exact path='/' component={Landing} />

          <Route>
            <Route path='/' component={Nav} />
            {/* <Switch> */}
            <Route path='/home' component={Home} />
            <Route path='/details' component={Details} />
            <Route path='/new' component={NewGame} />
            {/* </Switch> */}
          </Route>

        </Switch>

      </div>
    </Router>
  );
}

export default App;
