import React from "react";
import { useParams } from 'react-router-dom'

import PlaceList from '../components/PlaceList'

const DUMMY_PLACES = [
    {
        id: 'p1',
        title: 'empire state building',
        description: 'cool place',
        imageUrl: "https://assets.simpleviewinc.com/simpleview/image/upload/crm/newyorkstate/GettyImages-486334510_CC36FC20-0DCE-7408-77C72CD93ED4A476-cc36f9e70fc9b45_cc36fc73-07dd-b6b3-09b619cd4694393e.jpg",
        address: '20 W 34th St., New York, NY 10001',
        location: {
            lat: 40.7484112,
            lng: -74.0680653
        },
        creator: 'u1'
    },
    {
        id: 'p2',
        title: 'emp. state building',
        description: 'cool place',
        imageUrl: "https://assets.simpleviewinc.com/simpleview/image/upload/crm/newyorkstate/GettyImages-486334510_CC36FC20-0DCE-7408-77C72CD93ED4A476-cc36f9e70fc9b45_cc36fc73-07dd-b6b3-09b619cd4694393e.jpg",
        address: '20 W 34th St., New York, NY 10001',
        location: {
            lat: 40.7484112,
            lng: -74.0680653
        },
        creator: 'u2'
    },
]

const UserPlaces = () => {
    // useParams is a Client Component hook that lets you read a route's dynamic params filled in by the current URL.
    const userId = useParams().userId; 
    const loadedPlaces = DUMMY_PLACES.filter(place => place.creator === userId);
    return <PlaceList items={loadedPlaces} />;
}

export default UserPlaces;