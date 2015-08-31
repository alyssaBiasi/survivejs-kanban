import React from 'react';
import AltContainer from 'alt/AltContainer';
import Notes from './Notes.jsx';
import NoteActions from '../actions/NoteActions';
import NoteStore from '../stores/NoteStore';

export default class App extends React.Component {
  render() {
    const items = () => NoteStore.getState().notes;

    return (
      <div>
        <h1>To Do:</h1>
        <button onClick={this.addNote}> + </button>
        <AltContainer stores={[NoteStore]}
                      inject={{items: items}} >
          <Notes onEdit={this.editNote} onDelete={this.deleteNote} />
        </AltContainer>
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

