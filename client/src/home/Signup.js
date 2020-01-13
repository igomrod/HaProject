import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'



const useFormField = () => {
    const [value, setValue] = useState('')
    return [value, e => setValue(e.target.value)]
}

const Signup = () => {
    const [name, setName] = useFormField()
    const [birthday, setBirthday] = useFormField()
    const [title, setTitle] = useFormField()
    const [company, setCompany] = useFormField()
    const [bio, setBio] = useFormField()
    const [avatar, setAvatar] = useFormField()

    const history = useHistory()
    const [isError, setError] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        const user = { name, birthday, title, company, bio, avatar }
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
            <label>
                Name:
                <input name="name" required value={name} onChange={setName} />
            </label>
            <label>
                Birthday:
                <input name="birthday" type="date" required value={birthday} onChange={setBirthday} />
            </label>
            <label>
                Title:
                <input name="title" required value={title} onChange={setTitle} />
            </label>
            <label>
                Company:
                <input name="company" required value={company} onChange={setCompany} />
            </label>
            <label>
                Biography:
                <textarea name="bio" required value={bio} onChange={setBio} />
            </label>
            <label>
                Avatar:
                <input name="avatar" type="url" required value={avatar} onChange={setAvatar} />
            </label>
            <button>Sign up!</button>
            {isError && <div>Error, please try again</div>}
        </form>
    )
}


export default Signup