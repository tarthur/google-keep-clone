import React, {Component} from 'react'
import {connect} from 'react-redux';
import {addNote} from '../../../redux/notes-reducer'
import './note-panel.scss'

class notePanel extends Component {
  state = {
    value: '',
    type: 'note'
  }
  
  onChange = e => {
    const value = e.target.value;

    this.setState(state => {
      this.props.setData({
        text: value,
        type: state.type
      });
      
      return { value }
    });
  }

  deactivateEditMode() {
    this.setState( {
      editMode: false
    } );
    // this.props.updateStatus(this.state.status);
  }

  activateEditMode = () => {
    this.setState( {
      editMode: true
    } );
  }

  render() {
    return (
      <div className="note-panel">
        <div className="note-panel__input-box">
          <input className="note-panel__input" 
                  type="text" value={this.value} 
                  placeholder="Заметка" 
                  onChange={this.onChange} />
        </div>
      </div>
    )
  }
}

export default notePanel;