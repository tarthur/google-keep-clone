import React, {Component} from 'react'
import {connect} from 'react-redux';
import {addNote} from '../../../redux/notes-reducer'
import BottomPanel from '../../bottom-panel';
// import style from './note-panel.module.scss'

class DefaultPanel extends Component {
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
      <React.Fragment>
        <div className="notes-panel__textarea" onClick={() => this.props.getPanel('note')} >
          Заметка…
        </div>
        <div className="notes-panel__icon notes-panel__list-icon" onClick={() => this.props.getPanel('list')} >
          <i class="far fa-check-square"></i>
        </div>
        <div className="notes-panel__icon notes-panel__img-icon" onClick={() => this.props.getPanel('img')}>
        <i class="far fa-image"></i>
        </div>
      </React.Fragment>
    )
  }
}

export default DefaultPanel;