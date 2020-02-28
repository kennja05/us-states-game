import React from 'react';
import './App.css';
import mapImage from './blank-usa-map.jpg'
import Sidebar from './sidebar/sidebar'

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
    const alienStyle = {
      top: `${this.state.top}%`,
      left: `${this.state.left}%`
    }
    return (
      <div className="App">
        
        {/* <Map />
        <Sidebar /> */}
        <div className="map" onClick={this.onClick}> 
            <div className="alien" style={alienStyle} /> 
        </div>
        <Sidebar positionTop={this.state.top} positionLeft={this.state.left} allStates={this.state.usStates}/>
  
      </div>
    );
  }
  
  onClick = event => {
    event.persist()
    console.log(event);
    const x = event.pageX
    const y = event.pageY
    const width = event.target.offsetWidth
    const height = event.target.offsetHeight

    // console.log('X: ', x)
    // console.log('Y: ', y)
    // console.log('width: ', width)
    // console.log('height: ', height)

    const relativeX = x / width * 100 - 3
    const relativeY = y / height * 100 - 3
    console.log(relativeX, relativeY)

    this.setState({top: relativeY, left: relativeX})
  }

}

export default App;
