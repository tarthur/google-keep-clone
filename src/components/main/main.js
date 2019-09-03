import React, {Component} from 'react'
import AddNotesPanel from '../add-notes-panel'
import AllNotes from '../all-notes'
import OutsideAlerter from "../../utils/outside-alerter";
import style from './main.module.scss'


const Main = () => {
  return (
    <div className={style.main}>
      <AddNotesPanel />
      <AllNotes />
    </div>
  )
}

export default Main