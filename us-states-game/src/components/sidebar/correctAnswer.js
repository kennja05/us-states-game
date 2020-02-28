import React from 'react'

export default class CorrectAnswer extends React.Component {


    render () {
        return (
            <div className='sub-sidebar'>
                <p>Great Job</p>
                <button onClick={this.props.handleNextButtonClick} className='sidebar-button'>Next Question</button>
                
            </div>
        )
    }


}