import React from 'react'

const SignUpForm = (props) => {

    return(
        <div style={{color: "white"}}>
            <h3>New User? Create your Profile</h3>
            <form onSubmit={props.signUp} id='signup-form'>

            <p><label>Username: </label>
            <input onChange={props.handleFormChange} type='text' value={props.username} name='username' placeholder='username'/></p>
            
            <p><label>Profile Picture</label>
            <input type='text' value={props.image} name='image' placeholder='image url' />
            </p>

            <p><label>Password: </label>
            <input onChange={props.handleFormChange} type='password' value={props.password} name='password' placeholder='password'/></p>
            
            <p><label>Re-Enter Password: </label>
            <input onChange={props.handleFormChange} type='password' value={props.passwordConfirmation} name='passwordConfirmation' placeholder='Confirm Password'/></p>

            <input type='submit' value='Sign Up' />
            
            </form>
            
        </div>
    )



}

export default SignUpForm