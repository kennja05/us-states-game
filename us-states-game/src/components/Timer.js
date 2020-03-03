import React from 'react'


export default class Timer extends React.Component {
      render() {

        const {time} = this.props.timer;

        let seconds = Math.floor(time / 1000);

        let minutes = Math.floor(seconds / 60);
        seconds = seconds%60
        
        const hours = Math.floor(minutes / 60);
        minutes = minutes%60

        return(
        <div>
            <h3>{hours}:{minutes}:{seconds}</h3>
        </div>
        )
    }
}
