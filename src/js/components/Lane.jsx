import React from 'react';
import AltContainer from 'alt/AltContainer';
import Notes from './Notes.jsx';
import NoteActions from '../actions/NoteActions';
import NoteStore from '../stores/NoteStore';

export default class Lane extends React.Component {
  render() {
    const {name, ...props} = this.props;
    const items = () => NoteStore.getState().notes;

    return (
      <div {...props}>
        <div className='lane-header'>
          <div className='lane-name'>{ name }</div>
          <div className='lane-add-note'>
            <button onClick={this.addNote}> + </button>
          </div>
        </div>
        <AltContainer stores={[NoteStore]}
                      inject={{items: items}} >
          <Notes onEdit={this.editNote} onDelete={this.deleteNote} />
        </AltContainer>
      </div>
    );
  }

  addNote() {
    NoteActions.create({ task: 'New task' });
  }

  deleteNote(id) {
    NoteActions.delete(id);
  }

  editNote(id, task) {
    NoteActions.update({ id, task });
  }
}

