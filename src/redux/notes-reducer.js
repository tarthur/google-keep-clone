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

const genImageName = image => new Date().getTime() + "." + image.name.split('.').pop();

const putImage = (storage, image, name, endFunc) => {
  return new Promise((res, rej) => {
    storage.ref(`images/${name}`).put(image)
    .on('state_changed', 
      (snapshot) => {}, 
      (error) => { alert(error.message_) }, res
    );
  });
}

export const setImage = (imgName, id) => async (dispatch, getState, {getFirestore, storage}) => {
  const url = await storage.ref('images').child(imgName).getDownloadURL();
  dispatch(updateNote(id, {url, imgName}));
}

export const addImage = (image, id) => async (dispatch, getState, {getFirestore, storage}) => {
  const name = genImageName(image);
  await putImage(storage, image, name);
  dispatch(setImage(name, id));
}

export const addItem = (note, image) => async (dispatch, getState, {getFirestore}) => {
  const newNote = { ...defaultNodeProps, ...note }
  const {id} = await getFirestore().collection('notes').add(newNote);
  if (image !== undefined) dispatch(addImage(image, id));
}

export const delNote = (note, notes) => (dispatch, getState, {getFirestore, storage}) => {
  if (note.imgName) {
    let matchesArr = notes.filter(item => item.imgName === note.imgName);
    if (matchesArr.length < 2) delImg(note, storage)
  }

  getFirestore().delete({ collection: 'notes', doc: note.id });
}

export const delImg = (note) => (dispatch, getState, {getFirestore, storage}) => {
  return new Promise((res, rej) => {
    dispatch(updateNote(note.id, {url: null, imgName: null}));
    storage.ref(`images/${note.imgName}`).delete().then(() => res());
  })
}

export const addStartImage = (input, note, image) => async (dispatch) => {
  const {imgWidth, imgHeight} = await getImgSizes(input);
  dispatch(updateNote(note.id, {imgWidth, imgHeight}));
  dispatch(addImage(image, note.id))
}

export const replaceImage = (note, input) => async (dispatch) => {
  await dispatch(delImg(note))
  const {imgWidth, imgHeight} = await getImgSizes(input);
  dispatch(updateNote(note.id, {imgWidth, imgHeight}))
  dispatch(addImage(input.files[0], note.id));
}

export const updateNote = (id, obj) => (dispatch, getState, {getFirestore}) => {
  getFirestore().update({ collection: 'notes', doc: id }, obj)
};

export const deleteAllNote = (notes) => {
  return (dispatch, getState, {getFirestore, storage}) => {
    dispatch(clearMarkNotes())
    notes.forEach(note => {
      delNote(note, notes)(dispatch, getState, {getFirestore, storage})
    })
  }
};


export default notesReducer;