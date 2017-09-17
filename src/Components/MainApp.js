import React,{Component} from 'react';
import TextMessageContainer from './TextMessageContainer.js';
import './MainApp.css';

const serverAddress = 'http://localhost:4000';
const io = require('socket.io-client');
var socket;

export default class MainApp extends Component {

  constructor() {
    super();
    this.state = {
      textValue: '',
      textMessages: ['Say Hi!'],
      participants: 1
    }
    socket = io(serverAddress);

    socket.on('locationRequest', (body) =>{
      socket.emit('locationSent',{
        longitude: this.props.newState.longitude,
        latitude: this.props.newState.latitude
      });
    });

    socket.on('messageReceived', (body) =>{
      var initialArray = this.state.textMessages;
      initialArray.push(body.nickName + ' : ' + body.message);
      this.setState({
        textMessages: initialArray,
        participants: body.participants
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
      this.sendMessage();
    }
  }

  sendMessage(){
    socket.emit('messageSent',{
      message : this.state.textValue,
      nickName: this.props.newState.nickName,
      longitude: this.props.newState.longitude,
      latitude: this.props.newState.latitude
    });
    this.setState({
      textValue: ''
    });
  }

  render() {
    return(
        <div className = 'chatBox'>
          <div className = 'messagingContainer'>
            <TextMessageContainer textMessages = {this.state.textMessages} />
            <input className = "typeBox" value = {this.state.textValue} placeholder = "Press Enter To Send..." onChange = {this.updateInput.bind(this)} onKeyPress = {this.handlePressingEnter.bind(this)} />
          </div>
          <div className = 'infoContainer'>
            <a> Participants: {this.state.participants} </a>
          </div>
        </div>
    );
  }
}
