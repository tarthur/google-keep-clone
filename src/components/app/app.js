import React from 'react';
import Header from '../header'
import AddNotesPanel from '../add-notes-panel'
import AllNotes from '../all-notes'
import style from './app.module.scss'


const App = () => {
  return (
    <div className={style.app}>
      <Header />

      <div className={style.main}>
        <AddNotesPanel className={style.notesPanel} />
        <AllNotes />
      </div>
    </div>
  );
}

export default App;
