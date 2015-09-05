import React from 'react';
import Editable from './Editable.jsx';

class Notes extends React.Component {
  constructor(props) {
    super(props);
    this.renderNote = this.renderNote.bind(this);
  }

  render() {
    const notes = this.props.items;

    return <ul className='notes'>{ notes.map(this.renderNote) }</ul>;
  }

  renderNote(note) {
    const editCallback = this.props.onEdit.bind(null, note.id);
    const deleteCallback = this.props.onDelete.bind(null, note.id);

    return (
      <li className='note' key={`note${note.id}`}>
        <Editable value={note.task} onEdit={editCallback} onDelete={deleteCallback}/>
      </li>
    );
  }
}

module.exports = Notes;

