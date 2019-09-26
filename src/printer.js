const fs = require('fs');
const path = require('path')

String.prototype.format = function(key, value){
    return this.replace(new RegExp('{{'+key+'}}',"g"), value);
}

module.exports = (templates, type) => {
    const domains = Object.keys(templates)
    const master = fs.readFileSync(path.join(__dirname,`./assets/template/${type}/master.html`), 'utf8');
    domains.forEach ( (d) => {
        const pages = Object.keys(templates[d]);
        //user
        pages.forEach( (k) => {
            const page = templates[d][k];
            // create, update, list
            if (!fs.existsSync(path.join(__dirname,'..',`target/templates`))){
                fs.mkdirSync(path.join(__dirname,'..',`target/templates`));
            }
            if (!fs.existsSync(path.join(__dirname,'..',`target/templates/${d}`))){
                fs.mkdirSync(path.join(__dirname,'..',`target/templates/${d}`));
            }
            let finalTemplate = master.format("template", page);
            finalTemplate = finalTemplate.format("domain", d)
            finalTemplate = finalTemplate.format("page", k);

            fs.writeFileSync(path.join(__dirname,'..',`target/templates/${d}/${k}.html`), 
                             finalTemplate,
                             'utf8');
        });
    });
};