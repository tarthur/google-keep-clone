import React, {Component} from 'react'
import {connect} from 'react-redux';
import {addNote, addItem} from '../../redux/notes-reducer'
import NotePanel from './note-panel/note-panel'
import ListNotePanel from './list-note-panel/list-note-panel'
import ImgPanel from './img-panel/img-panel'
import DefaultPanel from './default-panel/default-panel'
import style from './add-notes-panel.scss'

import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
// import { addItem } from '../../store/actions/projectActions'



class AddNotesPanel extends Component {
  state = {
    view: ''
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

  onClickAddBtn = (obj) => {
    // this.props.addNote(obj);
    this.props.addItem({
      mark: false,
      bgColor: '#fff',
      ...obj
    });

    this.changeView('')
  }

  getPanelllll = panel => {
    this.changeView(panel)
  }

  changeView = type => this.setState({type})

  getPanel = () => {
    switch(this.state.type) {
      case 'note' :
        return <NotePanel onClick={this.onClickAddBtn} getPanel={this.getPanelllll}/>
      case 'list' :
        return <ListNotePanel onClick={this.onClickAddBtn}/>
      case 'img' :
        return <ImgPanel onClick={this.onClickAddBtn}/>
      default :
        return <DefaultPanel  getPanel={this.getPanelllll} />
    }
  }

  render() {
    return (
      // <div className="add-notes-panel" ref={this.setWrapperRef}>
      <div className="notes-panel" ref={this.setWrapperRef}>
        { this.getPanel() }
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
    addItem: (item) => dispatch(addItem(item)),
  }
}
// export default firestoreConnect([
//   { collection: 'projects' },
//   { collection: 'items' }
// ])( connect(mapStateToProps, mapDispatchToProps)(AddNotesPanel) );


export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([
    { collection: 'projects' },
    { collection: 'items' },
    { collection: 'notes' }
  ])
)(AddNotesPanel)
