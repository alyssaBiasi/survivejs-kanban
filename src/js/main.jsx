import '../scss/main.scss';
import 'array.prototype.findindex';

import React from 'react';
import App from './components/App.jsx';

main();

function main() {
  React.render(<App />, document.getElementById('app'));
}

