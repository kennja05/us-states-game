import React from 'react'

export default class DisplayQuestion extends React.Component {

    state = {
        correctState: 'Alabama',
        randoStates: [],
        guessedState: null
    }

    // myArray[Math.floor(Math.random()*myArray.length)]

    generateRandoStates = (stateArray) => {
        for (let i=0; i < 4; i++) {
            let randState = (stateArray[Math.floor(Math.random()*Math.floor(this.props.stateList.length))])
            console.log(randState)
            this.setState({
                randoStates: [...this.state.randoStates, randState]
            })
        }
    }
    
    componentDidMount() {
        this.generateRandoStates(this.props.stateList)
    }
    
    handleFormChange = (event) => {
        this.setState({
            guessedState: event.target.name
        })
    }

    handleGuessState = (e) => {
        e.preventDefault();
        if (this.state.guessedState === this.state.correctState) {
            this.props.handleCorrectAnswer()
        } else {
            console.log('Keep Guessing')
        }
    }
    
    render () {
        return(
            <div style={{color: "white"}} className="sidebar">
            <h2>Where Am I Right Now???</h2>
            <form onSubmit={this.handleGuessState}>
                <p><label>California </label> 
                <input onChange={this.handleFormChange} name='California' type='radio' checked={this.state.guessedState === 'California'}/></p>
                <p><label>Nevada</label>
                <input onChange={this.handleFormChange} name='Nevada' type='radio' checked={this.state.guessedState === 'Nevada'}/></p>
                <p><label>Massachussetts</label>
                <input onChange={this.handleFormChange} name='Massachussetts' type='radio' checked={this.state.guessedState === 'Massachussetts'}/></p>
                <p><label>{this.state.correctState}</label>
                <input onChange={this.handleFormChange} name={this.state.correctState} type='radio' checked={this.state.guessedState === this.state.correctState}/></p>
                <p>
                    <input type='submit' value='Submit Answer!' />
                </p>

            </form>
            </div>
        )
    }



}