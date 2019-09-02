import {combineReducers, createStore} from "redux";
import notesReducer from "./notes-reducer";

let reducers = combineReducers({
  notesReducer,
});

let store = createStore(reducers);



export default store;