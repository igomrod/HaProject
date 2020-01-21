import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import Signin from './Signin'
import Signup from './Signup'
import './LoginModal.css'

const LoginModal = () => {
  const dispatch = useDispatch()
  const currentModal = useSelector(s => s.modal)
  if(!currentModal) return false
  const handleClose = () => dispatch({ type: 'hideModal' })
  const handleClick = (e) => e.stopPropagation()

  return (
    <div className="loginModal-background" onClick={handleClose}>
      <div className="loginModal-foreground" onClick={handleClick}>
        <h1>Inicie sesión o regístrese, es gratis!</h1>
        <div className="container">
          
          <div className="signin-form">
            <h1>Iniciar sesión</h1>
            <Signin />
          </div>
          <div className="signup-form">
            <h1>Registrarse</h1>
            <Signup />
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginModal



