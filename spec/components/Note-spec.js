var React = require('react/addons');
var Note = require('../../src/js/components/Note.jsx');
var ReactTestUtils = React.addons.TestUtils;

describe('Note', () => {
  var Page, note;
  var onDelete, onEdit;
  var task = 'AB';

  beforeEach(() => {
    onDelete = jasmine.createSpy('onDelete');
    onEdit = jasmine.createSpy('onEdit');

    var n = <Note task={task} onDelete={onDelete} onEdit={onEdit} />;
    Page = ReactTestUtils.renderIntoDocument(n);
    note = ReactTestUtils.findRenderedComponentWithType(Page, Note);
  });

  it('renders the Note', () => {
    expect(note).toBeDefined();
  });

  it('renders the delete button', () => {
    var button = ReactTestUtils.findRenderedDOMComponentWithClass(note, 'delete');
    expect(button).toBeDefined();
  });

  describe('no delete callback', () => {
    beforeEach(() => {
      var n = <Note task={task} />;
      Page = ReactTestUtils.renderIntoDocument(n);
      note = ReactTestUtils.findRenderedComponentWithType(Page, Note);
    });

    it('does not render the delete button', () => {
      var button = ReactTestUtils.scryRenderedDOMComponentsWithClass(note, 'delete');
      expect(button.length).toEqual(0);
    });
  });

  describe('editing', () => {
    var inputField;

    beforeEach(() => {
      note.setState({editing: true});
      inputField = ReactTestUtils.findRenderedDOMComponentWithClass(note, 'note__edit');
    });

    it('swaps to render editing', () => {
      expect(inputField).toBeDefined();
    });

    describe('finish editing', () => {
      describe('on blur', () => {
        beforeEach(() => {
          ReactTestUtils.Simulate.blur(inputField);
        });

        it('calls the edit callback', () => {
          expect(onEdit).toHaveBeenCalled();
        });
      });

      describe('on enter key', () => {
        beforeEach(() => {
          ReactTestUtils.Simulate.keyPress(inputField, {key: 'Enter'});
        });

        it('calls the edit callback', () => {
          expect(onEdit).toHaveBeenCalled();
        });
      });
    });
  });

  describe('click delete', () => {
    beforeEach(() => {
      var button = ReactTestUtils.findRenderedDOMComponentWithClass(note, 'delete');
      ReactTestUtils.Simulate.click(button);
    });

    it('calls the delete callback', () => {
      expect(onDelete).toHaveBeenCalled();
    });
  });
});

