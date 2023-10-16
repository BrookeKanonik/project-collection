import React, {useState} from "react"

const SignupForm = ({onSignup}) => {
    const [username, setUsername] = useState(''); //when the users are typing their username below, that information is updated in the useState example useState('myloginname')
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('') //adding incase needing to use in the future
//e means event object. all the info we had when they clicked
    const handleSubmit = async (e) => {
        e.preventDefault() //do not want any default behavior

        const response = await fetch('http://localhost:8000/register', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify({username, email, password}),
        })

        const data = await response.json()

        onSignup(data.token, data.username) //pass in the username and token 
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
            type='email'
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />     

            <input
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />        
            <button type="submit">Register</button>    
        </form>
    )
}

export default SignupForm;