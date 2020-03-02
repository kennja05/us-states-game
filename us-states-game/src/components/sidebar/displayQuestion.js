import React from 'react'

export default class DisplayQuestion extends React.Component {

    state = {
        correctState: {name:'Alabama', id: 1, "capital": "Montgomery",
        "nickname": "The Yellowhammer State",
        "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ4bZXFbwmuqvKZufE8Gj8_gzX2WgiXLFhHXB_cKgq7QB-wdNYX",
        "x": 67,
        "y": 67
        }, //this really should be passe down as a prop, hardcoding here for now
        randoStates: [],
        guessedState: null,
        questionListStates: [] //hope to use this so that the order of states in the form is randomized (the first in the list shouldnt be correct every time...)
    }

    // currently allows for the same element to be chosen randomly multiple times
    // should be fixed l8er
    generateRandoStates = (stateArray) => {
        for (let i=0; i < 4; i++) {
            let randState = (stateArray[Math.floor(Math.random()*Math.floor(this.props.stateList.length))])
            this.setState(oldState => {return {
                randoStates: [...oldState.randoStates, randState]
            }})
            this.props.moveAlien(randState)
        }
    }

    
    componentDidUpdate() {
        if (this.state.randoStates.length === 0) {
            this.generateRandoStates(this.props.stateList)
        }
    }

    

    handleFormChange = (event) => {
        this.setState({
            guessedState: event.target.name
        })
    }

    handleGuessState = (e) => {
        e.preventDefault();
        if (this.state.guessedState === this.state.correctState.name) {
            this.props.handleCorrectAnswer()
        } else {
            alert("Wrong answer. Shame on you and your ancestors. Please guess again!")
        }
    }
    
    render () {
        return(
            <div style={{color: "white"}} className="sub-sidebar">
            <h2>Where Am I Right Now???</h2>
    
            <form onSubmit={this.handleGuessState}>
                <p><label>Cali</label> 
                <input onChange={this.handleFormChange} name='cali' type='radio' checked={this.state.guessedState === 'cali'}/></p>
                <p><label>Nevada</label>
                <input onChange={this.handleFormChange} name='Nevada' type='radio' checked={this.state.guessedState === 'Nevada'}/></p>
                <p><label>Massachussetts</label>
                <input onChange={this.handleFormChange} name='Massachussetts' type='radio' checked={this.state.guessedState === 'Massachussetts'}/></p>
                <p><label></label>
                <input onChange={this.handleFormChange} name={this.state.correctState.name} type='radio' checked={this.state.guessedState === this.state.correctState}/></p>
                <p>
                    <input type='submit' value='Submit Answer!' />
                </p>

            </form>
            </div>
        )
    }



}