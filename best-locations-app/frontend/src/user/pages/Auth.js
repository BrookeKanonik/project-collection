import React, {useState, useContext} from 'react' //switching modes requires a state 

import Card from '../../shared/components/UIElements/Card'
import Input from '../../shared/components/FormElements/Input'
import Button from '../../shared/components/FormElements/Button'
import {VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE} from "../../shared/util/validators"
import { useForm } from '../../shared/hooks/form-hook'
import { AuthContext } from '../../shared/context/auth-context'
import './Auth.css'
// import { useContext } from 'react'

const Auth = () => {
    const auth = useContext(AuthContext)
    const [isLoginMode, setIsLoginMode] = useState();
    const [formState, inputHandler, setFormData] = useForm({
        email: {
            value: '',
            isValid: false
        },
        password: {
            value: '',
            isValid: false
        }
    }, false);

    const switchModeHandler = () => { //switch mode of the form
        //set form data now not to reflect an initial state 
        if (!isLoginMode) { //if we are signing up
            setFormData({
                name: undefined
            }, formState.inputs.email.isValid && formState.inputs.password.isValid) //this runs BEFORE we switch the mode 
        } else { //signup mode 
            setFormData({
               ...formState.inputs, //we need to copy all the fields first and then override name to be undefined
                name: {
                    value: '',
                    isValid: false
                }
            }, false)
        }
        setIsLoginMode(prevMode => !prevMode); //updating the state
    }

    const authSubmitHandler = event => {
        event.preventDefault(); //to prevent auto submission of request and reload of page
        console.log(formState.inputs);
        auth.login();
    }
    return <Card className = 'authentication'> 
        <h2>Login Required</h2>
        <hr/>
        <form onSubmit={authSubmitHandler}>
            {!isLoginMode && (
                <Input 
                    element = "input" 
                    id="name" type="text" 
                    label="Your Name" 
                    validators = {[VALIDATOR_REQUIRE]} 
                    errorText = "Please enter a name" 
                    onInput={inputHandler}
                />
            )}
            <Input 
                element="input" 
                id="email" 
                type="email" 
                label="E-Mail" 
                validators={[VALIDATOR_EMAIL()]} 
                errorText= "please enter a valid email" 
                onInput= {inputHandler}
            />
            <Input 
                element="input" 
                id="password" 
                type="password" 
                label="Password" 
                validators={[VALIDATOR_MINLENGTH(5)]} 
                errorText= "please enter a valid password, at least 5 characters" 
                onInput= {inputHandler}
            />
            <Button type="submit" disabled={!formState.isValid}>{isLoginMode ? 'LOGIN' : 'SIGN UP'}</Button>
        </form>
        <Button inverse onClick={switchModeHandler}>SWITCH TO {isLoginMode ? 'SIGN UP' : 'LOGIN'}</Button>
        </Card>
}

export default Auth;

//to export the auth component 