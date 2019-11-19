import React, {Component} from 'react';
import NoteBottomPanel from '../../common/note-bottom-panel';
import PanelTitle from '../../common/panel-title';
import FixMark from '../../common/fix-mark';
import AddBtn from '../../common/add-btn';
import PicturePreviewBox from '../../common/picture-preview-box';
import NotePanel from './../../common/note-panel';
import ListNotePanel from './../list-note-panel';
import getImgSizes from '../../../utils/get-image-sizes';
import validateTextFields from '../../../utils/validateTextFields';
import style from './note-panel-view.module.scss';


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

  onClickAddBtn = async () => {
    const {input, onClickAddBtn} = this.props;

    if (input) {
      const {imgWidth, imgHeight} = await getImgSizes(input);
      
      this.setState(state => {
        const note = {
          ...state.note,
          imgWidth, imgHeight
        }

        onClickAddBtn(note)
      })
    } else {
      onClickAddBtn(this.state.note)
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
    const {setData} = this.props;
    return (list.length === 0) ? setData(null) : setData(list)
  }

  getChildren = () => {
    switch (this.props.view) {
      case 'note' :
        return <NotePanel getText={this.getText} />
      case 'list' :
        return <ListNotePanel getList={this.getList} />
      default:
        return <div></div>;
    }
  }

  render() {
    const { setInput } = this.props;
    const panels = [
      {
        name: 'addImg',
        addImg: (input) => setInput(input),
      }, {
        name: 'color',
        currentColor: this.state.currentColor,
        getColor: bgColor => this.getColor(bgColor),
      },
    ]
    
    return (
      <>
        <PicturePreviewBox input={this.props.input} onDelete={this.onDelete} />
        <PanelTitle getTitle={this.getTitle}
                    textareaClass={style.title} />
        <div className={style.fixMark}>
          <FixMark check={this.state.note.fixMark} onClick={this.onClickFixMark} />
        </div>

        { this.getChildren() }

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
