import _ from 'lodash';
import alt from '../../src/js/lib/alt';
import NoteStore from '../../src/js/stores/NoteStore';
import NoteActions from '../../src/js/actions/NoteActions';

describe('NoteStore', () => {
  var task = 'HII';

  beforeEach(() => {
    alt.dispatcher.dispatch({
      action: NoteActions.CREATE,
      data: { task: task }
    });
  });

  afterEach(() => {
    alt.recycle(NoteStore);
  });

  it('adds the note', () => {
    var notes = NoteStore.getState().notes;
    expect(_.pluck(notes, 'task')).toEqual([task]);
  });

  describe('get', () => {
    var id, expectedNote;

    beforeEach(() => {
      id =  NoteStore.getState().notes[0].id;
    });

    it('returns the note', () => {
      expectedNote = { id: id, task: task };
      expect(NoteStore.get([id])).toEqual([expectedNote]);
    });
  });

  describe('udpate', () => {
    var newTask = 'Noooooo';

    beforeEach(() => {
      var id =  NoteStore.getState().notes[0].id;
      alt.dispatcher.dispatch({
        action: NoteActions.UPDATE,
        data: { id: id, task: newTask }
      });
    });

    it('updates the note', () => {
      var notes = NoteStore.getState().notes;
      expect(_.pluck(notes, 'task')).toEqual([newTask]);
    });
  });

  describe('delete', () => {
    beforeEach(() => {
      alt.dispatcher.dispatch({
        action: NoteActions.DELETE,
        data:  NoteStore.getState().notes[0].id
      });
    });

    it('deletes the note', () => {
      var notes = NoteStore.getState().notes;
      expect(notes.length).toEqual(0);
    });
  });
});

