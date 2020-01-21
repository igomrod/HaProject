import React from 'react'
import { useSelector } from 'react-redux'
import './private.css'

const Private = () => {
  const user = useSelector(s => s.user)

  return (
    <div className="private-main">
      <header>
        <div className="user">
          <span className="username">{user.username}</span>
          <img src={user.avatar} alt="Avatar"/>
        </div>
      </header>
      <div className="private-middle">
        Aquí podrá subir el archivo CSV
        <button>Subir CSV</button>
      </div>
    </div>
  )
}

export default Private
