import React from 'react';
import Note from './Note.jsx';

class Notes extends React.Component {
  constructor(props) {
    super(props);
    this.renderNote = this.renderNote.bind(this);
  }

  render() {
    const notes = this.props.items;

    return <ul>{ notes.map(this.renderNote) }</ul>;
  }

  renderNote(note) {
    const editCallback = this.props.onEdit.bind(null, note.id);
    const deleteCallback = this.props.onDelete.bind(null, note.id);

    return (
      <li key={`note${note.id}`}>
        <Note task={note.task} onEdit={editCallback} onDelete={deleteCallback}/>
      </li>
    );
  }
}

module.exports = Notes;

