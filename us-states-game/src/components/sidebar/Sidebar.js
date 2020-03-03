import React from 'react' 
import CorrectAnswer from './correctAnswer'
import Pregame from './pregame'
import Endgame from './endgame'
import DisplayQuestion from './DisplayQuestion'

export default class Sidebar extends React.Component {

    state={
        correctStateIndex: 2,
        username: "",
        password: "",
        passwordConfirmation: "",
        image: "",
        user: false,
        correctAnswer: null,
        randoStates: [],
        guessedStates: [],
        displayQuestion: false, 
        displayStateInfo: false,
        displayEndgame: false,
        displayPregame: false,
    }

    componentDidMount() {
        this.generateRandoStates(this.props.allStates);
    }

    getRandomInt = (max) => {
        return Math.floor(Math.random() * max);
    }

    getRandomState = (randoStates, alreadyGuessedEnforced) => {
        
        const randNumber = this.getRandomInt(50);
        let randState = this.props.allStates[randNumber];

        const alreadyGuessed = this.state.guessedStates.findIndex(guessedState => guessedState.name === randState.name) >= 0;
        const alreadyInThisRandomBatch = randoStates.findIndex(randomState => randomState.name === randState.name) >= 0;

        if (alreadyInThisRandomBatch || (alreadyGuessed && alreadyGuessedEnforced)) {
            randState = this.getRandomState(randoStates, alreadyGuessedEnforced);
        }

        return randState;
    }

    generateRandoStates = () => {
        const randoStates = [];
        const correctStateIndex = this.getRandomInt(4);

        if (this.state.guessedStates.length > 4) {
            for (let i=0; i < 3; i++) {
                const randState = this.getRandomState(randoStates, false)
                randoStates.push(randState)
            }
            const correctState = this.getRandomState(randoStates, true)
            randoStates.splice(correctStateIndex, 0, correctState);
        }
        else {
            for (let i=0; i < 4; i++) {
                const randState = this.getRandomState(randoStates, true)
                randoStates.push(randState)
            }
        }

        this.setState({randoStates: randoStates, 
                       correctStateIndex: correctStateIndex,
                       displayQuestion: true,
                       displayStateInfo: false
                     })
        
        this.props.moveAlien(randoStates[correctStateIndex])

    }

    handleGuessState = (guessedState) => {
        const correctState = this.state.randoStates[this.state.correctStateIndex]

        if (guessedState === correctState.name) {
            const newGuessedStates = [...this.state.guessedStates, correctState]
            this.setState({
                displayQuestion: false,
                displayStateInfo: true,
                correctAnswer: correctState,
                guessedStates: newGuessedStates
            })
        } else {
            alert("Wrong answer. Shame on you. Please guess again!")
        }
    }

    //this will be passed down to the correctAnswer component to move to the next question or complete game if applicable
    handleNextButtonClick = () => {
        if (this.state.guessedStates.length < 50) {
            //TBD only un-guessed states as param
            this.generateRandoStates()
        } else {
            this.saveGame();
            this.setState({
                displayStateInfo: false,
                displayEndgame: true
            })
        }
    }

    //will be passed down to pregame then log in form. when user is set to true it should then display the first question
    handleLoginFormChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    //will be passed down to pregame then log in form. when user is set to true it should then display the first question
    handleLogin = (e) => {
        e.preventDefault()
        const foundUser = this.props.users.find(user => user.name === this.state.username)
        if (foundUser && foundUser.password === this.state.password) {
        this.setState({
            user: foundUser.id,
            displayQuestion: true,
            password: "",
            username: " "
        })}
        else{
            alert("Incorrect Credentials. Please try again or create a new profile.")
        }
    }

    handleSignUpFormChange =(e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSignup = (e) => {
        e.preventDefault()
        const {username, password, image, passwordConfirmation} = this.state
        const foundUser = this.props.users.find(user => user.name === username)

        if(foundUser) {
            alert('That Username is already Taken. Please try a different username. If you already have a profile please log in.')
        } else {
        if (password === passwordConfirmation) {
        const name = username
        const userObj = {name, password, image}
        fetch('http://localhost:3000/users', {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(userObj)
        })
        .then(res => res.json())
        .then(newUser => this.setState({
            user: newUser.id
        }))} else {
            alert("Input Password and Retyped Password Must Match")
        }}
    }

    saveGame = () => {
        const game = {user_id: 1, moves: 55, time: 560}
        this.props.saveGame(game)
    }

    render() {
        
        return(
            this.state.randoStates.length === 0 ? null :
            <div className='sidebar'>
                {(!this.state.user) && 
                <Pregame handleFormChange={this.handleLoginFormChange} handleLogin={this.handleLogin} 
                                    password={this.state.password} username={this.state.username} image={this.state.image} 
                                    passwordConfirmation={this.state.passwordConfirmation}
                                    handleSignupFormChange={this.handleSignUpFormChange} handleSignup={this.handleSignup}
                                                                />}
                
                {this.state.user && this.state.displayQuestion &&
                 <DisplayQuestion handleGuessState={this.handleGuessState} 
                                  randoStates={this.state.randoStates}
                                                                />}

                {this.state.user && this.state.displayStateInfo && 
                 <CorrectAnswer handleNextButtonClick={this.handleNextButtonClick} 
                                correctState={this.state.correctAnswer} />}

                {this.state.user && this.state.displayEndgame && 
                <Endgame />}

                
            </div>
        )
    }
    
}