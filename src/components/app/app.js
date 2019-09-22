import React from 'react';
import Header from '../header'
import AddNotesPanel from '../add-notes-panel'
import AllNotes from '../all-notes'
import ErrorBoundry from '../error-boundry/error-boundry';
import style from './app.module.scss'


const App = () => {
  return (
    <ErrorBoundry>
      
      <div className={style.app}>
        <Header />

        <div className={style.main}>
          <AddNotesPanel />
          <AllNotes />
        </div>
      </div>

    </ErrorBoundry>
  );
}

export default App;
