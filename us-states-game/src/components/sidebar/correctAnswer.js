import React from 'react'

export default class CorrectAnswer extends React.Component {

    //hardcoding the correct state in for now. this should actually be passed down from sidebar to both DisplayQuestion and CorrectAnwswer
    state = {
        correctState: {name:'Alabama', id: 1, "capital": "Montgomery",
        "nickname": "The Yellowhammer State",
        "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ4bZXFbwmuqvKZufE8Gj8_gzX2WgiXLFhHXB_cKgq7QB-wdNYX",
        "x": 67,
        "y": 67
        }
    }

    render () {
        return (
            <div style={{color: "white"}} className='sub-sidebar'>
                <h1>Great Job!</h1>
                {/* will have to change references to this.state to this.props... */}
                <h3>Here's some more info about {this.state.correctState.name}:</h3>
                <h4>Capital: {this.state.correctState.capital}</h4>
                <h4>Nickname: {this.state.correctState.nickname}</h4>
                <img id='state-image' src={this.state.correctState.image}/>
                <br></br>
                
                <button onClick={this.props.handleNextButtonClick} className='sidebar-button'>Next Question</button>
                
            </div>
        )
    }


}