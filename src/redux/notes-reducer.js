import firebase from '../config/fbConfig'
import getImgSizes from '../utils/get-image-sizes'



const defaultNodeProps = {
  time: +(new Date()),
}

let initialState = {
  markNotes: []
};

const notesReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'CLEAR_MARKNOTES': {
      return { markNotes: [] }
    }
    case 'CLEAR_MARKNOTES': {
      return { markNotes: [] }
    }
    case 'ADD_MARK_NOTE': {
      const [...markNotes] = state.markNotes;
      let item;
      
      const index = markNotes.findIndex(item => item.id === action.payload.id)
      if (index === -1) {
        markNotes.push(action.payload)
      } else {
        item = markNotes[index]
        markNotes.splice(index, 1)
      }

      console.log(markNotes)
  
      return {
          ...state,
          markNotes
      };
    }
    default:
        return state;
  }
}

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

export const removeAllMarkNote = () => {
  return {
    type: 'REMOVE_ALL_MARK_NOTES'
  }
}

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
      updateNote(id, {url, imgName: name})(dispatch, getState, {getFirestore})
    })
}

export const addImage = (image, id) => {
  return (dispatch, getState, {getFirestore, storage}) => {
    const name = genImageName(image);
    
    putImage(storage, image, name, () => {
      setImage(name, id, dispatch, getState, getFirestore, storage)
    });
  }
}

export const addItem = (note, image) => {
  return (dispatch, getState, {getFirestore, storage}) => {
      let newNote = {
        ...defaultNodeProps,
        ...note
      }
 
      const firestore = getFirestore();
      firestore.collection('notes').add(newNote).then(({id}) => {
        if (image !== undefined) {
      // if ((note.imgHeight !== undefined) && !note.url) {
          addImage(image, id)(dispatch, getState, {getFirestore, storage});
        }
      }).catch(err => {
        // dispatch({ type: 'CREATE_PROJECT_ERROR' }, err);
      });
  }
};

export const delNote = (note, notes) => {
  return (dispatch, getState, {getFirestore, storage}) => {

    if (note.imgName) {
      let matchesArr = notes.filter(item => item.imgName === note.imgName);


      if (matchesArr.length < 2) {
        delImg(note, storage)
      }
    }
  
    const firestore = getFirestore();
    firestore.delete({ collection: 'notes', doc: note.id });
  }
};

export const delImg = (note, callback) => {
  return (dispatch, getState, {getFirestore, storage}) => {
    storage.ref(`images/${note.imgName}`).delete().then(function() {
      deleteField(note.id, 'url')(dispatch, getState, {getFirestore})
      deleteField(note.id, 'imgName')(dispatch, getState, {getFirestore})
      deleteField(note.id, 'imgHeight')(dispatch, getState, {getFirestore})
      deleteField(note.id, 'imgWidth')(dispatch, getState, {getFirestore})

      callback()
    }).catch(function(error) {
      console.log(storage)
    });
  }
}

export const replaceImage = (note, input) => {
  return (dispatch, getState, {getFirestore, storage}) => {
    const {id} = note;

    delImg(note, () => {
      getImgSizes(input, (imgWidth, imgHeight) => {
        // alert(imgHeight)
        updateNote(id, {imgWidth, imgHeight})(dispatch, getState, {getFirestore});
        addImage(input.files[0], id)(dispatch, getState, {getFirestore, storage});
      })
    })(dispatch, getState, {getFirestore, storage})
  }
}

export const deleteAllNote = (notes) => {
  return (dispatch, getState, {getFirestore, storage}) => {
    dispatch(clearMarkNotes())
    notes.forEach(note => {
      delNote(note, notes)(dispatch, getState, {getFirestore, storage})
    })
  }
};

export const updateNote = (id, obj) => {
  return (dispatch, getState, {getFirestore}) => {
    const firestore = getFirestore();
    firestore.update({ collection: 'notes', doc: id }, obj)
  }
};

export const deleteField = (id, field) => {
  return (dispatch, getState, {getFirestore}) => {
    const firestore = getFirestore();
    // firestore.update({ collection: 'notes', doc: id }, obj)

    let cityRef = firestore.collection('notes').doc(id);

    // Remove the 'capital' field from the document
    let removeCapital = cityRef.update({
      [field]: firebase.firestore.FieldValue.delete()
    });

    console.log(removeCapital)
  }
};


export default notesReducer;