import React, {Component} from 'react';
import InitialApp from './InitialApp';
import MainApp from './MainApp';

export default class AppHolder extends Component {

  constructor() {
    super();
    this.state = {
      nickName: '',
      longitude: '',
      latitude: ''
    }
  }

  updateState(newState){
    this.setState({
      nickName: newState.textValue,
      longitude: newState.longitude,
      latitude: newState.latitude
    });
  }

  render() {
    return(
      <div>
        {this.state.nickName === '' ? (<InitialApp updateState = {this.updateState.bind(this)}/>) : (<MainApp newState = {this.state}/>)}
      </div>
    );
  }

}
