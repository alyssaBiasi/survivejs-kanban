import React from 'react';

class Note extends React.Component {
  render() {
    return <li {...this.props}>{ this.props.children }</li>;
  }
}

export default Note;

