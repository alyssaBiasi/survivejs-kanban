import React from 'react';

class Note extends React.Component {
  constructor(props) {
    super(props);
    this.edit = this.edit.bind(this);
    this.renderTask = this.renderTask.bind(this);
    this.renderEdit = this.renderEdit.bind(this);
    this.checkEnter = this.checkEnter.bind(this);
    this.finishEdit = this.finishEdit.bind(this);

    this.state = {
      editing: false
    };
  }

  render() {
    const editing = this.state.editing;

    return (
      <div>
        { editing ? this.renderEdit() : this.renderTask() }
      </div>
    );
  }

  renderEdit() {
    return <input type='text'
                  autoFocus={true}
                  defaultValue={this.props.task}
                  onKeyPress={this.checkEnter}
                  onBlur={this.finishEdit} />;
  }

  renderTask() {
    return <div onClick={this.edit}>{ this.props.task }</div>;
  }

  edit() {
    this.setState({
      editing: true
    });
  }

  checkEnter(e) {
    if(e.key == 'Enter') {
      this.finishEdit(e);
    }
  }

  finishEdit(e) {
    this.props.onEdit(e.target.value);

    this.setState({
      editing: false
    });
  }
}

module.exports = Note;

