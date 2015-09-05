import 'array.prototype.findindex';
import update from 'react/lib/update';
import uuid from 'node-uuid';
import alt from '../lib/alt';
import LaneActions from '../actions/LaneActions';
import NoteStore from './NoteStore';

class LaneStore {
  constructor() {
    this.bindActions(LaneActions);
    this.lanes = [];
  }

  create(lane) {
    const lanes = this.lanes;

    lane.id = uuid.v4();
    lane.notes = lane.notes || [];

    this.setState({
      lanes: lanes.concat(lane)
    });
  }

  update({ id, name }) {
    const lanes = this.lanes;
    const index = this.findLane(id);

    if(index < 0) {
      return;
    }

    lanes[index].name = name;
    this.setState({ lanes });
  }

  delete(id) {
    let lanes = this.lanes;
    const index = this.findLane(id);

    if(index < 0) {
      return;
    }

    lanes = lanes.slice(0, index).concat(lanes.slice(index + 1));
    this.setState({ lanes });
  }

  attachToLane({ laneID, noteID }) {
    if(!noteID) {
      this.waitFor(NoteStore);
      noteID = NoteStore.getState().notes.slice(-1)[0].id;
    }

    const lanes = this.lanes;
    const index = this.findLane(laneID);

    if(index < 0) {
      return;
    }

    this.removeNote(noteID);
    const lane = lanes[index];

    if(lane.notes.indexOf(noteID) === -1) {
      lane.notes.push(noteID);
      this.setState({ lanes });
    }
  }

  removeNote(noteID) {
    const lanes = this.lanes;
    const removeLane = lanes.filter((lane) => {
      return lane.notes.indexOf(noteID) >= 0;
    })[0];

    if(!removeLane) {
      return;
    }

    const removeNoteIndex = removeLane.notes.indexOf(noteID);

    removeLane.notes = removeLane.notes.slice(0, removeNoteIndex).
      concat(removeLane.notes.slice(removeNoteIndex + 1));
  }

  detachFromLane({ laneID, noteID }) {
    const lanes = this.lanes;
    const index = this.findLane(laneID);

    if(index < 0) {
      return;
    }

    const lane = lanes[index];
    const notes = lane.notes;
    const removeIndex = notes.indexOf(noteID);

    if(removeIndex !== -1) {
      lane.notes = notes.slice(0, removeIndex).concat(notes.slice(removeIndex + 1));
      this.setState({ lanes });
    }
  }

  move({ sourceNote, targetNote }) {
    const lanes = this.lanes;
    const sourceID = sourceNote.id;
    const targetID = targetNote.id;
    const sourceLane = lanes.filter((lane) => {
      return lane.notes.indexOf(sourceID) >= 0;
    })[0];
    const targetLane = lanes.filter((lane) => {
      return lane.notes.indexOf(targetID) >= 0;
    })[0];
    const sourceNoteIndex = sourceLane.notes.indexOf(sourceID);
    const targetNoteIndex = targetLane.notes.indexOf(targetID);

    if(sourceLane === targetLane) {
      sourceLane.notes = update(sourceLane.notes, {
        $splice: [
          [sourceNoteIndex, 1],
          [targetNoteIndex, 0, sourceID]
        ]
      });
    } else {
      sourceLane.notes.splice(sourceNoteIndex, 1);
      targetLane.notes.splice(targetNoteIndex, 0, sourceID);
    }

    this.setState({lanes});
  }

  findLane(id) {
    const lanes = this.lanes;
    return lanes.findIndex((l) => l.id === id);
  }
}

export default alt.createStore(LaneStore, 'LaneStore');

