import React from 'react';
import Header from '../header'
import AddNotesPanel from '../add-notes-panel'
import AllNotes from '../all-notes'
import './app.scss'


const App = () => {
  return (
    <div className="app">
      <Header className="app__header" />
      <div className="app__main">
        <AddNotesPanel className="app__notes-panel" />
        <AllNotes />
      </div>
    </div>
  );
}

export default App;
