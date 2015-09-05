import 'array.prototype.findindex';
import uuid from 'node-uuid';
import alt from '../lib/alt';
import NoteActions from '../actions/NoteActions';

class NoteStore {
  constructor() {
    this.bindActions(NoteActions);
    this.notes = [];

    this.exportPublicMethods({
      get: this.get.bind(this)
    });
  }

  get(ids) {
    return (ids || []).map((id) => this.notes[this.findNote(id)]);
  }

  create(note) {
    const notes = this.notes;
    note.id = uuid.v4();

    this.setState({
      notes: notes.concat(note)
    });
  }

  update({ id, task }) {
    let notes = this.notes;
    const index = this.findNote(id);

    if(index < 0) {
      return;
    }

    notes[index].task = task;
    this.setState({notes});
  }

  delete(id) {
    let notes = this.notes;
    const index = this.findNote(id);

    if(index < 0) {
      return;
    }

    notes = notes.slice(0, index).concat(notes.slice(index+1));
    this.setState({notes});
  }

  findNote(id) {
    const notes = this.notes;
    return notes.findIndex((n) => n.id === id);
  }
}

module.exports = alt.createStore(NoteStore, 'NoteStore');

