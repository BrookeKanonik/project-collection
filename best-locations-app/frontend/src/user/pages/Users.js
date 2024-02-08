import React from 'react'

import UsersList from '../components/UsersList';

const Users = () => {
    const USERS = [
            {
                id: "u1", 
                name: "brooke", 
                image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimages.alphacoders.com%2F500%2Fthumb-1920-500310.jpg&f=1&nofb=1&ipt=d342e687f5874d607c5a023e98a33d107965c6a3f37281961c6710a4fe3f4055&ipo=images", 
                places: 3
            }
        ];

    return <UsersList items={USERS}/>
}

export default Users;