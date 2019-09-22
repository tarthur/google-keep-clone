import React, {Component} from 'react'
import NotePreview from '../note-preview'
import {connect} from 'react-redux';
import {delNote, updateNote, addMarkNote} from '../../redux/notes-reducer'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import Spinner from '../common/spinner'
import style from './all-notes.module.scss'
import cn from 'classnames'


import Masonry from 'react-masonry-component';

const masonryOptions = {
    transitionDuration: 0
};

const imagesLoadedOptions = { background: '.my-bg-image-el' }



class AllNotes extends Component {
  state = {
    markNotes: []
  }

  onClickMark = id => {
    this.props.addMarkNote(id)
  }

  onClickFixMark = (id, obj) => {
    this.props.updateNote(id, obj)
  }

  getNotes = () => {
    const {notes, deleteNote, updateNote} = this.props;
    let notesList, fixNotesList;
  
    if (notes) {
      let [...sortNotes] = notes;
      
      sortNotes.sort((a, b) => {
        if (a.time > b.time) return -1;
        if (a.time == b.time) return 0;
        if (a.time < b.time) return 1;
      });

      const getNote = note => {
        return (
          <NotePreview key={note.id} 
                          note={note} 
                          onClickDeleteBtn={() => deleteNote(note, notes)} 
                          updateNote={updateNote} 
                          onClickMark={() => this.onClickMark(note.id)}
                          onClickFixMark={(obj) => this.onClickFixMark(note.id, obj)} />
        )
      }
  
      notesList = sortNotes.filter(note => !note.fixMark).map(getNote)
      fixNotesList = sortNotes.filter(note => note.fixMark).map(getNote)
    }

    if (notes !== undefined) {
      if (notes.length !== 0) {
        const getMasonry = children => {
          return (
            <Masonry
              className={cn(style.npWrap, style.notesList)} // default ''
              elementType={'ul'} // default 'div'
              options={masonryOptions} // default {}
              disableImagesLoaded={false} // default false
              updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false
              imagesLoadedOptions={imagesLoadedOptions} // default {}
              onLayoutComplete={(e) => {console.log(1111, e)}}
            >
              {children}
            </Masonry>
          )
        }

        return (
          <>
            {(fixNotesList.length !== 0) &&
              <>
                <div className={style.fixNotesBox}>
                  <div className={style.notesListTitle}>Закрепленные заметки</div>
                  {getMasonry(fixNotesList)}
                </div>
                <div className={style.notesListTitle}>Другие заметки</div>
              </>}
            {getMasonry(notesList)}
          </>
        )
      } else {
        return (
          <div className={style.emptyNotesBox}>Список заметок пуст</div>
        )
      }
    } else if (notes === undefined) {
      return (
        <Spinner classes={['big']} />
      )
    } 
    
  }
  
  render() {
    return (
      <div className={style.allNotes}>
        <div className="container">
          <div className={style.main}>
            {this.getNotes()}
          </div>
        </div>
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    projects: state.firestore.ordered.projects,
    notes: state.firestore.ordered.notes,
    markNotes: state.notesReducer.markNotes,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    deleteNote: (note, notes) => dispatch(delNote(note, notes)),
    updateNote: (id, obj) => dispatch(updateNote(id, obj)),
    addMarkNote: id => dispatch(addMarkNote(id))
  }
}  

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([
    { collection: 'projects' },
    { collection: 'notes' }
  ])
)(AllNotes)