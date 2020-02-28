import React from 'react';
import './App.css';
import Sidebar from './components/sidebar/Sidebar'
import Map from './Map'

class App extends React.Component {

  state = {
    top: 67,
    left: 67,
    usStates: []
  }

  componentDidMount() {
    fetch('http://localhost:3000/states')
      .then(res => res.json())
      .then(statesArray => this.setState({
        usStates: statesArray
      }))
  }

  render() {
    return (
      <div className="App">
        <Map usStates={this.state.usStates} />
        <Sidebar positionTop={this.state.top} positionLeft={this.state.left} allStates={this.state.usStates}/>
      </div>
    );
  }
}

export default App;
