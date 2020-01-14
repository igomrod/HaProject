import React from 'react'
import Signin from './Signin'
import Signup from './Signup'
import './LoginModal.css'

const LoginModal = () => {
  return (
    <div className="loginModal-background">
      <div className="loginModal-foreground">
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



