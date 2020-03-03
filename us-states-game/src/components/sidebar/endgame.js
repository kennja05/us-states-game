import React from 'react'
import Leaderboard from './Leaderboard'

export default class Endgame extends React.Component {

    render () {

        return(
            <div className='sub-sidebar'>
                <h1><span role="img" aria-label='winner'>Congratulations You Beat the Game 🏅</span></h1>
               <p><img className="fireworks" alt="Fireworks" src="https://media.giphy.com/media/peAFQfg7Ol6IE/giphy.gif" /></p>
               <Leaderboard />
            </div>
        )
    }


}