import React from 'react'
import { Outlet } from 'react-router-dom'

//can use link so it does not involve a refresh

//can make the header a separate comp?

const App = () => {
  return (
    <div>
      <header>
        <h1>Hair Salon</h1>
        <nav>
          <a href="/">Home</a> | <a href="/staff">Staff</a> | <a href="/booking">Booking</a> | <a href="/services">Services</a> | <a href="/admin">Admin</a>
        </nav>
      </header>
      <main>
        <Outlet/>
      </main>
    </div>
  )
}

export default App;