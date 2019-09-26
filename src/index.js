const metadata = require('../test/ex.metadata');
const transformer = require('./transformer');
const printer = require('./printer');

const templates = transformer(metadata);

printer(templates, "html");

