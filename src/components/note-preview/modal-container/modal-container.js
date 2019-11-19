import React, { Component } from 'react';
import * as moment from 'moment';
import ModalBox from './../../modal-box';
import NoteBottomPanel from '../../common/note-bottom-panel';
import AddBtn from '../../common/add-btn/add-btn';
import FixMark from '../../common/fix-mark';
import PicturePreviewBox from '../../common/picture-preview-box';
import style from './modal-container.module.scss';


class ModalContainer extends Component {
  state = {
    currentColor: this.props.note.bgColor,
    picture: null,
    input: null,
  }
  
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.modalIsOpen !== this.props.modalIsOpen) {
      if (this.props.note.url) {
        this.setState({
          input: this.props.note.url
        })
      } else {
        this.setState({
          input: null
        })
      }
    }
  }

  closeModal = e => {
    e.stopPropagation()
    
    const input = this.state.input;

    if (this.props.note.url && (input === null)) {
      this.props.setData({input: 'delImg'})
    } else if (input && (typeof input === 'object')) {
      this.props.setData({input: 'replaceImage', inputTarget: input})
    } else {
      this.props.setData({})
    }

    this.props.modal(false)
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
  
  onDelete = () => this.setState({input: null})
  
  render() {
    const {note, notes, deleteNote, updateNote, previewContent, modalIsOpen} = this.props;
    const {input} = this.state;
    
    const panels = [
      {
        name: 'color',
        currentColor: note.bgColor,  
        getColor: bgColor => this.getColor(bgColor),  
      }, {
        name: 'addImg',
        addImg: (input) => this.setState({input}),
      }, {
        name: 'delNote',
        onClickDelNoteBtn: () => deleteNote(note, notes),
      }, {
        name: 'createClone',
        onClickCreateCloneBtn: () => this.cloneNote(),
      }
    ]
  
    return (
      <div>

        {previewContent}

        <ModalBox isOpen={modalIsOpen} 
                  onRequestClose={this.closeModal}>

          <div className={style.modalWrap} style={{backgroundColor: note.bgColor}}>
            <PicturePreviewBox input={input} onDelete={this.onDelete} />
            <div className={style.fixMark}>
              <FixMark check={note.fixMark} onClick={() => updateNote(note.id, {fixMark: !note.fixMark})} />
            </div>
            <div>

              {this.props.children}

              <div className={style.date}>Измененно: {moment(note.time).format('LTS')}</div>
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

export default ModalContainer;
