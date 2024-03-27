import React, {useCallback, useReducer} from 'react'

import Input from '../../shared/components/FormElements/Input'
import Button from '../../shared/components/FormElements/Button'
import {VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH} from '../../shared/util/validators'
import './NewPlace.css'

const formReducer = (state, action) => {
    switch (action.type) {
        case 'INPUT_CHANGE': 
            let formIsValid = true; //helper variable 
            for (const inputId in state.inputs) { //go through all the inputs in the state below in newplace
                if (inputId === action.inputId){ //looking at if the input is getting updated
                    formIsValid = formIsValid && action.isValid;
                } else { //if it is not getting updated...
                    formIsValid = formIsValid && state.inputs[inputId].isValid;
                }
            }
            return {
                ...state,
                inputs: {
                    ...state.inputs, //current input state
                    [action.inputId] : { value: action.value, isValid: action.isValid}
                },
                isValid: formIsValid
            }
        default:
            return state;
        
    }
};

const NewPlace = () => {
    const [formState, dispatch] = useReducer(formReducer, { //use reducer returns values so we want to use array destructuring to get them
        inputs: {
            title: {
                value: '',
                isValid: false
            },
            description: {
                value: '',
                isValid: false
            },
        },
        isValid: false,
    });
    const inputHandler = useCallback((id, value, isValid) => { //we get all the info we need inside here, this we can just condense both below to use inputHandler
        dispatch({type: 'INPUT_CHANGE', value: value, isValid: isValid, inputId: id}) //where we want to dispatch a new action
    }, [])
    // const descriptionInputHandler = useCallback((id, value, isValid) => {
    // }, [])

    return <form className='place-form'>
        <Input 
            id="title"
            element='input' 
            type="text" 
            label="Title" 
            validators={[VALIDATOR_REQUIRE()]} 
            errorText=" Please enter a valid title." 
            onInput= {inputHandler}
        />

        <Input 
            id="description"
            element='textarea' 
            label="Description" 
            validators={[VALIDATOR_MINLENGTH(5)]} 
            errorText=" Please enter a valid description (at least 5 characters)." 
            onInput= {inputHandler} //was descinputhandler
        />
        <Button type="submit" disabled={!formState.isValid}>ADD PLACE</Button>
    </form>
};

export default NewPlace;