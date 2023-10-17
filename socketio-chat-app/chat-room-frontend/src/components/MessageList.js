import React from "react"

const MessageList = ({messages}) => {
    const reversedMessages = [...messages].reverse() //taking the existing array and reversing it so recent shows at the bottom
    return (
        <div>
            <h2>Message</h2>
            <ul>
                {reversedMessages.map((message, index)=> (
                    <li key={index}>
                        {/* Display the timestamp of the message */}
                        <span className = 'timestamp'>
                            {new Date(message.timestamp).toLocaleString()}
                        </span>
                        {/* Display the username of the sender or 'Anonymous' if not available */}
                        <span className="username">
                            {message.user ? message.user.username : 'Anonymous'}: 
                        </span>
                        <span> </span>
                        {message.content}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default MessageList;