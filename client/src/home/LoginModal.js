import React from 'react'
import Signin from './Signin'
import Signup from './Signup'
import './LoginModal.css'

const LoginModal = () => {
  return (
    <div className="loginModal-background">
      <div className="loginModal-foreground">
        <h1>Inicie sesión o regístrese, es gratis!</h1>
        <Signin />
        <Signup />
      </div>
    </div>
  )
}

export default LoginModal



