import React, {Component} from 'react'
import {connect} from 'react-redux';
import {addNote, addItem} from '../../redux/notes-reducer'
import NotePanel from './note-panel/note-panel'
import ListNotePanel from './list-note-panel/list-note-panel'
import ImgPanel from './img-panel/img-panel'
import DefaultPanel from './default-panel/default-panel'
import style from './add-notes-panel.module.scss'

import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
// import { addItem } from '../../store/actions/projectActions'

import NotePanelView from './note-panel-view/note-panel-view'



class AddNotesPanel extends Component {
  state = {
    note: {},
    view: '',
    
//   value: '',
//   type: 'note',
//   editMode: false,
//   bgColor: 'transparent',
//   time: +(new Date())
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  handleClickOutside = (event) => {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.changeView('')
    }
  }

  setWrapperRef = (node) => {
    this.wrapperRef = node;
  }

  onClickAddBtn = (data) => {
    this.setState(state => {
      const note = {
        ...state.note,
        ...data
      }

      this.props.addNote(note);

      return { note }
    });

    this.changeView('');
  }

  changeView = view => this.setState({view})

  setData = note => {
    this.setState({note: {
      ...this.state.note,
      ...note
    }})
  }

  getPanelG = () => {
    switch(this.state.view) {
      case 'note' :
        return <NotePanel setData={this.setData} />
      case 'list' :
        return <ListNotePanel setData={this.setData} />
      case 'img' :
        return <ImgPanel setData={this.setData}/>
    }
  }

  render() {
    return (
      <div className={style.notesPanel} ref={this.setWrapperRef}>
        {
          this.state.view === '' 
          ? 
          <DefaultPanel setPanelView={this.changeView} /> 
          :
          <NotePanelView onClick={this.onClickAddBtn}>
            { this.getPanelG() }
          </NotePanelView>
        }
      </div>
    )
  }
}




const mapStateToProps = (state) => {
  return {
    projects: state.firestore.ordered.projects,
    notes: state.firestore.ordered.notes
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addNote: (item) => dispatch(addItem(item)),
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([
    { collection: 'projects' },
    { collection: 'items' },
    { collection: 'notes' }
  ])
)(AddNotesPanel)
