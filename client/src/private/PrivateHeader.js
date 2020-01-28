import React from 'react'
import { useSelector } from 'react-redux'

const PrivateHeader = () => {
  const user = useSelector(s => s.user)

  return (
    <div className="private-header">
      <header >
        <div className="user">
          <span className="username">Bienvenido/a {user.name}{user.surname}</span>
        </div>
      </header>
    </div>

  )
}

export default PrivateHeader