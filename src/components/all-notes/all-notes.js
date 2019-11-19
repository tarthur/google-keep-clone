import React from 'react';
import cn from 'classnames';
import Masonry from 'react-masonry-component';
import NotesPreviewContainer from '../../containers/note-preview-container';
import Spinner from '../common/spinner';
import sortByTime from '../../utils/sort-by-time';
import style from './all-notes.module.scss';


const AllNotes = props => {
  const masonryOptions = { transitionDuration: 0 };
  const imagesLoadedOptions = { background: '.my-bg-image-el' }

  const {notes} = props;
  let notesList = [];
  let fixNotesList = [];

  const getMasonry = children => {
    return (
      <Masonry
        className={cn(style.npWrap, '')}
        options={masonryOptions}
        disableImagesLoaded={false}
        updateOnEachImageLoad={false}
        imagesLoadedOptions={imagesLoadedOptions}
        onLayoutComplete={(e) => {}} 
        >

          {children}

      </Masonry>
    )
  }
  
  if (notes) {
    let [...sortNotes] = notes;
    sortNotes.sort(sortByTime);

    const getNote = note => <NotesPreviewContainer key={note.id} note={note}/>

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

export default AllNotes;
