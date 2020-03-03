import React from 'react'

const LoginForm = (props) => {

    return(
        <div style={{color: "white"}}>
            <h3>Been Here Before? Log In as Existing User</h3>
            <form onSubmit={props.handleLogin} id='login-form'>

            <p><label>Username: </label>
            <input onChange={props.handleFormChange} type='text' value={props.username} name='username' placeholder='username'/></p>
            
            <p><label>Password: </label>
            <input onChange={props.handleFormChange} type='password' value={props.password} name='password' placeholder='password'/></p>
            
            <input type='submit' value='Log In' />
            
            </form>
            
        </div>
    )



}

export default LoginForm