import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import loggerMiddleware from 'redux-logger';
import { reduxFirestore, getFirestore } from 'redux-firestore';
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase';
import fbConfig, {storage} from '../config/fbConfig';
import rootReducer from '../reducers';

export default function cofigureStore() {
  if (process.env.NODE_ENV === 'production') {
    return createStore(
      rootReducer,
      compose(
        applyMiddleware(
          thunk.withExtraArgument({getFirebase, getFirestore, storage}),
        ),
        reactReduxFirebase(fbConfig),
        reduxFirestore(fbConfig)
      )
    )
  } else {
    return createStore(
      rootReducer,
      compose(
        applyMiddleware(
          thunk.withExtraArgument({getFirebase, getFirestore, storage}),
          loggerMiddleware
        ),
        reactReduxFirebase(fbConfig), // redux binding for firebase
        reduxFirestore(fbConfig) // redux bindings for firestore
      )
    )
  }
}
