import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

const Signin = () => {
    const dispatch = useDispatch()
    const login = (user) => dispatch({ type: 'login', user })
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const handleSubmit = (e) => {
      e.preventDefault()
      dispatch({type: 'hideModal'}) 
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
        <label className="fields">
          Email:
          <input
            className="inputs"
            name="email"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
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