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
import OutsideAlerter from '../../hoc/with-outside-alerter'
import cn from 'classnames'



class AddNotesPanel extends Component {
  defaultNoteView = {
    bgColor: '#fff',
  }

  state = {
    input: null,
    view: '',
    note: {
      ...this.defaultNoteView
    },
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.show !== prevProps.show) {
      this.changeView('')
    }
  }

  onClickAddBtn = (data) => {
    this.setState(state => {
      let note = {
        ...state.note,
        ...data,
        type: state.view
      }

      this.props.addNote(note);

      note = {
        ...this.defaultNoteView
      }

      return { note }
    });

    this.changeView('');
  }

  changeView = (view, input) => {
    this.setState({
      view, input
    })
  }

  setData = note => {
    this.setState({note: {
      ...this.state.note,
      ...note
    }})
  }

  getPanelG = () => {
    let children;
    let bottomPanel = ['color', 'addImg', 'more'];

    switch(this.state.view) {
      case 'note' :
        children = <NotePanel setData={this.setData} />
        break;
      case 'list' :
        children = <ListNotePanel setData={this.setData} />
        break;
      case 'img' :
        bottomPanel = ['color', 'more'];
        children = <NotePanel setData={this.setData} />
        // children = <ImgPanel setData={this.setData} input={this.state.input} />
        break;
    }

    return (
      <NotePanelView onClick={this.onClickAddBtn} getColor={this.getColor} bottomPanel={bottomPanel} input={this.state.input} >
        { children }
      </NotePanelView>
    )
  }

  getColor = bgColor => {
    this.setState(state => {
      const note = {
        ...state.note,
        bgColor
      }
      return { note }
    });
  }

  render() {
    console.log('this.props.notesthis.props.notesthis.props.notesthis.props.notes')
    console.log(this.props.notes)

    return (
      <div className={cn(style.notesPanel, style[this.state.view])} 
            ref={this.props.hhhhh} 
            style={{backgroundColor: this.state.note.bgColor}}>

        { (this.state.view === '') && <DefaultPanel setPanelView={this.changeView} /> }
        { (this.state.view !== '') && this.getPanelG() }

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
  ]),
  OutsideAlerter
)(AddNotesPanel)
