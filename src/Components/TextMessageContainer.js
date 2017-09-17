import React,{Component} from 'react';
import TextMessage from './TextMessage';
import './TextMessageContainer.css';

export default class TextMessageContainer extends Component {

  render(){
    return(
      <div className = "messageBox">
        {this.props.textMessages.map((textMessage, index)=>
          <TextMessage message = {textMessage} key = {index}/>)}
      </div>
    );
  }
}
