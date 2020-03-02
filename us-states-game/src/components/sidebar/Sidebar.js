import React from 'react' 
import CorrectAnswer from './correctAnswer'
import Pregame from './Pregame'
import Endgame from './Endgame'
import DisplayQuestion from './DisplayQuestion'

export default class Sidebar extends React.Component {

    //the goal of this state is to conditionally render the subcomponents of sidebar
    state={
        guessedStates: [],
        displayQuestion: true, 
        displayStateInfo: false,
        displayEndgame: false,
        displayPregame: false,
    }

    //this is passed down to the displayQuestion component
    handleCorrectAnswer = () => {
        this.setState({
            displayQuestion: false,
            displayStateInfo: true,
        })
    }

    //this will be passed down to the correctAnswer component to move to the next question or complete game if applicable
    handleNextButtonClick = () => {
        if (this.state.guessedStates.length < 50) {
            this.setState({
                displayQuestion: true,
                displayStateInfo: false
            })
        } else {
            this.setState({
                displayStateInfo: false,
                displayEndgame: true
            })
        }
    }

    render() {
        return(
            <div className='sidebar'>
                {/* some of these could be different routes in order to meet the requirement to use react router */}
                {(this.state.displayQuestion) && <DisplayQuestion handleCorrectAnswer={this.handleCorrectAnswer} 
                                                                stateList={this.props.allStates}
                                                                moveAlien={this.props.moveAlien}/>}
                {(this.state.displayStateInfo) && <CorrectAnswer handleNextButtonClick={this.handleNextButtonClick}/>}
                {(this.state.displayEngame) && <Endgame />}
                {(this.state.displayPregame) && <Pregame />}


            </div>
        )
    }
    
}