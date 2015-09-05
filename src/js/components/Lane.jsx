import React from 'react';
import AltContainer from 'alt/AltContainer';
import { DropTarget } from 'react-dnd';
import ItemTypes from '../lib/item-types';
import LaneActions from '../actions/LaneActions';
import NoteActions from '../actions/NoteActions';
import NoteStore from '../stores/NoteStore';
import Notes from './Notes.jsx';
import Editable from './Editable.jsx';

const noteTarget = {
  hover(targetProps, monitor) {
    const sourceProps = monitor.getItem();
    const sourceNote = sourceProps.data || {};

    if(!targetProps.notes.length) {
      LaneActions.attachToLane({
        laneID: targetProps.id,
        noteID: sourceNote.id
      });
    }
  }
};

@DropTarget(ItemTypes.NOTE, noteTarget, (connect) => ({
  connectDropTarget: connect.dropTarget()
}))
export default class Lane extends React.Component {
  constructor(props) {
    super(props);
    const id = props.id;

    this.addNote = this.addNote.bind(this, id);
    this.deleteNote = this.deleteNote.bind(this, id);
    this.editName = this.editName.bind(this, id);
  }

  render() {
    const {connectDropTarget, id, name, notes, ...props} = this.props;
    const items = () => NoteStore.get(notes);

    return connectDropTarget(
      <div {...props}>
        <div className='lane__header'>
          <Editable className='lane__name' value={name} onEdit={this.editName} />
          <div className='lane__add-note'>
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

  editName(id, name) {
    if(name) {
      LaneActions.update({ id, name });
    } else {
      LaneActions.delete(id);
    }
  }
}

