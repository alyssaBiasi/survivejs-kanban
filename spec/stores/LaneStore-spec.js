import _ from 'lodash';
import alt from '../../src/js/lib/alt';
import LaneStore from '../../src/js/stores/LaneStore';
import LaneActions from '../../src/js/actions/LaneActions';

describe('LaneStore', () => {
  var fakeNote = 'HII';

  beforeEach(() => {
    alt.dispatcher.dispatch({
      action: LaneActions.CREATE,
      data: { notes: [fakeNote] }
    });
  });

  afterEach(() => {
    alt.recycle(LaneStore);
  });

  it('adds the note', () => {
    var lanes = LaneStore.getState().lanes;
    expect(_.pluck(lanes, 'notes')).toEqual([[fakeNote]]);
  });
});

