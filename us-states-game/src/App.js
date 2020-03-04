import React from 'react';
import './App.css';
import Map from './components/Map'
import Sidebar from './components/sidebar/Sidebar'

const BASE_URL = 'http://localhost:3000'

class App extends React.Component {

  state = {
    users: [],
    usStates: [],
    alienState: {x: 85.5, y: 5.5}
  }

  moveAlien = (state) => {
    this.setState({alienState: state})
  }

  componentDidMount() {
    fetch(`${BASE_URL}/states`)
      .then(res => res.json())
      .then(statesArray => {
        this.setState({
          usStates: statesArray
      })})
      fetch(`${BASE_URL}/users`)
      .then(resp => resp.json())
      .then(userArray => this.setState({
        users: userArray
      }))
  }

  saveGame = (game) => {
    fetch(`${BASE_URL}/games`, {
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
