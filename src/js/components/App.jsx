import React from 'react';
import uuid from 'node-uuid';
import Note from './Note.jsx';

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
  render() {
    return (
      <div>
        <ul>{ notes.map(this.renderNote) }</ul>
      </div>
    );
  }

  renderNote(note) {
    return (
      <li key={ `note${note.id}` }>
        <Note task={ note.task } />
      </li>
    );
  }
}

module.exports = App;

