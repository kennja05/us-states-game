import React from 'react';
import './App.css';
import Map from './components/Map'
import Sidebar from './components/sidebar/Sidebar'

class App extends React.Component {

  state = {
    users: [],
    usStates: [],
    alienState: {x: 85, y: 5}
  }

  // getRandomState = (usStates) => {
  //   const random = Math.floor(Math.random() * 50) + 1;
  //   return usStates[random]
  // }

  moveAlien = (state) => {
    this.setState({alienState: state})
  }

  componentDidMount() {
    fetch('http://localhost:3000/states')
      .then(res => res.json())
      .then(statesArray => {
        // const initAlienState = this.getRandomState(statesArray);
        this.setState({
          usStates: statesArray
      })})
      fetch('http://localhost:3000/users')
      .then(resp => resp.json())
      .then(userArray => this.setState({
        users: userArray
      }))
  }

  saveGame = (game) => {
    fetch('http://localhost:3000/games', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(game)
    })
      .then(res => res.json())
      .then(game => {
        console.log("GAME: ", game)
        })
  }


  render() {
    
    return this.state.usStates.length === 0 ? null : ( 
      <div className="App">
        <Map usStates={this.state.usStates} alienState={this.state.alienState}/>
        <Sidebar allStates={this.state.usStates} moveAlien={this.moveAlien} users={this.state.users} saveGame={this.saveGame}/>
      </div>
    );
  }
}

export default App;
