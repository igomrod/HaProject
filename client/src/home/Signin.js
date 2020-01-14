import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

const Signin = () => {
    const dispatch = useDispatch()
    const login = (user) => dispatch({ type: 'login', user })
    const [ username, setUsername ] = useState('')
    const [ password, setPassword ] = useState('')
    const handleSubmit = (e) => {
      e.preventDefault()
      // Aquí haríamos fetch para hacer login, y
      // obtendríamos los datos del user y un token...
      console.log('Login:', username, password)
      login({
        username,
        email: 'demo-email@spamherelots.com',
        avatar: 'https://i.imgur.com/VVq6KcT.png',
        token: 'fake-token'
      })
    }
  
    return (
      <form className="login-form" onSubmit={handleSubmit}>
        <label className="fields">
          Username:
          <input
            className="inputs"
            name="username"
            required
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
        </label>
        <label className="fields">
          Password:
          <input
            className="inputs"
            name="password"
            type="password"
            required
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </label><br/>
        <button>Log in!</button>
      </form>
    )
  }

  export default Signin