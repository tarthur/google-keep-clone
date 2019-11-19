import React from 'react';
import Logo from '../common/logo';
import HeaderMarks from '../header-marks';
import style from './header.module.scss';


const Header = ({ markNotes, clearMarkNotes, addNote, 
                  updateNote, deleteAllNote }) => {
                    
  return (
    <div className={style.header}>
      {/* (markNotes.length > 0) */}
      {(false) && <HeaderMarks clearMarkNotes={clearMarkNotes}
                                              markNotes={markNotes}
                                              addNote={addNote}
                                              updateNote={updateNote}
                                              deleteAllNote={deleteAllNote} />}
      <div className="container">
        <div className={style.main}>
          <Logo />
        </div>
      </div>
    </div>
  )
}

export default Header

