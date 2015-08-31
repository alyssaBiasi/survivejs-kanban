import React from 'react';

class Note extends React.Component {
  constructor(props) {
    super(props);
    this.edit = this.edit.bind(this);
    this.renderTask = this.renderTask.bind(this);
    this.renderEdit = this.renderEdit.bind(this);
    this.renderDelete = this.renderDelete.bind(this);
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

  renderTask() {
    return (
      <div onClick={this.edit}>
        <span className='note-task'>{ this.props.task }</span>
        { this.props.onDelete ? this.renderDelete() : null }
      </div>
    );
  }

  renderEdit() {
    return <input className='note__edit' type='text'
                  autoFocus={true}
                  defaultValue={this.props.task}
                  onKeyPress={this.checkEnter}
                  onBlur={this.finishEdit} />;
  }

  renderDelete() {
    return <button className='delete' onClick={this.props.onDelete}> X </button>;
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

