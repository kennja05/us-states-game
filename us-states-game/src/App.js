import React from 'react';
import './App.css';
import Map from './Map'
import Sidebar from './components/sidebar/Sidebar'

class App extends React.Component {

  state = {
    top: 92,
    left: 7,
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

    const alienStyle = {
      top: `${this.state.top}%`,
      left: `${this.state.left}%`
    }
    return (
      <div className="App">
        <Map usStates={this.state.usStates} />
        <div className="sidebar" />
        <Sidebar positionTop={this.state.top} positionLeft={this.state.left} allStates={this.state.usStates}/>
      </div>
    );
  }
}

export default App;
