import React from 'react';
import AltContainer from 'alt/AltContainer';
import LaneActions from '../actions/LaneActions';
import Notes from './Notes.jsx';
import NoteActions from '../actions/NoteActions';
import NoteStore from '../stores/NoteStore';

export default class Lane extends React.Component {
  constructor(props) {
    super(props);
    const id = props.id;

    this.addNote = this.addNote.bind(this, id);
    this.deleteNote = this.deleteNote.bind(this, id);
  }

  render() {
    const {id, name, notes, ...props} = this.props;
    const items = () => NoteStore.get(notes);

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

  addNote(laneID) {
    NoteActions.create({ task: 'New task' });
    LaneActions.attachToLane({laneID});
  }

  deleteNote(laneID, noteID) {
    NoteActions.delete(noteID);
    LaneActions.detachFromLane({ laneID, noteID });
  }

  editNote(id, task) {
    NoteActions.update({ id, task });
  }
}

