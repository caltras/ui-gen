const htmlRender = require('./html_render');
const reactRender = require('./react_render');

String.prototype.format = function(key, value){
    return this.replace(new RegExp('{{'+key+'}}',"g"), value);
}

module.exports = (metadata, templates, type, persist=true) => {
    switch (type){
        case "html":
            return htmlRender(metadata, templates, type, persist);
        case "react":
            return reactRender(metadata, templates, type, persist);
        default:
            throw new Error("render.js : Render's type not accepted");
    }
};