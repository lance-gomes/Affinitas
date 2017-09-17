import React, {Component} from 'react';
import './InitialApp.css';

export default class InitialApp extends Component {

  constructor(){
    super();
    this.state = {
      textValue: '',
      longitude: '',
      latitude: ''
    }

    // Obtains the users current latitude and longitude
    navigator.geolocation.getCurrentPosition((pos)=>{
      this.setState({
        longitude: pos.coords.longitude,
        latitude: pos.coords.latitude
      });
    });
  }

  updateInput(e){
    this.setState({
      textValue: e.target.value
    });
  }

  handlePressingEnter(e) {
    if(e.charCode === 13) {
      this.checkIfValidName();
    }
  }

  checkIfValidName(){
    if(this.state.textValue!=='') {
      this.props.updateState(this.state);
    }
  }

  render(){
    return(
      <div className = 'wrapper'>
        <div className = 'signupBox'>
          <div className = "textContainer"> Please enter a nickname. </div>
          <input value = {this.state.textValue} onChange = {this.updateInput.bind(this)} onKeyPress = {this.handlePressingEnter.bind(this)} />
          <button className = 'startButton' onClick = {this.checkIfValidName.bind(this)}>Start Chatting!</button>
        </div>
      </div>
    );
  }

}
