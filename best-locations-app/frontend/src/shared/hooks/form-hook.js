import {useCallback, useReducer} from 'react'

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


export const useForm = (initialInputs, initialFormValidity) => {
    const [formState, dispatch] = useReducer(formReducer, { //use reducer returns values so we want to use array destructuring to get them
        inputs: initialInputs,
        isValid: initialFormValidity,
    });

    const inputHandler = useCallback((id, value, isValid) => { //we get all the info we need inside here, this we can just condense both below to use inputHandler
        dispatch({type: 'INPUT_CHANGE', value: value, isValid: isValid, inputId: id}) //where we want to dispatch a new action
    }, [])

    return [formState, inputHandler]
} //exporting our own hook