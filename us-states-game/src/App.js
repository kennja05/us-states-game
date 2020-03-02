import React from 'react';
import './App.css';
import Map from './Map'
import Sidebar from './components/sidebar/Sidebar'

class App extends React.Component {

  state = {
    usStates: [],
    alienState: {x: 85, y: 5}
  }

  // getRandomState = (usStates) => {
  //   const random = Math.floor(Math.random() * 50) + 1;
  //   return usStates[random]
  // }

  moveAlien = (state) => {
    console.log("ALIEN STATE", state)
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
  }

  render() {
    
    return this.state.usStates.length === 0 ? null : ( 
      <div className="App">
        <Map usStates={this.state.usStates} alienState={this.state.alienState}/>
        <Sidebar allStates={this.state.usStates} moveAlien={this.moveAlien}/>
      </div>
    );
  }
}

export default App;
