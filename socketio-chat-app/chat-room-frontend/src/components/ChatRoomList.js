//List of available chatrooms that a user can enter

import React from "react"

const ChatRoomList = ({rooms, joinRoom}) => {
    return (
        <div>
            <h2>
                Chat Rooms
            </h2>

            <ul>
                {rooms.map((room,index)=> (
                    // will complain if we do not have a key because it needs to know what to update
                    <li key = {index}> 
                        <button onClick={()=> joinRoom(room)}>Join {room}</button>
                    </li>
                )) }
            </ul>
        </div>
    )
}//joinRoom will be the function

export default ChatRoomList;