var React = require('react/addons');
var Note = require('../../src/js/components/Note.jsx');
var ReactTestUtils = React.addons.TestUtils;

describe('Note', () => {
  var Page, note;
  var task = 'AB';
  var onDelete;

  beforeEach(() => {
    onDelete = jasmine.createSpy();

    var n = <Note task={task} onDelete={onDelete} />;
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
    beforeEach(() => {
      note.setState({editing: true});
    });

    it('swaps to render editing', () => {
      var input = ReactTestUtils.findRenderedDOMComponentWithClass(note, 'note__edit');
      expect(input).toBeDefined();
    });
  });

  describe('click delete', () => {
    beforeEach(() => {
      var button = ReactTestUtils.findRenderedDOMComponentWithClass(note, 'delete');
      ReactTestUtils.Simulate.click(button);
    });

    it('delete callback called', () => {
      expect(onDelete).toHaveBeenCalled();
    });
  });
});

