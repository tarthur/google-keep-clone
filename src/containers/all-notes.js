import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { notes } from '../selectors';
import AllNotes from '../components/all-notes'


const mapStateToProps = (state) => {
  return {
    notes: notes(state),
  }
}  

export default compose(
  connect(mapStateToProps, null),
  firestoreConnect([
    { collection: 'notes' }
  ])
)(AllNotes)
