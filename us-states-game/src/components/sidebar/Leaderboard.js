import React from 'react'
import { Link } from 'react-router-dom'

export default class Leaderboard extends React.Component {

    state = {
        games: []
    }

    componentDidMount() {
        fetch('https://afternoon-waters-38329.herokuapp.com/leaderboard')
            .then(res => res.json())
            .then(sortedGameList => this.setState({
                games: sortedGameList
            }))
    }

    timer = (timeVal) => {
        let seconds = Math.floor(timeVal/1000)
        let minutes = Math.floor(seconds/60)
        seconds = seconds%60
        let hours = Math.floor(minutes/60)
        minutes = minutes%60
        return `${hours} Hours, ${minutes} Minutes, ${seconds} Seconds`
    }

    render () {

        return(
            <div style={{color: "white"}} className='sidebar'>
                <h2>Top Players</h2>
                <ol>
                    {this.state.games.map(game => 
                    <li key={game.id}>
                        <b>{game.user.name}</b><div><img alt='avatar' className='profile-pic' src={game.user.image}/></div>
                        <ul>
                        <li>Attempts: {game.moves}</li>
                        <li>Time: {this.timer(game.time)}</li>
                        </ul>
                    </li>)}         
                </ol>
                <Link to='/play'>
                <button className='button'>Begin New Game</button>
                </Link>
            </div>
        )
    }


}