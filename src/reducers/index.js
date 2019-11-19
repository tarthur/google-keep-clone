import { combineReducers } from 'redux'
import notes from './notes';
import { firestoreReducer } from 'redux-firestore';

export default combineReducers({
  notes,
  firestore: firestoreReducer
});


