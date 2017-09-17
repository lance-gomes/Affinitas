import React,{Component} from 'react';

export default class TextMessage extends Component {
  render(){
    return(
      <a>{this.props.message}</a>
    );
  }
}
