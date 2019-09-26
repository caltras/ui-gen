const fs = require('fs');
const path = require('path')

String.prototype.format = function(key, value){
    return this.replace(new RegExp('{{'+key+'}}',"g"), value);
}

module.exports = (templates, type, persist=true) => {
    const domains = Object.keys(templates)
    const master = fs.readFileSync(path.join(__dirname,`./assets/template/${type}/master.html`), 'utf8');
    const js = fs.readFileSync(path.join(__dirname,`./assets/template/${type}/create_update.js.tpl`), 'utf8');
    const mapTemplates = {};
    domains.forEach ( (d) => {
        const pages = Object.keys(templates[d]);
        //user
        pages.forEach( (k) => {
            const page = templates[d][k];

            let finalTemplate = master.format("template", page);
            finalTemplate = finalTemplate.format("domain", d)
            finalTemplate = finalTemplate.format("page", k);

            mapTemplates[`templates/${d}/${d}.${k}.js`] =  js.format("domain", d).format("method", k === "create" ? "PUT": "POST");

            mapTemplates[`templates/${d}/${k}.html`] = finalTemplate;

            if (persist){
                // create, update, list
                if (!fs.existsSync(path.join(__dirname,'..',`target/templates`))){
                    fs.mkdirSync(path.join(__dirname,'..',`target/templates`));
                }
                if (!fs.existsSync(path.join(__dirname,'..',`target/templates/${d}`))){
                    fs.mkdirSync(path.join(__dirname,'..',`target/templates/${d}`));
                }

                fs.writeFileSync(path.join(__dirname,'..',`target/templates/${d}/${d}.${k}.js`), 
                                mapTemplates[`templates/${d}/${d}.${k}.js`],
                                'utf8');
                fs.writeFileSync(path.join(__dirname,'..',`target/templates/${d}/${k}.html`), 
                                finalTemplate,
                                'utf8');
            }
            
        });
    });
    return mapTemplates;
};