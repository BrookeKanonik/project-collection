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

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [date, setDate] = useState(new Date())
    const [service, setService] = useState('')
    const [stylist, setStylist] = useState('')

    const navigate = useNavigate()

    //passing in details for the submit
    const handleSubmit = async(e) => {
        e.preventDefault(); //do not reload the page
        // manual fetch req
        const response = await fetch('http://localhost:5000/api/bookings', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({name, email, date, service, stylist})
        })

        if(response.ok){
            alert('Booking for blah blah blah (replace) okay!!')
            navigate('/')
        } else {
            alert('WRONGO')
        }
    }

    return (
        <div>
            <h2>Book an appointment</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Name</label>
                    <input 
                        type="text" 
                        id='name' 
                        value={name} //show captured typing
                        onChange={(e)=> setName(e.target.value)} //capture the typing
                        required 
                    />
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input 
                        type="text" 
                        id='email' 
                        value={email} //show captured typing
                        onChange={(e)=> setEmail(e.target.value)} //capture the typing
                        required 
                    />
                </div>
                <div>
                    <label>Date: </label>
                    <Calendar
                        onChange={setDate}
                        value={date}
                        required                
                    />
                    <p>Selected Date: {date.toLocaleDateString()}</p>
                </div>
                <div>
                    <label htmlFor="services">Services</label>
                    <select 
                        id="service"
                        value = {service}
                        onChange = {(e)=> setService(e.target.value)}
                        required
                    >
                        <option value="" disabled>Select A Service</option>
                        {services.map((service,index)=> (
                            <option key={index} value={service}>{service}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="stylists">Stylists</label>
                    <select 
                        id="stylist"
                        value = {stylist}
                        onChange = {(e)=> setStylist(e.target.value)}
                        required
                    >
                        <option value="" disabled>Select A Stylist</option>
                        {stylists.map((stylist,index)=> (
                            <option key={index} value={stylist}>{stylist}</option>
                        ))}
                    </select>
                </div>
                <button type='submit'>Book</button>
            </form>
        </div>
    )
}

export default Booking;