import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import { Provider, useSelector, useDispatch } from 'react-redux'
import Modals from './home/Modals'
import './App.css';
import generateStore from './reducers'
import Event from './private/Event'

const Content = () => {
  const dispatch = useDispatch()
  const user = useSelector(s => s.user)
  const handleSignin = () => dispatch({ type: 'showModal', modalType: 'signin' })

  return (
    <div className="App">
      {user && <Event />}
      <header className="App-header">
        <h1 className='title'>RUN-RUN</h1>
      </header>
      <main className="App-main">
        <h2 className="subtitle">Bienvenido/a al Gestor de Dorsales</h2>
        <Link to="/signin" className="entrar" onClick={handleSignin}>ENTRA!</Link>
        <Switch>
          <Route path="/login">
            <Modals/>
          </Route>
          <Route path="/register">
            <Modals/>
          </Route>
          <Route path="/event">
            <Event/>
          </Route>
        </Switch>
        <footer>
          <p>©2020 por Dorsales Team para Hack a Boss </p>
        </footer>
      </main>

    </div>
  )
}

const store = generateStore()

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Content />
      </Router>
    </Provider>
  );
}

export default App;
