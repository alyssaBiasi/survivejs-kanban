import React from 'react';
import Notes from './Notes.jsx';
import NoteActions from '../actions/NoteActions';
import NoteStore from '../stores/NoteStore';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = NoteStore.getState();
    this.storeChanged = this.storeChanged.bind(this);
  }

  componentDidMount() {
    NoteStore.listen(this.storeChanged);
  }

  componentWillUnmount() {
    NoteStore.unlisten(this.storeChanged);
  }

  render() {
    const items = this.state.notes;

    return (
      <div>
        <h1>To Do:</h1>
        <Notes items={items} onEdit={this.editNote} onDelete={this.deleteNote} />
        <button onClick={this.addNote}> + </button>
      </div>
    );
  }

  storeChanged(state) {
    this.setState(state);
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

module.exports = App;

