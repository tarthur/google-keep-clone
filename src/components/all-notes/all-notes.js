import React, {Component} from 'react'
import NotePreview from '../note-preview'
import {connect} from 'react-redux';
import {delNote, updateNote, addMarkNote} from '../../redux/notes-reducer'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import Spinner from '../common/spinner'
import style from './all-notes.module.scss'
import Masonry from 'react-masonry-component';
import cn from 'classnames'


const AllNotes = props => {
  const masonryOptions = { transitionDuration: 0 };
  const imagesLoadedOptions = { background: '.my-bg-image-el' }

  const {notes, deleteNote, updateNote, addMarkNote} = props;
  let notesList = [];
  let fixNotesList = [];

  const sortNotesFunc = (a, b) => {
    if (a.time > b.time) return -1;
    if (a.time == b.time) return 0;
    if (a.time < b.time) return 1;
  }

  const getMasonry = children => {
    return (
      <Masonry
        className={cn(style.npWrap, '')} // default ''
        // elementType={'ul'} // default 'div'
        options={masonryOptions} // default {}
        disableImagesLoaded={false} // default false
        updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false
        imagesLoadedOptions={imagesLoadedOptions} // default {}
        onLayoutComplete={(e) => {console.log(1111, e)}} >

          {children}

      </Masonry>
    )
  }
  
  if (notes) {
    let [...sortNotes] = notes;
    sortNotes.sort(sortNotesFunc);

    const getNote = note => {
      return (
        <NotePreview key={note.id} 
                      note={note} 
                      updateNote={(obj) => updateNote(note.id, obj)} 
                      onClickMark={() => addMarkNote(note.id)} />
      )
    }

    notesList = sortNotes.filter(note => !note.fixMark).map(getNote)
    fixNotesList = sortNotes.filter(note => note.fixMark).map(getNote)
  }

  const getNotes = () => {
    if (notes.length !== 0) {
      return (
        <>
          {(fixNotesList.length !== 0) &&
            <>
              <div className={style.fixNotesBox}>
                <div className={style.notesListTitle}>Закрепленные заметки</div>
                {getMasonry(fixNotesList)}
              </div>
            </>}

          {((fixNotesList.length !== 0) && (notesList.length !== 0)) && (
            <div className={style.notesListTitle}>Другие заметки</div>
          )}
          {(notesList.length !== 0) && getMasonry(notesList)}
        </>
      )
    } else {
      return (
        <div className={style.emptyNotesBox}>Список заметок пуст...</div>
      )
    }
  }
  
  return (
    <div className={style.allNotes}>
      <div className="container">
        <div className={cn(style.main,  style.notesList)} >
          {(notes === undefined) && <Spinner classes={['big']} />}
          {(notes !== undefined) && getNotes()}
        </div>
      </div>
    </div>
  )
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