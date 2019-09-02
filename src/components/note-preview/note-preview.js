import React from 'react'

const AllNotes = props => {
  const onClick = () => {
    alert(1)
  }

  return <div onClick={onClick}>{props.note.text} : {props.note.type}</div>
}

export default AllNotes