const _ = require('lodash');
const htmlTransformer = require('./html_transformer');
const reactTransformer = require('./react_transformer');

module.exports = (metadata, type) =>{
    switch (type){
        case "html":
            return htmlTransformer(metadata);
        case "react":
            return reactTransformer(metadata);
        default:
            throw new Error("transfomer.js : Transformer's type not accepted");
    }
    
}