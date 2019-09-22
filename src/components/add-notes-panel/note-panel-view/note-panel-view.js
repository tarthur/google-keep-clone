import React, {Component} from 'react'
import NoteBottomPanel from '../../common/note-bottom-panel/note-bottom-panel';
import PanelTitle from '../../common/panel-title/panel-title'
import FixMark from '../../common/fix-mark/fix-mark'
import AddBtn from '../../common/add-btn/add-btn'
import style from './note-panel-view.module.scss'
import cn from 'classnames'


class NotePanelView extends Component {
  state = {
    picture: null,
    progress: 0,
    note: {
      fixMark: false,
    }
  }

  componentDidMount() {
    const inputData = this.props.input;

    if (inputData !== undefined) {
      this.setImgParams(inputData)
    }
  }

  setImgParams(inputData) {
    const input = inputData
    const image = inputData.files[0]

    this.setPreviewImg(input)
    this.setImgSizes(image)
  }

  setPreviewImg(input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();

      let $this = this;

      reader.onload = function (e) {
        $this.setState({
          picture: e.target.result
        })
      };

      reader.readAsDataURL(input.files[0]);
    }
  }

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

          return {
            note: {
              ...state.note,
              imgWidth, imgHeight, image
            }
          }
        })
      };

      image222.src = _URL.createObjectURL(propsImage);
    }
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
    this.props.onClick(this.state.note)
  }

  getTitle = title => {
    this.setState({
      note: {
        ...this.state.note,
        title
      }
    })
  }


  addImg = (picture, input) => {
    console.log(picture)
    console.log(input)

    this.readURL(input)

    this.setState({picture: picture.name})
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
                {text: 'Создать Копию', onClick: () => {}},
                {text: 'Добавить ярлык', onClick: () => {}}
              ]
            }
          default : return
        }
      })
    }
    
    return (
      <>
        {this.state.picture && (
          <div>
            <img className={cn('img-fluid', style.img)} src={this.state.picture} alt="Uploaded images" height="300" width="400"/>
          </div>
        )}
        <PanelTitle getTitle={this.getTitle} />
        <div className={style.fixMark}>
          <FixMark check={this.state.note.fixMark} onClick={this.onClickFixMark} />
        </div>

        {this.props.children}

        <div className={style.bottomPanel}>
          <NoteBottomPanel params={NoteBottomPanelParams(this.props.bottomPanel)} />
          <AddBtn text="Добавить" onClick={this.onClickAddBtn} />
        </div>
      </>
    )
  }
}

export default NotePanelView;