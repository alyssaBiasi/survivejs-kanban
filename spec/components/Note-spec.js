var React = require('react/addons');
var Note = require('../../src/js/components/Note.jsx');
var ReactTestUtils = React.addons.TestUtils;

describe('Note', function() {
  var Page;

  beforeEach(function() {
    Page = ReactTestUtils.renderIntoDocument(<Note task='ABC'/>);
  });

  it('renders the Note', function() {
    var component = ReactTestUtils.findRenderedComponentWithType(Page, Note);
    expect(component).toBeDefined();
  });
});

