import React from 'react';
import ErrorBoundry from '../error-boundry';
import Header from '../../containers/header';
import AddNotesPanel from '../../containers/add-notes-panel';
import AllNotes from '../../containers/all-notes';
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
