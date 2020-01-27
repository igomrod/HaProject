import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import SignIn from './SignIn'
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
          <div className="signin-form">
            <h3 className='modalHeading'>Iniciar sesión</h3>
            <SignIn />
          </div>
      </div>
    </div>
  )
}

export default LoginModal



