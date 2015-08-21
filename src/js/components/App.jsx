import React from 'react';
import uuid from 'node-uuid';
import Notes from './Notes.jsx';

const notes = [
  {
    id: uuid.v4(),
    task: 'Learn Webpack'
  },
  {
    id: uuid.v4(),
    task: 'Learn React'
  },
  {
    id: uuid.v4(),
    task: 'KANBAN!!'
  }
];

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { notes: notes };
    this.addNote = this.addNote.bind(this);
    this.editNote = this.editNote.bind(this);
    this.findNote = this.findNote.bind(this);
  }

  render() {
    const items = this.state.notes;

    return (
      <div>
        <h1>To Do:</h1>
        <Notes items={items} onEdit={this.editNote} />
        <button onClick={this.addNote}> + </button>
      </div>
    );
  }

  addNote() {
    var newNote = {
      id: uuid.v4(),
      task: 'New note'
    };

    var newData = {
      notes: this.state.notes.concat([newNote])
    };

    this.setState(newData);
  }

  editNote(id, task) {
    let notes = this.state.notes;
    const index = this.findNote(id);

    if(index < 0) {
      return;
    }

    notes[index].task = task;
    this.setState({notes});
  }

  findNote(id) {
    let notes = this.state.notes;
    return notes.findIndex((n) => n.id == id);
  }
}

module.exports = App;

