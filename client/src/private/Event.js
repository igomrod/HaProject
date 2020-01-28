import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import PrivateHeader from './PrivateHeader'


const Event = () => {

  const useFormField = () => {
    const [value, setValue] = useState('')
    return [value, e => setValue(e.target.value)]
  }

  const dispatch = useDispatch()
  const [raceName, setRaceName] = useFormField()
  const [council, setcouncil] = useFormField()
  const [raceDate, setRaceDate] = useFormField()
  const [startTime, setStartTime] = useFormField()
  const handleClose = () => dispatch({ type: 'hideModal' })

  const [isError, setError] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    dispatch({ type: 'hideModal' })
    setError(false)

    try {
      const ret = await fetch('http://www.runrun.org,es', {
        method: 'POST',
        body: JSON.stringify(),
        headers: {
          'Content-Type': 'application/json'
          // 'Authorization': localStorage.getItem('token') // Esto en todas las llamadas autenticadas
        }
      })
      const data = await ret.json()
      localStorage.setItem('token', data.token) // Esto solo en login, para guardar el token
      
    } catch (err) {
      console.warn('Error:', err)
      setError(true)
    }
  }

  return (
    <div>
      <PrivateHeader />
      <form className="login-form" onSubmit={handleSubmit}>
        <h3 className='modalHeading'>Registrarse</h3>
        <div className="form-field">
          <label className="fields" for="name">Nombre de la carrera:</label>
          <input
            id="raceName"
            type="text"
            name="raceName"
            required
            value={raceName}
            onChange={setRaceName}
          />
        </div>
        <div className="form-field">
          <label className="fields" for="surname">Ayuntamiento:</label>
          <input
            id="council"
            type="text"
            name="council"
            required
            value={council}
            onChange={setcouncil}
          />
        </div>
        <div className="form-field">
          <label className="fields" for='email'>Fecha de la carrera:</label>
          <input
            id="raceDate"
            type="text"
            name="raceDate"
            required
            value={raceDate}
            onChange={setRaceDate}
          />
        </div>
        <div className="form-field">
          <label className="fields" for="pass">Hora de comienzo:</label>
          <input
            id="startTime"
            type="text"
            name="startTime"
            required
            value={startTime}
            onChange={setStartTime} />
        </div>
        <div className="buttonsContainer">
          <button><Link to='/event' className="registrate">Regístrate!</Link></button>
          <button onClick={handleClose}>Cancelar</button>

        </div>
        {isError && <div>Error, por favor inténtelo de nuevo</div>}
      </form >

    </div>
  )
}

export default Event