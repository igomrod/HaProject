import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
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
      const ret = await fetch('http://localhost:8080/users', {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
          'Content-Type': 'application/json'
          // 'Authorization': localStorage.getItem('token') // Esto en todas las llamadas autenticadas
        }
      })
      const data = await ret.json()
      localStorage.setItem('token', data.token) // Esto solo en login, para guardar el token
      history.push(`/users/${data.id}`)
    } catch (err) {
      console.warn('Error:', err)
      setError(true)
    }
  }

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <div className="form-field">
        <label className="fields" for="name">Name:</label>
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
        <label className="fields" for="surname">Surname:</label>
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
          onChange={e => setEmail(e.target.value)}
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
        <button>Regístrate!</button>
        <button onClick={handleClose}>Cancelar</button>

      </div>
      {isError && <div>Error, please try again</div>}
    </form >
  )
}


export default SignUp