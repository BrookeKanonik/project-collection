//main logic for client side will go here

import React, {useState, useContext, useEffect} from "react"
import io from 'socket.io-client'
import jwtDecode from "jwt-decode"
import ChatRoomList from "./components/ChatRoomList"
import MessageList from "./components/MessageList"
import MessageInput from "./components/MessageInput"
import LoginForm from "./components/Login"
import SignupForm from "./components/Signup"
import { AuthContext } from "./components/AuthContext"

const socket = io('http://localhost:8000')

function AppContent() {
    const [rooms, setRoom] = useState(['General', 'Collections', 'Coding'])
    const [currentRoom, setCurrentRoom] = useState(null)
    const [messages, setMessages] = useState([]) //set it to an empty array for messages by default 
    const { isAuthenticated, setIsAuthenticated, setToken, token, username, setUsername } = useContext(AuthContext);

    useEffect(() => {
        //check if the user is logged in first 
        if (isAuthenticated){
            socket.connect() //initiates the convo with the server

            socket.on('connect', () => {
                console.log('Connected to Server')
            })

            socket.on('newMessage', (message) => {
                setMessages((prevMessages) => [message, ...prevMessages]) //adding the previous messages and adding the new message to the front of the array
            })

            socket.on('previousMessages', (previousMessages) => { //when joining a room, we can retrieve the old messages up to a certain point
                setMessages(previousMessages)
            })
        } else { //if not authenticated, no socket traffic at all
            socket.disconnect() 
        }

        return () => {
            socket.off('connect') //we want to turn off that traffic once the actions are complete
            socket.off('newMessage')
            socket.off('previousMessages')
        }
    }, [isAuthenticated]) // Dependency array: re-run the effect when 'isAuthenticated' changes

    const handleLogin = (token, username) => {
        localStorage.setItem('token', token)
        setToken(token) //storing token in state and local storage
        localStorage.setItem('username', username)
        setUsername(username) //storing token in state and local storage
        setIsAuthenticated(true)
    }

    const handleSignup = (token, username) => {
        localStorage.setItem('token', token)
        setToken(token) //storing token in state and local storage
        localStorage.setItem('username', username)
        setUsername(username) //storing token in state and local storage
        setIsAuthenticated(true)
    }

    const handleLogout = () => { //removing everything once a user logs out
      localStorage.removeItem('token')
      localStorage.removeItem('username')
      setIsAuthenticated(false)
      setToken(null)
      setUsername(null)
      socket.disconnect()
    }

    //once someone clicks a room button, they need to be directed to that room and needs to be stored in the state in order to broadcast a message to them

    const joinRoom = (room) => {
        setCurrentRoom(room)
        socket.emit('joinRoom', {room}) //broadcasting
    }

    const sendMessage = (message) => {
        if (token) {
           const decodedToken = jwtDecode(token) //used for a check taking token from localStorage and sending it to the server with the new message. One more validation against the database to make sure they are a valid user
           
           const userId = decodedToken.userId

           socket.emit('sendMessage', {room: currentRoom, message, userId})
        }
    }

    //currentRoom && means if it exists, do this action otherwise do nothing
    //<> return as a unit and to wrap the whole thing
    //defining functions at the parent level and then passing them down to the child components as props
    return (
        <div className="App"> 
            {isAuthenticated ? ( //if authenticated they will see username, logout and the rooms <> are fragments in react
                <>
                    <span>Welcome, {username}! </span>
                    <button onClick={handleLogout}>Logout</button>
                    <ChatRoomList rooms = {rooms} joinRoom = {joinRoom}/> 
                    {currentRoom && (
                        <>
                            <h1>Current Room: {currentRoom}</h1>
                            <MessageList messages={messages} />
                            <MessageInput sendMessage={sendMessage} />
                        </>
                    )}
                </>
            ) : (
                <>
                <h1>Login</h1>
                <LoginForm onLogin={handleLogin} />
                <h1>Signup</h1>
                <SignupForm onSignup={handleSignup} />
                </>
            )}
        </div>
    )
}

export default AppContent; 