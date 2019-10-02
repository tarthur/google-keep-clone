import React, {Component} from 'react'
import style from './note-preview.module.scss'
import NoteBottomPanel from '../common/note-bottom-panel/note-bottom-panel';
import SimpleNotePreview from './simple-note-preview';
import ListNotePreview from './list-note-preview/list-note-preview'
import {updateNote, addMarkNote, addItem, addImage, delNote, replaceImage, delImg} from '../../redux/notes-reducer'
import {connect} from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import FixMark from '../common/fix-mark/fix-mark'
import ImgHeightLoader from '../common/img-height-loader/img-height-loader'
import getImgSizes from '../../utils/get-image-sizes'
import cn from 'classnames'
import ClickIcon from '../common/click-icon';


class NotesPreview extends Component {
  state = {
    currentColor: this.props.note.bgColor,
    mark: false,
    modalIsOpen: false,
    loader: true
  }
  

  onClickMark = () => {
    // this.setState(state => {
    //   return {mark: !state.mark}
    // })
    
    this.props.addMarkNote(this.props.note)
  }

  cloneNote = () => {
    let {...note} = this.props.note;
    delete note.id

    this.props.addNote(note)
  }

  addImage(input) {
    const image = input.files[0];

    // alert(this.props.note.imgHeight)
    if (this.props.note.imgHeight) {
        this.props.replaceImage(this.props.note, input)
    } else {
      getImgSizes(input, (imgWidth, imgHeight) => {
        this.props.updateNote(this.props.note.id, {imgWidth, imgHeight})
        this.props.addImage(image, this.props.note.id);
      })
    }
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

  buildMain() {
    switch(this.props.note.type) {
      case 'note' :
        return <SimpleNotePreview note={this.props.note} 
                                  modal={this.modal}
                                  modalIsOpen={this.state.modalIsOpen} 
                                  setData={this.setData} />
      case 'list' :
        return <ListNotePreview note={this.props.note} 
                                updateNote={this.props.updateNote} 
                                modalIsOpen={this.state.modalIsOpen} 
                                setData={this.setData}
                                modal={this.modal} />
      default :
        return <div>no note</div>
    }
  }

  getColor = currentColor => {
    this.setState({currentColor});
    this.props.updateNote(this.props.note.id, {bgColor: currentColor})
  }

  modal = modalIsOpen => this.setState({modalIsOpen})

  onClickFixMark = () => {
    this.props.updateNote(this.props.note.id, {fixMark: !this.props.note.fixMark})
  }

  onLoad = loader => {
    this.setState({loader})
  }
  
  render() {
    const {note, notes, deleteNote} = this.props;
    const {mark, modalIsOpen, currentColor, loader} = this.state;

    let bottomPanelPosition = 'relative';
    let paddingTop = null;

    const panels = [
      {
        name: 'color',
        currentColor,
        getColor: bgColor => this.getColor(bgColor),
      }, {
        name: 'addImg',
        addImg: (input) => this.addImage(input),
      }, {
        name: 'delNote',
        onClickDelNoteBtn: () => deleteNote(note, notes),
      }, {
        name: 'createClone',
        onClickCreateCloneBtn: () => this.cloneNote(),
      }
    ]

    if (note.imgHeight) {
      bottomPanelPosition = 'absolute';
    } else {
      paddingTop = style.paddingTop
    }

    if (note.text || note.title || note.lists) {
      bottomPanelPosition = 'relative';
      paddingTop = style.paddingTop
    } else {
      bottomPanelPosition = 'absolute';
    }

    if ((note.imgHeight) && (note.text || note.title || note.lists)) {
      paddingTop = style.paddingTop
    }
    
    return (
      <div className={cn(style.notePreview, (mark && style.activeNote), (modalIsOpen && style.openModal), (loader && style.loader))}  
            style={{backgroundColor: note.bgColor}}
            onClick={() => this.modal(true)}>
        <div className={style.notePreviewWrap} >
          <ImgHeightLoader note={note} onLoad={this.onLoad} />
          {/* <div className={style.selectedMark} >
            <ClickIcon onClick={this.onClickMark}>
              <i className="fas fa-check-circle" />
            </ClickIcon>
          </div> */}
          <div className={style.fixMark}>
            <FixMark check={note.fixMark} onClick={this.onClickFixMark} />
          </div>
          <div className={cn(style.main, paddingTop)}>
            {this.buildMain()}
          </div>
        </div>
        <div className={cn(style.NoteBottomPanel, style[bottomPanelPosition])}>
          <NoteBottomPanel panels={panels} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    notes: state.firestore.ordered.notes,
    markNotes: state.notesReducer.markNotes
  }
}

const mapDispatchToProps = dispatch => {
  return {
    delImg: (note) => dispatch(delImg(note)),
    addImage: (image, id) => dispatch(addImage(image, id)),
    updateNote: (id, obj) => dispatch(updateNote(id, obj)),
    addMarkNote: note => dispatch(addMarkNote(note)),
    addNote: (item) => dispatch(addItem(item)),
    deleteNote: (note, notes) => dispatch(delNote(note, notes)),
    replaceImage: (note, imgWidth, imgHeight, image) => dispatch(replaceImage(note, imgWidth, imgHeight, image)),
  }
}  

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([
    { collection: 'notes' }
  ])
)(NotesPreview)