let noteId = 1;

let initialState = {
    notes: [],
};

const notesReducer = (state = initialState, action) => {

    switch(action.type) {
        case 'ADD_NOTE': {
            let noteProps = {
                id: noteId++,
                mark: false,
                bgColor: '#fff'
            }
            let newNote = {...noteProps, ...action.payload};
            console.log(state)
            return {
                ...state,
                notes: [...state.notes, newNote]
            };
        }
        case 'DELETE_NOTE': {
            const [...notes] = state.notes;
            const idx = notes.findIndex((item) => item.id === action.payload);

            return {
                notes: [
                  ...notes.slice(0, idx),
                  ...notes.slice(idx + 1)
                ]
            }
        }
        case 'UPDATE_NOTE': {
            const [...notes] = state.notes;
            const idx = notes.findIndex((item) => item.id === action.id);
            const item = { ...notes[idx], text: action.value };

            return {
                notes: [
                    ...notes.slice(0, idx),
                    item,
                    ...notes.slice(idx + 1)
                ]
            }
            
        }
        default:
            return state;
    }
}

export const addNote = (payload) => {
    return {
      type: 'ADD_NOTE',
      payload
    }
};

export const addItem = (item) => {
  return (dispatch, getState, {getFirestore}) => {
    // make async call to database
    const firestore = getFirestore();
    firestore.collection('notes').add(item)
    .then(() => {
      // dispatch({ type: 'CREATE_PROJECT_SUCCESS' });
    }).catch(err => {
      // dispatch({ type: 'CREATE_PROJECT_ERROR' }, err);
    });
  }
};

export const delNote = (id) => {
  return (dispatch, getState, {getFirestore}) => {
    const firestore = getFirestore();
    firestore.delete({ collection: 'notes', doc: id });
  }
};

export const updateNote = (id, obj) => {
  console.log('==========>>>>>>>>>>>>')
  console.log('==========>>>>>>>>>>>>')
  console.log('==========>>>>>>>>>>>>')
  console.log(obj)

  return (dispatch, getState, {getFirestore}) => {
    const firestore = getFirestore();
    firestore.update({ collection: 'notes', doc: id }, obj)
  }
};


// export const updateNote = (id, value) => {
//     return {
//       type: 'UPDATE_NOTE',
//       id,
//       value
//     }
// };

export default notesReducer;