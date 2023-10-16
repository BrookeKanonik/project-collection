import React from "react"

const MessageList = ({messages}) => {
    const reversedMessages = [...messages].reverse() //taking the existing array and reversing it so recent shows at the bottom
    return (
        <div>
            <h2>Message</h2>
            <ul>
                {reversedMessages.map((message, index)=> (
                    <li key={index}>
                        <span className = 'timestamp'>
                            {new Date(message.timestamp).toLocaleDateString()}
                        </span>
                        <span>
                            {message.user ? message.user.username : 'Anonymous'}
                        </span>
                        {message.content}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default MessageList;