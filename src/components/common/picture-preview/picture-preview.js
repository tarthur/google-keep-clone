import React, {Component} from 'react'
import setImgPreview from '../../../utils/set-img-preview'
// import baseBtn from '../../../styles/btn.module.scss'
import ClickIcon from '../../common/click-icon/click-icon'
import cn from 'classnames'
import style from './picture-preview.module.scss'


class PicturePreview extends Component {
  state = {
    picture: null
  }

  componentDidMount() {
    if (this.props.input) {
      this.setImgPreview(this.props.input)
    }
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('======')

    if (prevProps.input === null && this.props.input.files[0]) {
        this.setImgPreview(this.props.input)
    }

    if (prevProps.input !== null) {
      if (prevProps.input.files[0] !== this.props.input.files[0]) {
        this.setImgPreview(this.props.input)
      }
    }
  }


  setImgPreview = (input) => {
    setImgPreview(input, (picture) => {
      console.log(picture)
      this.setState({picture})
    })
  }

  render() {
    
    return (
      <div className={style.pictureBox}>
        {(this.props.initialPicture && !this.props.input) && (
          <div>
            <img className={cn('img-fluid', style.img)} 
                  src={this.props.initialPicture} 
                  alt="Uploaded images" />
          </div>
        )}


        {this.state.picture && (
          <div>
            <img className={cn('img-fluid', style.img)} 
                  src={this.state.picture} 
                  alt="Uploaded images" />
          </div>
        )}
        {/* {this.state.picture === null && <Spinner />} */}
      </div>
      )
  }
}

export default PicturePreview