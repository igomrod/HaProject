import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'



const useFormField = () => {
    const [value, setValue] = useState('')
    return [value, e => setValue(e.target.value)]
}

const Signup = () => {
    const [name, setName] = useFormField()
    const [surname, setSurname] = useFormField()
    const [email, setEmail] = useFormField()
    const [password, setPassword] = useFormField()
    
    const history = useHistory()
    const [isError, setError] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
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
            // localStorage.setItem('token', data.token) // Esto solo en login, para guardar el token
            history.push(`/users/${data.id}`)
        } catch (err) {
            console.warn('Error:', err)
            setError(true)
        }
    }

    return (
        <form id="signup" onSubmit={handleSubmit}>
            <label className="fields">
                Name:
                <input className="inputs" name="name" required value={name} onChange={setName} />
            </label>
            <label className="fields">
                Surname:
                <input className="inputs" name="surname" required value={surname} onChange={setSurname} />
            </label>
            <label className="fields">
                Email:
                <input className="inputs" name="email" required value={email} onChange={setEmail} />
            </label>
            <label className="fields">
                Password:
                <input className="inputs" name="password" required value={password} onChange={setPassword} />
            </label>
            <button>Sign up!</button>
            {isError && <div>Error, please try again</div>}
        </form>
    )
}


export default Signup