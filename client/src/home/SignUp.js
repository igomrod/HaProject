import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom'

const useFormField = () => {
  const [value, setValue] = useState('')
  return [value, e => setValue(e.target.value)]
}

const SignUp = () => {
  const dispatch = useDispatch()
  const [name, setName] = useFormField()
  const [surname, setSurname] = useFormField()
  const [email, setEmail] = useFormField()
  const [password, setPassword] = useFormField()
  const handleClose = () => dispatch({ type: 'hideModal' })

  const history = useHistory()
  const [isError, setError] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    dispatch({ type: 'hideModal' })
    const user = { name, surname, email, password }
    setError(false)
    try {
      const ret = await fetch('http://www.runrun.org.es', {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
          'Content-Type': 'application/json'
          // 'Authorization': localStorage.getItem('token') // Esto en todas las llamadas autenticadas
        }
      })
      const data = await ret.json()
      localStorage.setItem('token', data.token) // Esto solo en login, para guardar el token
      
      history.push(`/profile`)
    } catch (err) {
      console.warn('Error:', err)
      setError(true)
    }
  }

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <h3 className='modalHeading'>Registrarse</h3>
      <div className="form-field">
        <label className="fields" for="name">Nombre:</label>
        <input
          id="name"
          type="text"
          name="name"
          required
          value={name}
          onChange={setName}
        />
      </div>
      <div className="form-field">
        <label className="fields" for="surname">Apellidos:</label>
        <input
          id="surname"
          type="text"
          name="surname"
          required
          value={surname}
          onChange={setSurname}
        />
      </div>
      <div className="form-field">
        <label className="fields" for='email'>Email:</label>
        <input
          id="email"
          type="email"
          name="email"
          required
          value={email}
          onChange={setEmail}
        />
      </div>
      <div className="form-field">
        <label className="fields" for="pass">Password:</label>
        <input
          id="pass"
          type="password"
          name="password"
          required
          value={password}
          onChange={setPassword} />
      </div>
      <div className="buttonsContainer">
        <button><Link to='/event' className="registrate">Regístrate!</Link></button>
        <button onClick={handleClose}>Cancelar</button>

      </div>
      {isError && <div>Error, por favor inténtelo de nuevo</div>}
    </form >
  )
}


export default SignUp