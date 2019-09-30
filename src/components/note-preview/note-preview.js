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
  }

  componentDidUpdate() {
    
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

  setImgParams(input) {
    const image = input.files[0];

    if (this.props.note.imgHeight) {
        this.props.replaceImage(this.props.note, input)
    } else {
      getImgSizes(input, (imgWidth, imgHeight) => {
        this.props.updateNote(this.props.note.id, {imgWidth, imgHeight})
        this.props.addImage(image, this.props.note.id);
      })
    }
  }

  modal = modalIsOpen => {
    this.setState(state => {
      return {modalIsOpen}
    })
  }

  buildMain() {
    switch(this.props.note.type) {
      case 'note' :
      case 'img' :
        return <SimpleNotePreview note={this.props.note} 
                                  replaceImage={this.props.replaceImage} 
                                  updateNote={this.props.updateNote} 
                                  modalIsOpen={this.state.modalIsOpen} 
                                  modal={this.modal} />
      case 'list' :
        return <ListNotePreview note={this.props.note} 
                                updateNote={this.props.updateNote} 
                                modalIsOpen={this.state.modalIsOpen} 
                                modal={this.modal} />
      default :
        return <div>no note</div>
    }
  }

  onClickNotePreview = () => {
    this.setState({
      modalIsOpen: true
    })
  }

  getColor = currentColor => {
    this.setState({
      currentColor
    })

    this.props.updateNote(this.props.note.id, {bgColor: currentColor})
  }

  onClickFixMark = () => {
    this.props.updateNote(this.props.note.id, {fixMark: !this.props.note.fixMark})
  }

  render() {
    const panels = [
      {
        name: 'color',
        currentColor: this.state.currentColor,
        getColor: bgColor => this.getColor(bgColor),
      }, {
        name: 'addImg',
        addImg: (input) => this.setImgParams(input),
      }, {
        name: 'delNote',
        onClickDelNoteBtn: () => this.props.deleteNote(this.props.note, this.props.notes),
      }, {
        name: 'createClone',
        onClickCreateCloneBtn: () => this.cloneNote(),
      }
    ]

    let bottomPanelPosition = 'relative';
    let paddingTop = null;

    if (this.props.note.imgHeight) {
      bottomPanelPosition = 'absolute';
    } else {
      paddingTop = style.paddingTop
    }

    if (this.props.note.text || this.props.note.title || this.props.note.lists) {
      bottomPanelPosition = 'relative';
      paddingTop = style.paddingTop
    } else {
      bottomPanelPosition = 'absolute';
    }

    if ((this.props.note.imgHeight) && (this.props.note.text || this.props.note.title || this.props.note.lists)) {
      paddingTop = style.paddingTop
    }
    
    return (
      <div className={cn(style.notePreview, this.state.mark && style.activeNote)}  
            style={{backgroundColor: this.props.note.bgColor, opacity: this.state.modalIsOpen ? 0 : 1}}
            onClick={this.onClickNotePreview}>
        <div className={style.notePreviewWrap} >
          <ImgHeightLoader note={this.props.note} />
          <div>
            {/* <div className={style.selectedMark} >
              <ClickIcon onClick={this.onClickMark}>
                <i class="fas fa-check-circle" />
              </ClickIcon>
            </div> */}
            <div className={style.fixMark}>
              <FixMark check={this.props.note.fixMark} 
                        onClick={this.onClickFixMark} />
            </div>
            <div className={cn(style.main, paddingTop)}>
              {this.buildMain()}
            </div>
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