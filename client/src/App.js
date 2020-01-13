import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import { Provider, useSelector, useDispatch } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { save, load } from "redux-localstorage-simple"
import rootReducer from './reducers'
import logo from './logo.svg';
import LoginModal from './home/LoginModal'
import './App.css';


const store = createStore(rootReducer, load(), applyMiddleware(save()))

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>Welcome to the NUMBER MANAGER!</p>
            <Link to="/login"><div>ENTRA!</div></Link>
          </header>
          <Switch>
            <Route path="/login">
              <LoginModal />
            </Route>
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
