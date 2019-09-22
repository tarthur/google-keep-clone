import React, {Component} from 'react'
import {connect} from 'react-redux';
import {addNote} from '../../../redux/notes-reducer'
import style from './note-panel.module.scss'

class notePanel extends Component {
  state = {
    value: '',
  }
  
  onChange = e => {
    const value = e.target.value;

    this.setState(state => {
      this.props.setData({
        text: value,
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
      <div className={style.notePanel}>
        <input className={style.input} 
                type="text" value={this.value} 
                placeholder="Заметка" 
                onChange={this.onChange} />
      </div>
    )
  }
}

export default notePanel;