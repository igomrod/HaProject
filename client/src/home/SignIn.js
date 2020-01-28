import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'

const SignIn = () => {
  const dispatch = useDispatch()
  const login = (user) => dispatch({ type: 'login', user })
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const handleSignUp = () => dispatch({ type: 'showModal', modalType: 'signup' })
  const handleClose = () => dispatch({ type: 'hideModal' })
  const [isError, setError] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch({ type: 'hideModal' })
    setError(false)
    // Aquí haríamos fetch para hacer login, y
    // obtendríamos los datos del user y un token...
    console.log('Login:', email, password)
    login({
      email: 'demo-email@spamherelots.com',
      password: 'jgj'
    })
  }

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <h3 className='modalHeading'>Iniciar sesión</h3>
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
        <label for='pass'>Password:</label>
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

      <div className="buttonsContainer">
        <button><Link to='/event' className="initSesion">Inicia Sesión</Link></button>
        <button onClick={handleClose}>Cancelar</button>
      </div>
      {isError && <div>Error, por favor inténtelo de nuevo</div>}
    </form>
  )
}

export default SignIn