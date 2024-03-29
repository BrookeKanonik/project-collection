import React, {useReducer, useEffect} from "react"; //useEffect to be used when some dependencies change

import {validate} from '../../util/validators'
import './Input.css'
// jsx requires htmlFor as you cannot use for 

const inputReducer = (state, action) => {
    switch (action.type) {
        case 'CHANGE':
            return {
                ...state, //copies old state and puts it in new object
                value: action.val,
                isValid: validate(action.val, action.validators)
            };
        case 'TOUCH': {
            return {
                ...state, //so we can keep the state and not lose it 
                isTouched: true, //added new property
            }
        }
        default:
            return state;
    }
}

const Input = props => {
    const [inputState, dispatch] = useReducer(inputReducer, {
        value: props.initialValue || '', //can be a value provided from outside
        isTouched: false, //set to false initially 
        isValid: props.initialValid || false //setting or as it can be provided from  outside
    });

    //going to pull out the relevant pieces with object destructuring. so for useEffect, instead of having props.onInput you can do just onInput

    const { id, onInput} = props;
    const { value, isValid} = inputState;

    useEffect(() => {
        onInput(id, value, isValid) //expect to get a function on the prop
    }, [id, value, isValid, onInput]) //dependencies are in brackets
    
    const changeHandler = event => {
        dispatch({
            type: 'CHANGE', 
            val: event.target.value, 
            validators: props.validators
        });

    }//reducer action you dispatch and reads/updates current state that rerenders state

    const touchHandler = () => {
        dispatch({
            type: 'TOUCH'
        });
    }

    const element = props.element === 'input' ? (
    <input 
    id={props.id} 
    type= {props.type} 
    placeholder = {props.placeholder} 
    onChange={changeHandler}
    onBlur= {touchHandler}
    value={inputState.value}
    /> 
    ): (
    <textarea 
    id={props.id} 
    rows={props.rows || 3} 
    onChange={changeHandler} 
    onBlur= {touchHandler} //user clicks in and then out of something
    value={inputState.value}/>
    )


    return (
        <div className={`form-control ${!inputState.isValid && inputState.isTouched && 'form-control--invalid'}`}>
        <label htmlFor={props.id}>{props.label}</label> 
        {element}
        {!inputState.isValid && inputState.isTouched && <p>{props.errorText}</p>}
    </div>
    )
}

export default Input; 

// maybe make form with third party?