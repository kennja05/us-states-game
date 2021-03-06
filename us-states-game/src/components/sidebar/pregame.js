import React from 'react'
import LoginForm from './LoginForm'
import SignupForm from './SignupForm'

export default class Pregame extends React.Component {

    state={
        displaySignup: false,
        displayLogin: false,
        userList: []
    }

    // componentDidMount = () => {
    //     fetch('http://localhost:3000/users')
    //         .then(res => res.json())
    //         .then(users => console.log(users))
    // }
    
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
                {!this.state.displayLogin && <button className='button' onClick={this.showLoginForm}>Log In </button>}
                
                {!this.state.displaySignup && <button className='button' onClick={this.showSignupForm}>Sign Up </button>}
                {this.state.displayLogin && <LoginForm username={this.props.username} password={this.props.password} 
                                            handleLogin={this.props.handleLogin} handleFormChange={this.props.handleFormChange} />}
                
                {this.state.displaySignup && <SignupForm username={this.props.username} password={this.props.password} 
                passwordConfirmation={this.props.passwordConfirmation} image={this.props.image}
                handleFormChange={this.props.handleSignupFormChange} handleSignup={this.props.handleSignup}
                /> }
            </div>
        )
    }
}