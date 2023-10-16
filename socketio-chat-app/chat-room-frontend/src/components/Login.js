import React, {useState} from "react"

const LoginForm = ({onLogin}) => {
    const [username, setUsername] = useState(''); //when the users are typing their username below, that information is updated in the useState example useState('myloginname')
    const [password, setPassword] = useState('');
//e means event object. all the info we had when they clicked
    const handleSubmit = async (e) => {
        e.preventDefault() //do not want any default behavior

        const response = await fetch('http://localhost:8000/login', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify({username, password}),
        })

        const data = await response.json()

        onLogin(data.token, data.username) //pass in the username and token 
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
            type='text'
            placeholder='Username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            />

            <input
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />        
            <button type="submit">Login</button>    
        </form>
    )
}

export default LoginForm;