import React from 'react';
import Editable from './Editable.jsx';
import Note from './Note.jsx';

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
      <Note className='note' data={note} key={`note${note.id}`} onMove={this.onMoveNote} >
        <Editable value={note.task} onEdit={editCallback} onDelete={deleteCallback} />
      </Note>
    );
  }

  onMoveNote({ sourceNote, targetNote }) {
  }
}

module.exports = Notes;

