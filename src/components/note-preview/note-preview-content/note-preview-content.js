import React, {Component} from 'react'
import style from './note-preview-content.module.scss'
import NoteBottomPanel from '../../common/note-bottom-panel/note-bottom-panel';

import {updateNote, addMarkNote, addItem, addImage} from '../../../redux/notes-reducer'
import {connect} from 'react-redux';

import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import FixMark from '../../common/fix-mark/fix-mark'
import cn from 'classnames'



class NotePreviewContent extends Component {
  state = {
    mark: false,
    fixMark: this.props.note.fixMark,
    picture: null,
  }

  onClickFixMark = () => {
    this.setState(state => {
      const fixMark = !state.fixMark;
      
      this.props.onClickFixMark({fixMark})

      return {
        fixMark
      }
    })
  }

  onClickMark = () => {
    this.setState(state => {
      return {mark: !state.mark}
    })
    
    this.props.addMarkNote(this.props.note)
  }

  cloneNote = () => {
    let {...note} = this.props.note;
    delete note.id

    this.props.addNote(note)
  }

  setImgParams(inputData) {
    const input = inputData
    const image = inputData.files[0]

    // this.setPreviewImg(input)
    this.setImgSizes(image)
  }

  // setPreviewImg(input) {
  //   if (input.files && input.files[0]) {
  //     var reader = new FileReader();

  //     let $this = this;

  //     reader.onload = function (e) {
  //       $this.setState({
  //         picture: e.target.result
  //       })
  //     };

  //     reader.readAsDataURL(input.files[0]);
  //   }
  // }

  setImgSizes = propsImage => {
    const $this = this;

    if (propsImage) {
      let _URL = window.URL || window.webkitURL;
      let image222 = new Image();
      

      image222.onload = function() {

        $this.setState(state => {
          const imgWidth = this.width;
          const imgHeight = this.height;
          const image = propsImage;

          $this.props.updateNote($this.props.note.id, {imgWidth, imgHeight});
          $this.props.addImage({image}, $this.props.note.id);
        })
      };

      image222.src = _URL.createObjectURL(propsImage);
    }
  }

  render() {
    const NoteBottomPanelParams = panels => {
      
      return panels.map(panel => {
        switch (panel) {
          case 'color' :
            return {
              panelName: panel,
              getColor: this.props.getColor,
            }
          case 'addImg' :
            return {
              panelName: panel,
              addImg: (inputData) => {this.setImgParams(inputData)},
            }
          case 'more' :
            return {
              panelName: panel,
              moreItems: [
                {text: 'Удалить', onClick: this.props.onClickDeleteBtn},
                {text: 'Создать Копию', onClick: this.cloneNote},
              ]
            }
          default : return
        }
      })
    }

    const ggggg = this.state.mark ? style.ggggg : '';

    return (
      <div className={cn(style.notePreview, ggggg)}  
      style={{backgroundColor: this.props.bgColor}}>
        <div className={style.notePreviewWrap} >
          {/* {this.state.picture && (
            <div>
              <img className={cn('img-fluid', style.img)} src={this.state.picture} alt="Uploaded images" height="300" width="400"/>
            </div>
          )} */}
          <div>
            <div className={style.mark} onClick={this.onClickMark}>
              <i class="fas fa-check-circle" />
            </div>
            <div className={style.fixMark}>
              <FixMark check={this.state.fixMark} onClick={this.onClickFixMark} />
            </div>
            {this.props.children}
          </div>
        </div>
        <div className={cn(style.NoteBottomPanel, style[this.props.bottomPanelPosition])}>
          <NoteBottomPanel params={NoteBottomPanelParams(this.props.bottomPanel)} />
        </div>
      </div>
    )
  }
}



const mapStateToProps = (state) => {
  return {
    notes: state.firestore.ordered.notes
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addImage: (note, id) => dispatch(addImage(note, id)),
    updateNote: (id, obj) => dispatch(updateNote(id, obj)),
    addMarkNote: note => dispatch(addMarkNote(note)),
    addNote: (item) => dispatch(addItem(item)),

  }
}  

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([
    { collection: 'notes' }
  ])
)(NotePreviewContent)