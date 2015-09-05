var fs = require('fs');
var path = require('path');
var React = require('react');

function readTemplate() {
  var templatePath = path.join(__dirname, '../../index.html');
  return fs.readFileSync(templatePath, 'utf8');
}

function render(Component) {
  return React.renderToString(<Component />);
}

module.exports = (Component) => {
  return readTemplate().replace(/%app%/, render(Component));
};

