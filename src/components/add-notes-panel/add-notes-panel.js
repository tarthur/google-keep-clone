import React, {Component} from 'react'
import {connect} from 'react-redux';
import {addNote, addItem} from '../../redux/notes-reducer'
import {notes} from '../../redux/notes-selectors'
import style from './add-notes-panel.module.scss'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import NotePanelView from './note-panel-view'
import DefaultPanel from './default-panel'
import OutsideAlerter from '../../hoc/with-outside-alerter'
import cn from 'classnames'


class AddNotesPanel extends Component {
  defaultNoteView = {
    bgColor: '#ffffff',
  }

  state = {
    emptyField: true,
    input: null,
    view: '',
    note: {
      ...this.defaultNoteView
    },
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.show !== prevProps.show) {
      this.setState(state => {
        return {
          emptyField: true,
          input: null,
          view: '',
          note: {
            ...this.defaultNoteView
          },
        }
      })
      this.changeView('')
    }
  }

  onClickAddBtn = (note) => {    
    if (!this.state.emptyField || this.state.input) {
      let image;

      if (this.state.input) {
        image = this.state.input.files[0];
      }

      this.setState(state => {
        let newNote = {
          ...state.note,
          ...note,
          type: state.view
        }
  
        this.props.addItem(newNote, image);
  
        newNote = {
          ...this.defaultNoteView
        }
  
        return { note: newNote }
      });


      this.setState({ emptyField: true })
      this.changeView('');
  
    } else {
      alert('Все поля пустые!')
    }
  }

  changeView = (view, input) => {
    if (input) this.setState({emptyField: false})

    this.setState({view, input});
  }

  setData = dataObj => {


    if (dataObj === null) {
      return this.setState({emptyField: true})
    } 
    
    this.setState({
      emptyField: false,
      note: {
      ...this.state.note,
      ...dataObj
      }
    })
  }

  setInput = input => {
    this.setState({input})
  }

  render() {
    return (
      <div className={cn(style.notesPanel, style[this.state.view])}>
        <div className={style.notesPanelWrap} 
            ref={this.props.hhhhh} 
            style={{backgroundColor: this.state.note.bgColor}}>

          { (this.state.view === '') && <DefaultPanel setPanelView={this.changeView} /> }
          { (this.state.view !== '') && <NotePanelView onClickAddBtn={this.onClickAddBtn}
                                                        setInput={this.setInput}
                                                        input={this.state.input} 
                                                        setData={this.setData} 
                                                        view={this.state.view} /> }

        </div>
      </div>
    )
  }
}



const mapStateToProps = (state) => {
  return {
    notes: notes(state),
  }
}

const mapDispatchToProps = {
  addItem
} 

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([
    { collection: 'notes' }
  ]),
  OutsideAlerter
)(AddNotesPanel)
