import './App.css';
import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom";
import Home from "./containers/home";
import Login from "./containers/login";
import {useEffect} from "react";

function App() {
    let isLogin = localStorage.getItem("isLogin") || false
    useEffect(() => {
        isLogin = localStorage.getItem("isLogin") === "1"
    })
    return (
        <Router>
            <div>
                <nav>
                    <Link to="/">Home</Link> |
                    {!isLogin && <Link to="/login">Login</Link>}
                    {isLogin && <span onClick={() => {
                    }}>Logout</span>}
                </nav>

                <Switch>
                    <Route exact path="/login" component={Login}/>
                    <Route exact path="/" component={Home}/>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
