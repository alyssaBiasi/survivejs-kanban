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
});
