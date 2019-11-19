import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { addNote } from '../actions/notes'
import { notes } from '../selectors';
import { AddNotesPanel } from '../components/add-notes-panel';
import OutsideAlerter from '../hoc/with-outside-alerter';


const mapStateToProps = (state) => {
  return {
    notes: notes(state),
  }
}

const mapDispatchToProps = {
  addNote
} 

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([
    { collection: 'notes' }
  ]),
  OutsideAlerter
)(AddNotesPanel)
