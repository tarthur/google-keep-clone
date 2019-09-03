import React, {Component} from 'react'
import {connect} from 'react-redux';
import {addNote} from '../../../redux/notes-reducer'
import BottomPanel from '../../bottom-panel';

class notePanel extends Component {
  state = {
    value: '',
    type: 'note'
  }
  
  onChange = e => this.setState({addInputText: e.target.value})
  onClick = () => {
    this.props.onClick(this.state);
  }

  render() {
    return (
      <div>
        img
        <div>Заголовок</div>
        <input type="text" value={this.value} onChange={this.onChange} />
        <button onClick={this.onClick}>Добавить</button>
        <BottomPanel />
      </div>
    )
  }
}

export default notePanel;