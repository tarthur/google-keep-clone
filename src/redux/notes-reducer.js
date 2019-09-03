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

export const delNote = (payload) => {
    return {
      type: 'DELETE_NOTE',
      payload
    }
};

export const updateNote = (id, value) => {
    return {
      type: 'UPDATE_NOTE',
      id,
      value
    }
};

export default notesReducer;