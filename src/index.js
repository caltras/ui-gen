const metadata = require('../test/ex.metadata');
const transformer = require('./transformer');
const render = require('./render');

const type = "react";
const projectName = 'test-v1';
process.env['api-url'] = 'http://localhost:8000/api';

const templates = transformer(metadata, type);

render(projectName,metadata, templates, type);

