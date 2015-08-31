import React from 'react';
import AltContainer from 'alt/AltContainer';
import Lanes from './Lanes.jsx';
import LaneActions from '../actions/LaneActions';
import LaneStore from '../stores/LaneStore';

export default class App extends React.Component {
  render() {
    const items = () => LaneStore.getState().lanes;

    return (
      <div>
        <button className='add-lane' onClick={this.addItem}> + Lane </button>
        <AltContainer stores={[LaneStore]}
                      inject={{items: items}} >
          <Lanes />
        </AltContainer>
      </div>
    );
  }

  addItem() {
    LaneActions.create({ name: 'New lane' });
  }
}

