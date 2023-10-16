import React, {createContext, useState, useEffect} from "react"

export const AuthContext = createContext()

// AuthProvider component that wraps around the app to provide authentication state
export const AuthProvider = ({ children }) => {
    // State variables for authentication status, token, and username
    const [isAuthenticated, setIsAuthenticated] = useState(false); //by defqualt users are not logged in
    const [token, setToken] = useState(null); //no token
    const [username, setUsername] = useState(null); //no username default

    //use effect triggered by something very specific (in this case a page rendering)
    useEffect(() => {
        //retrieve token and username from local storage
        //not best practice, but will do it in this example
        const storedToken = localStorage.getItem('token')
        const storedUsername = localStorage.getItem('username')

        //if a token exists in local stroage, then we update state variables
        if (storedToken){
            setToken(storedToken)
            setIsAuthenticated(true)
        }

        if (storedUsername){
            setUsername(storedUsername)
        }
    }) //useEffect can fire again if we add another parameter here

    return (
        <AuthContext.Provider
        value={{
          isAuthenticated,
          setIsAuthenticated,
          token,
          setToken,
          username,
          setUsername
        }}
      >
        {children} {/* Render children components */} 
      </AuthContext.Provider>
    )
}  

//the child components can access state values but also call the function to update it as well