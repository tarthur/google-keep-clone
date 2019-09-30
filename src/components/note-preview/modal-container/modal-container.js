import React, {Component} from 'react'
import {connect} from 'react-redux';
import { compose } from 'redux'
import ModalBox from './../../modal-box'
import PanelTitle from '../../common/panel-title/panel-title'
import { firestoreConnect } from 'react-redux-firebase'
import {updateNote, addMarkNote, addItem, addImage, delNote, delImg, replaceImage} from '../../../redux/notes-reducer'
import NoteBottomPanel from '../../common/note-bottom-panel/note-bottom-panel';
import AddBtn from '../../common/add-btn/add-btn'
import NotePanel from '../../common/note-panel/note-panel'
import setImgSizes from '../../../utils/get-image-sizes'
import ImgBox from '../../common/img-box/img-box'
import FixMark from '../../common/fix-mark'
import PicturePreview from '../../common/picture-preview/picture-preview'
import * as moment from 'moment';
import ImgHeightLoader from '../../common/img-height-loader'
import getImgSizes from '../../../utils/get-image-sizes'
import cn from 'classnames'
import style from './modal-container.module.scss'
import ClickIcon from '../../common/click-icon'


class ModalContainer extends Component {
  state = {
    currentColor: this.props.note.bgColor,
    picture: null,
    inputData: null,
    input: null,
  }
  
  closeModal = e => {
    e.stopPropagation()
    
    this.props.modal(false)
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
  
  cloneNote = () => {
    let {...note} = this.props.note;
    delete note.id

    this.props.addNote(note)
  }

  getColor = currentColor => {
    this.setState({
      currentColor
    })

    this.props.updateNote(this.props.note.id, {bgColor: currentColor})
  }
  
  onDelete = () => {
    this.props.delImg(this.props.note)
  }
  
  render() {
    const panels = [
      {
        name: 'color',
        currentColor: this.props.note.bgColor,  
        getColor: bgColor => this.getColor(bgColor),  
      }, {
        name: 'addImg',
        addImg: (input) => {this.setImgParams(input)},
      }, 
      {
        name: 'delNote',
        onClickDelNoteBtn: () => this.props.deleteNote(this.props.note, this.props.notes),
      }, {
        name: 'createClone',
        onClickCreateCloneBtn: () => this.cloneNote(),
      }
    ]

  
    return (
      <div>
        {this.props.previewContent}
        <ModalBox isOpen={this.props.modalIsOpen} 
                  onRequestClose={this.closeModal}>
          <div style={{backgroundColor: this.props.note.bgColor}}>
            {this.props.note.url && (
              <div className={style.pictureBox}>
                <ImgHeightLoader note={this.props.note} />
                <div className={style.deleteIcon}>
                  <ClickIcon onClick={this.onDelete} 
                              tooltipText="Удалить картинку">
                    <i class="far fa-trash-alt" />
                  </ClickIcon>
                </div>
              </div>
            )}
            {/* {this.props.note.url && (
              <PicturePreview initialPicture={this.props.note.url} input={this.state.input} />
            )} */}
            <div className={style.fixMark}>
              <FixMark check={this.props.note.fixMark} onClick={() => this.props.updateNote(this.props.note.id, {fixMark: !this.props.note.fixMark})} />
            </div>
            <div>

              {this.props.children}

              <div className={style.date}>Измененно: {moment(this.props.note.time).format('LTS')}</div>
            </div>
            <div className={style.bottomPanel}>
              <div className={style.bottomPanelBox}>
                <NoteBottomPanel panels={panels} />
              </div>
              <div className={style.btns}>
                <AddBtn text="Закрыть" onClick={this.closeModal} />
                {/* <div className={style.cancelBtn}>
                  <AddBtn text="Отменить" onClick={this.cancelModal} />
                </div> */}
              </div>
            </div>
          </div>
        </ModalBox>
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
    addImage: (note, id) => dispatch(addImage(note, id)),
    updateNote: (id, obj) => dispatch(updateNote(id, obj)),
    addMarkNote: note => dispatch(addMarkNote(note)),
    addNote: (item) => dispatch(addItem(item)),
    deleteNote: (note, notes) => dispatch(delNote(note, notes)),
    delImg: (note) => dispatch(delImg(note)),
    replaceImage: (note, imgWidth, imgHeight, image) => dispatch(replaceImage(note, imgWidth, imgHeight, image)),
  }
}  

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([
    { collection: 'notes' }
  ])
)(ModalContainer)
