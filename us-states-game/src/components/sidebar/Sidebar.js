import React from 'react' 
import CorrectAnswer from './correctAnswer'
import Pregame from './pregame'
import Endgame from './endgame'
import DisplayQuestion from './DisplayQuestion'

export default class Sidebar extends React.Component {

    //the goal of this state is to conditionally render the subcomponents of sidebar
    state={
        correctStateIndex: 2,
        allUsers: [],
        username: "",
        password: "",
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

    getRandomState = (randoStates) => {
        const randNumber = this.getRandomInt(50);
        let randState = this.props.allStates[randNumber];

        const alreadyGuessed = this.state.guessedStates.findIndex(guessedState => guessedState.name === randState.name) >= 0;
        const alreadyInThisRandomBatch = randoStates.findIndex(randomState => randomState.name === randState.name) >= 0;

        if (alreadyGuessed || alreadyInThisRandomBatch) {
            randState = this.getRandomState(randoStates);
        }

        return randState;
    }

    generateRandoStates = () => {

        const randoStates = [];
        
        for (let i=0; i < 4; i++) {
            const randState = this.getRandomState(randoStates)
            randoStates.push(randState)
        }

        const correctStateIndex = this.getRandomInt(4);

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
        this.setState({
            user: true,
            displayQuestion: true,
            password: "",
            username: " "
        }, () => console.log('logging in', this.state.user))
    }

    render() {
        console.log(this.state.user)
        return(
            this.state.randoStates.length === 0 ? null :
            <div className='sidebar'>
                {(!this.state.user) && 
                <Pregame handleFormChange={this.handleLoginFormChange} handleLogin={this.handleLogin} 
                                    password={this.state.password} username={this.state.username} 
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