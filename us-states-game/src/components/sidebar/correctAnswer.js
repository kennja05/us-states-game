import React from 'react'

export default class CorrectAnswer extends React.Component {

    //hardcoding the correct state in for now. this should actually be passed down from sidebar to both DisplayQuestion and CorrectAnwswer

    render () {
        return (
            <div style={{color: "white"}} className='sub-sidebar'>
                <h1>Great Job!</h1>
                {/* will have to change references to this.state to this.props... */}
                <h3>Here's some more info about {this.props.correctState.name}:</h3>
                <h4>Capital: {this.props.correctState.capital}</h4>
                <h4>Nickname: {this.props.correctState.nickname}</h4>
                <img id='state-image' className="state-img" src={this.props.correctState.image}/>
                <br></br>
                
                <button onClick={this.props.handleNextButtonClick} className='sidebar-button'>Next Question</button>
                
            </div>
        )
    }


}