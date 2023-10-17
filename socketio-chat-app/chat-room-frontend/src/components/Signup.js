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
            {/* Input field for username */}
            <input
            type='text'
            placeholder='Username'
            name = "username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            />

            {/* Input field for email */}
            <input
            type='email'
            placeholder='Email'
            name = "email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />     

            {/* Input field for password */}
            <input
            type='password'
            placeholder='Password'
            name = "password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
            {/* Submit button for the form */}        
            <button type="submit">Register</button>    
        </form>
    )
}

export default SignupForm;