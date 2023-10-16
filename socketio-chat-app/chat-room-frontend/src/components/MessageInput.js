import React, {useState} from 'react'

const MessageInput = ({sendMessage}) => {
    const [message, setMessage] = useState('')
}

    // Function to handle form submission
    const handleSubmit = (e) => {
        // Prevent default form submission behavior
     e.preventDefault();

        // Call the sendMessage function passed as a prop to send the message
     sendMessage(message);

        // Clear the message input field
     setMessage('');
  };