import React, {Component} from 'react'
import NotePreview from '../note-preview'
import {connect} from 'react-redux';
import {delNote, updateNote} from '../../redux/notes-reducer'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import Spinner from '../common/spinner'
import './all-notes.scss'



import Masonry from 'react-masonry-component';

const masonryOptions = {
    transitionDuration: 0
};

const imagesLoadedOptions = { background: '.my-bg-image-el' }



const AllNotes = ({notes, deleteNote, updateNote}) => {
  let notesList;
  console.log('notesnotesnotesnotesnotesnotesnotesnotesnotesnotesnotesnotesnotesnotesnotesnotesnotesnotesnotesnotesnotesnotes')
  console.log(notes)
  
  if (notes) {
    let [...sortNotes] = notes;
    
    sortNotes.sort((a, b) => {
      if (a.time > b.time) return -1;
      if (a.time == b.time) return 0;
      if (a.time < b.time) return 1;
    });

    notesList = sortNotes.map(note => {
      return <NotePreview key={note.id} 
                          note={note} 
                          onClickDeleteBtn={() => deleteNote(note)} 
                          updateNote={updateNote} />
    });
  }
  
  return (

    <div className="all-notes">
      <div className="all-notes__container container">
        <div className="all-notes__main">
          {!notes && <Spinner classes={['big']} />}
          {notes &&  <Masonry
                        className={'ggg'} // default ''
                        elementType={'ul'} // default 'div'
                        options={masonryOptions} // default {}
                        disableImagesLoaded={false} // default false
                        updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false
                        imagesLoadedOptions={imagesLoadedOptions} // default {}
                        onLayoutComplete={(e) => {console.log(1111, e)}}
                      >
                        {notesList}
                      </Masonry>}
          {/* {notesList} */}
        </div>
      </div>
    </div>
  )
}


const mapStateToProps = (state) => {
  return {
    projects: state.firestore.ordered.projects,
    notes: state.firestore.ordered.notes
  }
}

const mapDispatchToProps = dispatch => {
  return {
    deleteNote: (note) => dispatch(delNote(note)),
    updateNote: (id, obj) => dispatch(updateNote(id, obj)),
  }
}  

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([
    { collection: 'projects' },
    { collection: 'notes' }
  ])
)(AllNotes)