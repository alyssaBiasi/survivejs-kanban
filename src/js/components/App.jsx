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
  render() {
    return (
      <div>
        <h1>To Do:</h1>
        <Notes items={ notes} />
      </div>
    );
  }
}

module.exports = App;

