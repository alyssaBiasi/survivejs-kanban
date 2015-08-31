import React from 'react';
import Notes from './Notes.jsx';
import NoteActions from '../actions/NoteActions';
import NoteStore from '../stores/NoteStore';
import connect from '../decorators/connect';

@connect(NoteStore)
export default class App extends React.Component {

  render() {
    const items = this.props.notes || [];

    return (
      <div>
        <h1>To Do:</h1>
        <Notes items={items} onEdit={this.editNote} onDelete={this.deleteNote} />
        <button onClick={this.addNote}> + </button>
      </div>
    );
  }

  addNote() {
    NoteActions.create({ task: 'NEW' });
  }

  deleteNote(id) {
    NoteActions.delete(id);
  }

  editNote(id, task) {
    NoteActions.update({ id, task });
  }
}

