import React from 'react'
import { useParams } from 'react-router-dom'

import './PlaceForm.css'
import Input from '../../shared/components/FormElements/Input'
import Button from '../../shared/components/FormElements/Button'
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH} from '../../shared/util/validators'
import {useForm} from '../../shared/hooks/form-hook'

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
        title: 'empire state building',
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

const UpdatePlace = () => {
    const placeId = useParams().placeId

    const identifiedPlace = DUMMY_PLACES.find( p => p.id === placeId)

    const [formState, inputHandler] = useForm({ //we get back our form state so we want this to be destructured 
        title: {
            value: identifiedPlace.title,
            isValid: true,
        },
        description: {
            value: identifiedPlace.description,
            isValid: true,
        },
    }, true)

    const placeUpdateSubmitHandler = event => {
        event.preventDefault();
        console.log(formState.inputs)
    }

    if (!identifiedPlace){
        return (<div className='center'><h2>Could not find the place!</h2></div>)
    }
    return <form className='place-form' onSubmit={placeUpdateSubmitHandler}> 
        <Input 
            id="title" 
            element="input" 
            type="text" 
            label="Title" 
            validators= {[VALIDATOR_REQUIRE()]}
            errorText= "Please enter a valid title."
            onInput= {inputHandler}
            initialValue= {formState.inputs.title.value}
            initialValid={formState.inputs.title.isValid}
        />
        <Input 
            id="description" 
            element="textarea" 
            label="Description" 
            validators= {[VALIDATOR_MINLENGTH(5)]}
            errorText= "Please enter a valid description (min 5 characters)."
            onInput= {inputHandler}
            initialValue= {formState.inputs.description.value}
            initialValid={formState.inputs.description.isValid}
        />
        <Button type="submit" disabled={!formState.isValid}>
            UPDATE PLACE
        </Button>
    </form>

}

export default UpdatePlace;
