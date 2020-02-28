import React from 'react' 
import CorrectAnswer from './correctAnswer'
import Pregame from './pregame'
import Endgame from './endgame'
import DisplayQuestion from './displayQuestion'

export default class Sidebar extends React.Component {

    //the goal of this state is to condi
    state={
        guessedStates: [],
        displayPregame: false,
        displayQuestion: true, 
        displayStateInfo: false,
        displayEndgame: false
    }

    //this is passed down to the displayQuestion component
    handleCorrectAnswer = () => {
        this.setState({
            displayQuestion: false,
            displayStateInfo: true,
        })
    }

    //this button should handle the next quesi

    render() {
        return(
            <div className='sidebar'>

                {(this.state.displayQuestion) && <DisplayQuestion handleCorrectAnswer={this.handleCorrectAnswer} stateList={this.props.allStates}/>}
                {(this.state.displayStateInfo) && <CorrectAnswer />}


            </div>
        )
    }
    


}