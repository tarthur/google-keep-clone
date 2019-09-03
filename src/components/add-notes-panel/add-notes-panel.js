import React, {Component} from 'react'
import {connect} from 'react-redux';
import {addNote, addItem} from '../../redux/notes-reducer'
import NotePanel from './note-panel/note-panel'
import ListNotePanel from './list-note-panel/list-note-panel'
import ImgPanel from './img-panel/img-panel'
import style from './add-notes-panel.module.scss'

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

  changeView = type => this.setState({type})

  getPanel = () => {
    switch(this.state.type) {
      case 'note' :
        return <NotePanel onClick={this.onClickAddBtn}/>
      case 'list' :
        return <ListNotePanel onClick={this.onClickAddBtn}/>
      case 'img' :
        return <ImgPanel onClick={this.onClickAddBtn}/>
      default :
        return (
          <React.Fragment>
            <div className={style.textarea} onClick={() => this.changeView('note')} >
              Заметка…
            </div>
            <div className={`${style.icon} ${style.listIcon}`} onClick={() => this.changeView('list')}>
              <i class="far fa-check-square"></i>
            </div>
            <div className={`${style.icon} ${style.imgIcon}`} onClick={() => this.changeView('img')}>
            <i class="far fa-image"></i>
            </div>
          </React.Fragment>
        )
    }
  }

  render() {
    console.log('>>>>>>>>>>.')
    console.log(this.props)
    return (
      <div className={style.addNotesPanel} ref={this.setWrapperRef}>
        { this.getPanel() }
      </div>
    )
  }
}

// let mapStateToProps = (state) => {
//   return {
//     notes: state.notesReducer.notes,
//   }
// }

// let mapDispatchToProps = (dispatch) => {
//   return {
//     addNote: (obj) => dispatch(addNote(obj)),
//   }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(AddNotesPanel);


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
