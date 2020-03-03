import React from 'react' 
import CorrectAnswer from './correctAnswer'
import Pregame from './pregame'
import Endgame from './Endgame'
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
        moves: 0,
        displayQuestion: false, 
        displayStateInfo: false,
        displayEndgame: false,
        displayPregame: false,
        timer: {
            time: 0,
            start: 0,
            isOn: false
        }
    }

    componentDidMount() {
        this.generateRandoStates(false);
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

    generateRandoStates = (moveAlien) => {
        
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
                       displayStateInfo: false,
                     })
        if (moveAlien) {
            this.props.moveAlien(randoStates[correctStateIndex])
        }
    }

    handleGuessState = (guessedState) => {
        const correctState = this.state.randoStates[this.state.correctStateIndex]
        const newMoves = this.state.moves + 1
        if (guessedState === correctState.name) {
            const newGuessedStates = [...this.state.guessedStates, correctState]
            this.setState({
                displayQuestion: false,
                displayStateInfo: true,
                correctAnswer: correctState,
                guessedStates: newGuessedStates,
                moves: newMoves
            })
        } else {
            alert("Wrong answer. Shame on you. Please guess again!")
            this.setState({
                moves: newMoves
            })
        }
    }

    //this will be passed down to the correctAnswer component to move to the next question or complete game if applicable
    handleNextButtonClick = () => {
        if (this.state.guessedStates.length < 50) {
            this.generateRandoStates(true)
        } else {
            this.stopTimer()
            this.setState({
                displayStateInfo: false,
                displayEndgame: true
            })
            this.saveGame();
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
            })
            this.props.moveAlien(this.state.randoStates[this.state.correctStateIndex])
            this.startTimer()
        }
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
        const game = {user_id: 1, moves: this.state.moves, time: this.state.timer.time}
        this.props.saveGame(game)
    }

    startTimer = () => {
        this.setState({ timer: {time: this.state.timer.time,
                                start: Date.now() - this.state.timer.time,
                                isOn: true}
        })
        this.timer = setInterval(() => {
                        const timer = this.state.timer
                        timer.time = Date.now() - this.state.timer.start
                        this.setState({timer: timer})
                    }, 1000)
    }

    stopTimer = () => {
        this.setState({timer: {isOn: false}})
        clearInterval(this.timer)
    }

    resetTimer = () => {
        this.setState({timer: {time: 0}})
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
                                  timer={this.state.timer}                              />}

                {this.state.user && this.state.displayStateInfo && 
                 <CorrectAnswer handleNextButtonClick={this.handleNextButtonClick} 
                                correctState={this.state.correctAnswer} />}

                {this.state.user && this.state.displayEndgame && 
                <Endgame />}

                
            </div>
        )
    }
    
}