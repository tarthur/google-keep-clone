import React, {Component} from 'react'
import NoteBottomPanel from '../../common/note-bottom-panel';
import PanelTitle from '../../common/panel-title'
import FixMark from '../../common/fix-mark'
import AddBtn from '../../common/add-btn'
import PicturePreview from '../../common/picture-preview'
import ClickIcon from '../../common/click-icon'
import NotePanel from './../../common/note-panel'
import ListNotePanel from './../list-note-panel'
import getImgSizes from '../../../utils/get-image-sizes'
import validateTextFields from '../../../utils/validateTextFields'
import style from './note-panel-view.module.scss'


class NotePanelView extends Component {
  state = {
    progress: 0,
    currentColor: '#ffffff',
    note: {
      fixMark: false,
    },
  }
  
  onClickFixMark = () => {
    this.setState(state => {
      return {
        note: {
          ...state.note,
          fixMark: !state.note.fixMark
        }
      }
    })
  }

  onClickAddBtn = () => {
    const input = this.props.input;

    if (input) {
      getImgSizes(input, (imgWidth, imgHeight) => {
        this.setState(state => {
          const note = {
            ...state.note,
            imgWidth, imgHeight
          }

          this.props.onClickAddBtn(note)
        })
      })
    } else {
      this.props.onClickAddBtn(this.state.note)
    }  
  }

  onDelete = () => {
    this.props.setInput(null)
  }

  getColor = currentColor => {
    this.setState({
      currentColor
    })
    this.props.setData({ bgColor: currentColor})
  }

  getTitle = title => {
    const validField = validateTextFields(title);
    const result = validField === null ? null : {title: validField};

    this.props.setData(result);
  }

  getText = text => {
    const validField = validateTextFields(text);
    const result = validField === null ? null : {text: validField};

    this.props.setData(result);
  }

  getList = list => {
    if (list.length === 0) {
      this.props.setData(null);
    } else {
      this.props.setData(list);
    }
  }

  render() {
    const panels = [
      {
        name: 'addImg',
        addImg: (input) => this.props.setInput(input),
      }, {
        name: 'color',
        currentColor: this.state.currentColor,
        getColor: bgColor => this.getColor(bgColor),
      },
    ]

    let children;

    switch(this.props.view) {
      case 'note' :
      case 'img' :
        children = <NotePanel getText={this.getText} />
        break;
      case 'list' :
        children = <ListNotePanel getList={this.getList} />
        break;
    }
    
    return (
      <>
        <div className={style.pictureBox}>
          {this.props.input && (
            <div className={style.picturePreview}>
              <PicturePreview input={this.props.input} />
            </div>
          )}
          <div className={style.deleteIcon}>
            <ClickIcon onClick={this.onDelete} 
                        tooltipText="Удалить картинку">
              <i class="far fa-trash-alt" />
            </ClickIcon>
          </div>
        </div>
        <PanelTitle getTitle={this.getTitle}
                    textareaClass={style.title} />
        <div className={style.fixMark}>
          <FixMark check={this.state.note.fixMark} onClick={this.onClickFixMark} />
        </div>

        {children}

        <div className={style.bottomPanel}>
          <div className={style.bottomPanelBox}>
            <NoteBottomPanel panels={panels}
                            noteBottomClass={style.noteBottom} />
          </div>
          <AddBtn text="Добавить" onClick={this.onClickAddBtn} />
        </div>
      </>
    )
  }
}

export default NotePanelView;