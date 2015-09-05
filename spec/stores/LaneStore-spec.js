import _ from 'lodash';
import alt from '../../src/js/lib/alt';
import LaneStore from '../../src/js/stores/LaneStore';
import LaneActions from '../../src/js/actions/LaneActions';

describe('LaneStore', () => {

  beforeEach(() => {
    alt.dispatcher.dispatch({
      action: LaneActions.CREATE,
      data: { }
    });
  });

  afterEach(() => {
    alt.recycle(LaneStore);
  });

  it('adds the lane', () => {
    var lanes = LaneStore.getState().lanes;
    expect(_.pluck(lanes, 'notes')).toEqual([[]]);
  });

  describe('update', () => {
    var name = 'Helloo';

    beforeEach(() => {
      var id = LaneStore.getState().lanes[0].id;
      alt.dispatcher.dispatch({
        action: LaneActions.UPDATE,
        data: {
          id: id,
          name: name
        }
      });
    });

    it('updates the name', () => {
      var lanes = LaneStore.getState().lanes;
      expect(_.pluck(lanes, 'name')).toEqual([name]);
    });
  });

  describe('delete', () => {
    beforeEach(() => {
      alt.dispatcher.dispatch({
        action: LaneActions.DELETE,
        data: LaneStore.getState().lanes[0].id
      });
    });

    it('removes the lane', () => {
      var lanes = LaneStore.getState().lanes;
      expect(lanes.length).toEqual(0);
    });
  });

  describe('attachToLane', () => {
    var fakeNote = 'HII';

    beforeEach(() => {
      var id = LaneStore.getState().lanes[0].id;
      alt.dispatcher.dispatch({
        action: LaneActions.ATTACH_TO_LANE,
        data: {
          laneID: id,
          noteID: fakeNote
        }
      });
    });

    it('attaches the note', () => {
      var lanes = LaneStore.getState().lanes;
      expect(_.pluck(lanes, 'notes')).toEqual([[fakeNote]]);
    });
  });

  describe('detachFromLane', () => {
    var fakeNote = 'HII';

    beforeEach(() => {
      var id = LaneStore.getState().lanes[0].id;
      var data = {
        laneID: id,
        noteID: fakeNote
      };

      alt.dispatcher.dispatch({
        action: LaneActions.ATTACH_TO_LANE,
        data: data
      });

      alt.dispatcher.dispatch({
        action: LaneActions.DETACH_FROM_LANE,
        data: data
      });
    });

    it('detaches the note', () => {
      var lanes = LaneStore.getState().lanes;
      expect(_.pluck(lanes, 'notes')).toEqual([[]]);
    });
  });

  describe('move', () => {
    var fakeNote1 = 'HII';
    var fakeNote2 = 'HEllooo';

    describe('within same lane', () => {
      beforeEach(() => {
        var id = LaneStore.getState().lanes[0].id;

        alt.dispatcher.dispatch({
          action: LaneActions.ATTACH_TO_LANE,
          data: {
            laneID: id,
            noteID: fakeNote1
          }
        });

        alt.dispatcher.dispatch({
          action: LaneActions.ATTACH_TO_LANE,
          data: {
            laneID: id,
            noteID: fakeNote2
          }
        });

        alt.dispatcher.dispatch({
          action: LaneActions.MOVE,
          data: {
            sourceNote: { id: fakeNote1 },
            targetNote: { id: fakeNote2 }
          }
        });
      });

      it('reorders the notes', () => {
        var lanes = LaneStore.getState().lanes;
        expect(_.pluck(lanes, 'notes')).toEqual([[fakeNote2, fakeNote1]]);
      });
    });
  });
});

