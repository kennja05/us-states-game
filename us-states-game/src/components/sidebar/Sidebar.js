import React from 'react' 
import CorrectAnswer from './correctAnswer'
import Pregame from './Pregame'
import Endgame from './Endgame'
import DisplayQuestion from './DisplayQuestion'

export default class Sidebar extends React.Component {

    //the goal of this state is to conditionally render the subcomponents of sidebar
    state={
        correctStateIndex: 2,
        correctAnswer: null,
        randoStates: [],
        guessedStates: [],
        displayQuestion: false, 
        displayStateInfo: false,
        displayEndgame: false,
        displayPregame: false,
    }

    componentDidMount() {
        console.log("HERE", this.props.allStates)
        this.generateRandoStates(this.props.allStates)
    }

    handleGuessState = (guessedState) => {
        const correctState = this.state.randoStates[this.state.correctStateIndex]

        if (guessedState === correctState.name) {
            this.setState({
                displayQuestion: false,
                displayStateInfo: true,
                correctAnswer: correctState
            })
        } else {
            alert("Wrong answer. Shame on you. Please guess again!")
        }
    }

    getRandomInt = (max) => {
        return Math.floor(Math.random() * max);
    }

    //this will be passed down to the correctAnswer component to move to the next question or complete game if applicable
    handleNextButtonClick = () => {
        if (this.state.guessedStates.length < 50) {
            //TBD only un-guessed states as param
            this.generateRandoStates(this.props.allStates)
        } else {
            this.setState({
                displayStateInfo: false,
                displayEndgame: true
            })
        }
    }

    generateRandoStates = (stateArray) => {
        const randoStates = [];
        for (let i=0; i < 4; i++) {
            const randNumber = this.getRandomInt(stateArray.length);
            const randState = stateArray[randNumber];
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

    render() {
        console.log(this.state.randoStates)
        return(
            this.state.randoStates.length === 0 ? null :
            <div className='sidebar'>
                {/* some of these could be different routes in order to meet the requirement to use react router */}
                {(this.state.displayQuestion) &&
                 <DisplayQuestion handleGuessState={this.handleGuessState} 
                                  randoStates={this.state.randoStates}
                                                                />}
                {(this.state.displayStateInfo) && 
                 <CorrectAnswer handleNextButtonClick={this.handleNextButtonClick} 
                                correctState={this.state.correctAnswer} />}
                {(this.state.displayEngame) && <Endgame />}
                {(this.state.displayPregame) && <Pregame />}


            </div>
        )
    }
    
}