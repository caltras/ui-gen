const metadata = require('../test/ex.metadata');
const transformer = require('./transformer');
const render = require('./render');

const type = "react";

const templates = transformer(metadata, type);

render(metadata, templates, type);

