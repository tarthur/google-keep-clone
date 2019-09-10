import React, {Component} from 'react'
import {connect} from 'react-redux';
import {addNote} from '../../../redux/notes-reducer'
import BottomPanel from '../../bottom-panel';
import style from './note-panel.module.scss'

class notePanel extends Component {
  state = {
    value: '',
    type: 'note',
    editMode: false,
    title: '',
    bgColor: 'transparent',
    time: +(new Date())
  }
  
  onChange = e => this.setState({addInputText: e.target.value})
  onClick = () => {
    this.props.onClick(this.state);
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

  onTitleChange = (e) => {
      this.setState({
          title: e.currentTarget.value
      });
  }

  getColor = bgColor => {
    this.setState({bgColor})
  }

  render() {
    return (
      <div className={style.notePanel} style={{backgroundColor: this.state.bgColor}}>
        
        <div className={style.title}>
          <input onChange={this.onTitleChange} 
                  value={this.state.title} 
                  placeholder="Заголовок"  />
        </div>
        <div className={style.inputBox}>
          <input className={style.input} 
                  type="text" value={this.value} 
                  placeholder="Заметка" 
                  onChange={this.onChange} />
        </div>
        <div className={style.bottomPanel}>
          <BottomPanel getColor={this.getColor} getPanel={this.props.getPanel} />
          <button onClick={this.onClick}>Добавить</button>
        </div>
      </div>
    )
  }
}

export default notePanel;