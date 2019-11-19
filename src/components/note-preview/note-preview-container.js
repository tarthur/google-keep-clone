import React, {Component} from 'react';
import NotePreview from './note-preview';


class NotesPreviewContainer extends Component {
  state = {
    currentColor: this.props.note.bgColor,
    // mark: false,
    modalIsOpen: false,
    loader: true
  }
  
  componentDidMount() {
    if (!this.props.note.imgHeight) {
      this.setState({loader: false})
    }
  }

  // onClickMark = () => {
  //   // this.setState(state => {
  //   //   return {mark: !state.mark}
  //   // })
    
  //   this.props.addMarkNote(this.props.note)
  // }

  cloneNote = () => {
    let {...note} = this.props.note;
    delete note.id

    this.props.addNote(note)
  }

  addImage = (input) => {
    const image = input.files[0];
    const {note, replaceImage, addStartImage} = this.props;

    return note.imgHeight ? replaceImage(note, input) : addStartImage(input, note, image);
  }

  setData = (obj) => {   
    switch(obj.input) {
      case 'delImg' :
        if (obj.isEmptyFields) {
          this.props.deleteNote(this.props.note, this.props.notes)
        } else {
          this.props.delImg(this.props.note)
          this.props.updateNote(this.props.note.id, {
            imgHeight: null, imgWidth: null
          });
        }
        break;
      case 'replaceImage' :
          this.addImage(obj.inputTarget);
        break;
    }
  }

  getColor = currentColor => {
    this.setState({currentColor});
    this.props.updateNote(this.props.note.id, {bgColor: currentColor})
  }

  modal = modalIsOpen => this.setState({modalIsOpen})
  onLoad = loader => this.setState({loader})

  onClickFixMark = () => {
    const {updateNote, note} = this.props;
    
    updateNote(note.id, {fixMark: !note.fixMark})
  }

  render() {
    const {note, notes, deleteNote, updateNote} = this.props;
    const {mark, modalIsOpen, currentColor, loader} = this.state;

    return <NotePreview note={note}
                          notes={notes}
                          deleteNote={deleteNote}
                          modalIsOpen={modalIsOpen}
                          currentColor={currentColor}
                          updateNote={updateNote}
                          getColor={this.getColor}
                          addImage={this.addImage}
                          cloneNote={this.cloneNote}
                          loader={loader}
                          modal={this.modal}
                          onLoad={this.onLoad}
                          setData={this.setData}
                          // mark={mark}
                          // onClickMark={this.onClickMark}
                          onClickFixMark={this.onClickFixMark} />
  }
}

export default NotesPreviewContainer;
