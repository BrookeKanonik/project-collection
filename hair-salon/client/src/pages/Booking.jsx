import React from 'react';
import Calendar from 'react-calendar'
import { useNavigate } from 'react-router-dom'; //redirect to homepage after something is booked

const services = [
    'Haircut',
    'Hair Coloring',
    'Deep Conditioning',
    'Bridal Styling',
    'Event Styling'
];

const stylists = [
    'Brooke',
    'Danny',
    'Imani'
];

//declaring the home component
//react component always needs to be exported. need to return some element of UI
//prevent default for form submission not reloading
const Booking = () => {
    return (
        <div>
            <h2>Book an appointment</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name</label>
                <input 
                    type="text" 
                    id='name' 
                    value={name} //show captured typing
                    onChange={(e)=> setName(e.target.value)} //capture the typing
                    required 
                />
                <label htmlFor="email">Email</label>
                <input 
                    type="text" 
                    id='email' 
                    value={email} //show captured typing
                    onChange={(e)=> setEmail(e.target.value)} //capture the typing
                    required 
                />
                {/*Calendar comp goes here*/}
                <label htmlFor="services">Services</label>
                <select 
                    id="service"
                    value = {service}
                    onChange = {(e)=> setService(e.target.value)}
                    required
                >
                </select>

                <label htmlFor="services">Stylists</label>
                <select 
                    id="stylist"
                    value = {stylists}
                    onChange = {(e)=> setStylists(e.target.value)}
                    required
                >
                </select>
            </form>
        </div>
    )
}

export default Booking;