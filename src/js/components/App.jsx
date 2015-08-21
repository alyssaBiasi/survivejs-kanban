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
    this.state = { notes: notes }
    this.addNote = this.addNote.bind(this);
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

  render() {
    const items = this.state.notes;

    return (
      <div>
        <h1>To Do:</h1>
        <Notes items={items} />
        <button onClick={this.addNote}> + </button>
      </div>
    );
  }
}

module.exports = App;

