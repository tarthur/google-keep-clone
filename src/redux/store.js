import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import notesReducer from "./notes-reducer";
import { firestoreReducer } from 'redux-firestore';
import thunk from 'redux-thunk'
import { reduxFirestore, getFirestore } from 'redux-firestore';
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase';
import fbConfig, {storage} from './../config/fbConfig'

let reducers = combineReducers({
  notesReducer,
  firestore: firestoreReducer
});


// let store = createStore(reducers);

const store = createStore(reducers,
  compose(
    applyMiddleware(thunk.withExtraArgument({getFirebase, getFirestore, storage})),
    reactReduxFirebase(fbConfig), // redux binding for firebase
    reduxFirestore(fbConfig) // redux bindings for firestore
  )
);

window.store = store.getState()


export default store;
