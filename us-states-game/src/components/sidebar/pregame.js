import React from 'react'
import LoginForm from './LoginForm'
import SignupForm from './SignupForm'

export default class Pregame extends React.Component {

    state={
        displaySignup: false,
        displayLogin: false
    }
    
    showLoginForm = () => {
        this.setState({
            displayLogin: true,
            displaySignup: false
        })
    }

    showSignupForm= () => {
        this.setState({
            displaySignup: true,
            displayLogin: false
        })
    }

    render() {
        return(
            <div style={{color: "white"}} className='sub-sidebar'>
                {!this.state.displayLogin && <a onClick={this.showLoginForm}>Log In </a>}
                
                {!this.state.displaySignup && <a onClick={this.showSignupForm}>Sign Up </a>}
                {this.state.displayLogin && <LoginForm username={this.props.username} password={this.props.password} 
                                            handleLogin={this.props.handleLogin} handleFormChange={this.props.handleFormChange} />}
                
                {this.state.displaySignup && <SignupForm /> }
            </div>
        )
    }
}