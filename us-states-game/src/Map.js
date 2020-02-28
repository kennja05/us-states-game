import React, {Component} from 'react';

const SMALL_STATES = [{name: "Massachusetts", realX: 93, realY: 19},
                             {name: "Connecticut", realX: 92, realY: 23.5},
                             {name: "Rhode Island", realX: 93.5, realY: 22.5},
                             {name: "Maryland", realX: 85.5, realY: 36},
                             {name: "New Jersey", realX: 89, realY: 32},
                             {name: "Delaware", realX: 88.5, realY: 36}
                                
                            ]

export default class Map extends Component {

    state = {
        left: -50,
        top: -50,
        realLeft: -50,
        realTop: -50
    }

    render () {
        const alienStyle = {
            left: `${this.state.left}%`,
            top: `${this.state.top}%`
        }
        const redDotStyle = {
            left: `${this.state.realLeft}%`,
            top: `${this.state.realTop}%`
        }
        
       
        return (
            <div className="map" onClick={this.onClick}> 
                <div className="alien" style={alienStyle} /> 
                <div className="redDot" style={redDotStyle} /> 
            </div>
        )
    }

    onClick = event => {
        const random = Math.floor(Math.random() * 50) + 1;

        const randomState = this.props.usStates[random]
        // const randomState = this.props.usStates.find(state => state.name === "Delaware");
        const smallState = SMALL_STATES.find(state => state.name === randomState.name);

        const realLeft = smallState ? smallState.realX : -50
        const realTop = smallState ? smallState.realY : -50

        this.setState({top: randomState.y, 
                       left: randomState.x,
                       realLeft: realLeft,
                       realTop: realTop})
        alert(randomState.name)

        event.persist()
        console.log(event);
        const x = event.pageX -10
        const y = event.pageY -15
        const width = event.target.offsetWidth
        const height = event.target.offsetHeight
    
        const relativeX = x / width * 100 
        const relativeY = y / height * 100 
        console.log(relativeX, relativeY)
    
      }
}