import React from 'react'

export default class DisplayQuestion extends React.Component {

    state = {
        
        guessedState: null,
        questionListStates: [] //hope to use this so that the order of states in the form is randomized (the first in the list shouldnt be correct every time...)
    }

    // currently allows for the same element to be chosen randomly multiple times
    // should be fixed l8er


    handleFormChange = (event) => {
        this.setState({
            guessedState: event.target.name
        })
    }

    handleGuessState = (e) => {
        e.preventDefault();
        this.props.handleGuessState(this.state.guessedState)
    }
    
    render () {
        return(
            <div style={{color: "white"}} className="sub-sidebar">
            <h2>Where Am I Right Now???</h2>
            {this.props.randoStates.length === 0 ? null : 
            <form onSubmit={this.handleGuessState}>
                <p><label>{this.props.randoStates[0].name}</label> 
                <input onChange={this.handleFormChange} name={this.props.randoStates[0].name} type='radio' checked={this.state.guessedState === this.props.randoStates[0].name}/></p>
                <p><label>{this.props.randoStates[1].name}</label>
                <input onChange={this.handleFormChange} name={this.props.randoStates[1].name} type='radio' checked={this.state.guessedState === this.props.randoStates[1].name}/></p>
                <p><label>{this.props.randoStates[2].name}</label>
                <input onChange={this.handleFormChange} name={this.props.randoStates[2].name} type='radio' checked={this.state.guessedState === this.props.randoStates[2].name}/></p>
                <p><label>{this.props.randoStates[3].name}</label>
                <input onChange={this.handleFormChange} name={this.props.randoStates[3].name} type='radio' checked={this.state.guessedState === this.props.randoStates[3].name}/></p>
                <p>
                    <input type='submit' value='Submit Answer!' />
                </p>

            </form>
            }
            </div>
        )
    }



}