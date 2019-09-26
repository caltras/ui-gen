const metadata = require('../test/ex.metadata');
const transformer = require('./transformer');
const render = require('./render');

const templates = transformer(metadata);

render(templates, "html");

