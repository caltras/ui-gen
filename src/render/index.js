const htmlRender = require('./html_render');
const reactRender = require('./react_render');
const fs = require('fs');
const path = require('path');

String.prototype.format = function(key, value){
    return this.replace(new RegExp('{{'+key+'}}',"g"), value);
}

const createTarget = () =>{
    if (!fs.existsSync(path.join(__dirname,'../..',`target`))){
        fs.mkdirSync(path.join(__dirname,'../..',`target`));
        fs.mkdirSync(path.join(__dirname,'../..',`target/templates`));
    }
}

module.exports = (projectName, metadata, templates, type, persist=true) => {
    switch (type){
        case "html":
            createTarget();
            return htmlRender(projectName, metadata, templates, type, persist);
        case "react":
            createTarget();
            return reactRender(projectName, metadata, templates, type, persist);
        default:
            throw new Error("render.js : Render's type not accepted");
    }
};