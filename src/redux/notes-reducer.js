// let noteId = 1;


const defaultNodeProps = {
  time: +(new Date()),
  bgColor: '#fff',
  fixMark: false,
}




let initialState = {
    // notes: [],
    markNotes: []
};

const notesReducer = (state = initialState, action) => {


    switch(action.type) {
        // case 'ADD_NOTE': {
        //     let newNote = {
        //       ...defaultNodeProps, 
        //       ...action.payload
        //     };
            
        //     return {
        //         ...state,
        //         notes: [...state.notes, newNote]
        //     };
        // }
        // case 'DELETE_NOTE': {
        //     const [...notes] = state.notes;
        //     const idx = notes.findIndex((item) => item.id === action.payload);

        //     return {
        //         notes: [
        //           ...notes.slice(0, idx),
        //           ...notes.slice(idx + 1)
        //         ]
        //     }
        // }
        // case 'UPDATE_NOTE': {
        //     const [...notes] = state.notes;
        //     const idx = notes.findIndex((item) => item.id === action.id);
        //     const item = { ...notes[idx], text: action.value };

        //     return {
        //         notes: [
        //             ...notes.slice(0, idx),
        //             item,
        //             ...notes.slice(idx + 1)
        //         ]
        //     }
            
        // }
        case 'CLEAR_MARKNOTES': {
          return {
            markNotes: []
          }
        }
        case 'ADD_MARK_NOTE': {
          const [...markNotes] = state.markNotes;
          let item;
          
          const index = markNotes.findIndex(item => item.id === action.payload.id)
          if (index === -1) {
            markNotes.push(action.payload)
          } else {
            item = markNotes[index]

            if (item.id === action.payload.id) {
              markNotes.splice(index, 1)
            } else {
              markNotes.push(action.payload)
            }
          }
      

          return {
              ...state,
              markNotes
          };
        }
        default:
            return state;
    }
}

// export const addNote = (payload) => {
//     return {
//       type: 'ADD_NOTE',
//       payload
//     }
// };

export const clearMarkNotes = () => {
  return {
    type: 'CLEAR_MARKNOTES'
  }
};

export const addMarkNote = (payload) => {
  return {
    type: 'ADD_MARK_NOTE',
    payload
  }
};






const genImageName = image => {
  return new Date().getTime() + "." + image.name.split('.').pop();
}
const putImage = (storage, image, name, endFunc) => {
  return storage.ref(`images/${name}`).put(image)
          .on('state_changed', 
            (snapshot) => {}, 
            (error) => { alert(error.message_) }, 
            endFunc
          );
}

const setImage = (name, id, dispatch, getState, getFirestore, storage) => {
  storage.ref('images').child(name).getDownloadURL()
    .then(url => {
      updateNote(id, {url: url, imgName: name})(dispatch, getState, {getFirestore})
    })
}

export const addImage = (note, id) => {
  return (dispatch, getState, {getFirestore, storage}) => {
    const image = note.image;
    const name = genImageName(image);
    
    putImage(storage, image, name, () => setImage(name, id, dispatch, getState, getFirestore, storage));
  }
}

export const addItem = (note) => {
  return (dispatch, getState, {getFirestore, storage}) => {
      let {...newNote} = note
      delete newNote.image

      newNote = {
        ...defaultNodeProps,
        ...newNote,
      }

      const firestore = getFirestore();
      firestore.collection('notes').add(newNote).then(({id}) => {
        if ((note.imgHeight !== undefined) && !note.url) {
          addImage(note, id)(dispatch, getState, {getFirestore, storage});
        }

      }).catch(err => {
        // dispatch({ type: 'CREATE_PROJECT_ERROR' }, err);
      });
  }
};

export const delNote = (note, notes) => {
  console.log(9999999999999)
  console.log(notes)
  return (dispatch, getState, {getFirestore, storage}) => {

    if (note.imgName) {
      let matchesArr = notes.filter(item => item.imgName === note.imgName);


      if (matchesArr.length < 2) {
        // Delete the file
        storage.ref(`images/${note.imgName}`).delete().then(function() {
          // File deleted successfully
          alert('File deleted successfully')
        }).catch(function(error) {
          console.log(storage)
          // Uh-oh, an error occurred!
        });
      }
    }
  
    const firestore = getFirestore();
    firestore.delete({ collection: 'notes', doc: note.id });
  }
};

export const deleteAllNote = (notes) => {
  return (dispatch, getState, {getFirestore, storage}) => {
    dispatch(clearMarkNotes())
    notes.forEach(note => {
      delNote(note)(dispatch, getState, {getFirestore, storage})
    })
  }
};

// export const updateNote = (id, obj) => {
export const updateNote = (id, obj) => {
  return (dispatch, getState, {getFirestore}) => {
    const firestore = getFirestore();
    firestore.update({ collection: 'notes', doc: id }, obj)
  }
};

export default notesReducer;