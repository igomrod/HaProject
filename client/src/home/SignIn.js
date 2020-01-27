import React, { useState } from 'react'
import { BrowserRouter as Switch, Route, Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import SignUp from './SignUp'

const SignIn = () => {
  const dispatch = useDispatch()
  const login = (user) => dispatch({ type: 'login', user })
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const handleClose = () => dispatch({ type: 'hideModal' })
  const handleSignUp = () => dispatch({ type: 'showModal', modalType: 'signup' })
  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch({ type: 'hideModal' })
    // Aquí haríamos fetch para hacer login, y
    // obtendríamos los datos del user y un token...
    console.log('Login:', email, password)
    login({
      email: 'demo-email@spamherelots.com',
      avatar: 'https://i.imgur.com/VVq6KcT.png',
      token: 'fake-token'
    })
  }

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <div className="form-field">
        <label className="fields" for='email'>Email:</label>

        <input
          id='email'
          type='email'
          name="email"
          required
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
      </div>
      <div className="form-field">
        <label for='pass'>
          Password:
          </label>
          <input
            id='pass'
            name="password"
            type="password"
            required
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
      </div>
      <p>Si todavía no está registrado pulse <Link to='/signup' onClick={handleSignUp}>aquí</Link></p>
      <Switch>
        <Route path="/signup">
          <SignUp />
        </Route>
      </Switch>
      <div className="buttonsContainer">
        <button>Entrar</button>
        <button onClick={handleClose}>Cancelar</button>
      </div>
     
    </form>
  )
}

export default SignIn